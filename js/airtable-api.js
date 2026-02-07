/**
 * Airtable API 연동 파일 (airtable-api.js)
 * 
 * 이 파일은 Airtable API와 통신하여 데이터를 저장하고 가져오는 함수들을 모아둔 파일이에요.
 * 마치 우체국처럼, 데이터를 보내고 받는 역할을 해요!
 * 
 * 주요 기능:
 * 1. 설문 결과를 Airtable에 저장하기
 * 2. 역량 진단 결과를 Airtable에 저장하기
 * 3. 관리자 대시보드에서 데이터 가져오기
 */

// ============================================
// Airtable API 헬퍼 함수
// ============================================

/**
 * Airtable API에 요청을 보내는 공통 함수예요
 * @param {string} url - API 주소
 * @param {string} method - HTTP 메서드 ('GET', 'POST', 'PATCH', 'DELETE')
 * @param {Object} data - 전송할 데이터 (POST, PATCH일 때만 사용)
 * @returns {Promise<Object>} API 응답 데이터
 */
async function callAirtableAPI(url, method = 'GET', data = null) {
    // 설정이 올바른지 확인해요
    if (!validateConfig(true)) {
        throw new Error('Airtable API 설정이 올바르지 않습니다. config.js를 확인해주세요.');
    }
    
    // 요청 옵션을 준비해요
    const options = {
        method: method,
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    
    // POST나 PATCH 요청이면 데이터를 추가해요
    if (data && (method === 'POST' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        // API에 요청을 보내요
        const response = await fetch(url, options);
        
        // 응답이 성공적이지 않으면 에러를 발생시켜요
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || '';
            
            // 422 에러인 경우 더 자세한 정보를 로그로 출력해요
            if (response.status === 422) {
                console.error('❌ 422 에러 상세 정보:');
                console.error('  - 에러 메시지:', errorMessage);
                console.error('  - 전체 에러 객체:', errorData);
                
                // 필드 이름 관련 에러인 경우, 사용 가능한 필드 목록을 가져와요
                if (errorMessage.includes('Unknown field name')) {
                    console.warn('⚠️ 필드 이름이 일치하지 않습니다. Airtable 테이블의 실제 필드 이름을 확인해주세요.');
                    console.warn('💡 해결 방법: Airtable에서 "사용자_평가결과" 테이블을 열고 필드 이름을 확인하세요.');
                }
            }
            
            throw new Error(`Airtable API 오류: ${response.status} ${response.statusText}. ${errorMessage}`);
        }
        
        // 응답 데이터를 JSON 형식으로 변환해서 반환해요
        return await response.json();
    } catch (error) {
        console.error('❌ Airtable API 호출 실패:', error);
        throw error;
    }
}

// ============================================
// 설문 결과 저장 함수
// ============================================

/**
 * 설문 결과를 Airtable에 저장하는 함수예요
 * @param {Object} surveyData - 설문 데이터 객체
 *   - employeeId: 사번 (선택사항)
 *   - answers: 설문 답변 배열 (20개)
 *   - roleResult: 역할 분류 결과 객체
 * @returns {Promise<Object>} 저장된 레코드 정보
 */
async function saveSurveyResultToAirtable(surveyData) {
    console.log('💾 설문 결과를 Airtable에 저장합니다...');
    
    try {
        // Airtable에 저장할 데이터 형식을 준비해요
        // ⚠️ 중요: 필드 이름은 Airtable 테이블의 필드 이름과 정확히 일치해야 해요!
        const fields = {
            // 사번 (선택사항)
            '사번': surveyData.employeeId || '',
            
            // 설문 답변 (JSON 문자열로 저장)
            '설문답변': JSON.stringify(surveyData.answers),
            
            // 4개 축 점수
            // ⚠️ Airtable 필드 이름: '생성형 AI 점수' (공백 있음, "점수" 앞에도 공백 있음)
            // 관리자 대시보드 헤더가 '생성형 AI 점수'로 표시되므로 이 이름을 사용해요
            '생성형 AI 점수': surveyData.roleResult.scores.genAI || 0,
            '실무 데이터 점수': surveyData.roleResult.scores.field || 0,
            '전략 점수': surveyData.roleResult.scores.strategy || 0,
            '전문가 점수': surveyData.roleResult.scores.expert || 0,
            
            // 최종 역할
            '최종역할': surveyData.roleResult.finalRole || '',
            
            // 역할 설명
            '역할설명': surveyData.roleResult.description || '',
            
            // 진단 일시 (현재 시간)
            '진단일시': new Date().toISOString()
        };
        
        // 필드 이름 디버깅: 실제로 전송되는 필드 이름을 확인해요
        console.log('📋 저장할 필드 이름들:', Object.keys(fields));
        
        // Airtable API 엔드포인트를 가져와요
        const endpoint = getAirtableEndpoint(TABLE_USER_ASSESSMENTS);
        
        // Airtable API 형식에 맞게 데이터를 포장해요
        const airtableData = {
            records: [
                {
                    fields: fields
                }
            ]
        };
        
        // API에 요청을 보내요
        const result = await callAirtableAPI(endpoint, 'POST', airtableData);
        
        console.log('✅ 설문 결과 저장 완료!', result);
        return result;
    } catch (error) {
        console.error('❌ 설문 결과 저장 실패:', error);
        throw error;
    }
}

// ============================================
// 역량 진단 결과 저장 함수
// ============================================

/**
 * 역량 진단 결과를 Airtable에 저장하거나 업데이트하는 함수예요
 * @param {Object} competencyData - 역량 진단 데이터 객체
 *   - employeeId: 사번 (선택사항)
 *   - selectedRoles: 선택된 희망 역할 배열
 *   - competencyScores: 역량별 점수 객체
 *   - gapAnalysisResults: 격차 분석 결과 배열
 * @param {string} surveyRecordId - 설문 결과 레코드 ID (같은 사용자의 설문 결과와 연결하기 위해)
 * @returns {Promise<Object>} 저장된 레코드 정보
 */
async function saveCompetencyResultToAirtable(competencyData, surveyRecordId = null) {
    console.log('💾 역량 진단 결과를 Airtable에 저장합니다...');
    console.log('📋 설문 결과 레코드 ID:', surveyRecordId);
    
    try {
        // localStorage에서 설문 결과 데이터를 가져와요 (설문 결과 저장이 실패했을 수도 있으므로)
        const savedRoleResult = localStorage.getItem('roleResult');
        const savedSurveyAnswers = localStorage.getItem('surveyAnswers');
        
        let roleResult = null;
        let surveyAnswers = null;
        
        if (savedRoleResult) {
            try {
                roleResult = JSON.parse(savedRoleResult);
            } catch (e) {
                console.warn('⚠️ 역할 결과 파싱 실패:', e);
            }
        }
        
        if (savedSurveyAnswers) {
            try {
                surveyAnswers = JSON.parse(savedSurveyAnswers);
            } catch (e) {
                console.warn('⚠️ 설문 답변 파싱 실패:', e);
            }
        }
        
        // Airtable에 저장할 데이터 형식을 준비해요
        const fields = {
            // 사번 (선택사항)
            '사번': competencyData.employeeId || '',
            
            // 설문 결과 필드도 함께 저장해요 (설문 결과 저장이 실패했을 수 있으므로)
            ...(surveyAnswers ? {
                '설문답변': JSON.stringify(surveyAnswers)
            } : {}),
            
            ...(roleResult ? {
                // 4개 축 점수
                // ⚠️ Airtable 필드 이름: '생성형 AI 점수' (공백 있음, "점수" 앞에도 공백 있음)
                // 관리자 대시보드 헤더가 '생성형 AI 점수'로 표시되므로 이 이름을 사용해요
                '생성형 AI 점수': roleResult.scores?.genAI || 0,
                '실무 데이터 점수': roleResult.scores?.field || 0,
                '전략 점수': roleResult.scores?.strategy || 0,
                '전문가 점수': roleResult.scores?.expert || 0,
                
                // 최종 역할
                '최종역할': roleResult.finalRole || '',
                
                // 역할 설명
                '역할설명': roleResult.description || '',
                
                // 진단 일시 (설문 완료 시점)
                '진단일시': new Date().toISOString()
            } : {}),
            
            // 선택된 희망 역할 (배열을 쉼표로 구분된 문자열로 저장)
            '희망역할': competencyData.selectedRoles ? competencyData.selectedRoles.join(', ') : '',
            
            // 역량별 점수 (JSON 문자열로 저장)
            '역량점수': JSON.stringify(competencyData.competencyScores || {}),
            
            // 격차 분석 결과 (JSON 문자열로 저장)
            '격차분석': JSON.stringify(competencyData.gapAnalysisResults || []),
            
            // 추천 교육 과정 (JSON 문자열로 저장)
            '추천교육과정': JSON.stringify(
                competencyData.gapAnalysisResults?.flatMap(result => result.추천학습과정 || []) || []
            ),
            
            // 역량 진단 완료 일시
            '역량진단일시': new Date().toISOString()
        };
        
        // 설문 결과 레코드 ID가 있으면 같은 레코드를 업데이트하고, 없으면 새로 생성해요
        if (surveyRecordId) {
            console.log('📝 기존 레코드 업데이트:', surveyRecordId);
        } else {
            console.log('➕ 새 레코드 생성 (설문 결과 레코드 ID 없음)');
        }
        
        // Airtable API 엔드포인트를 가져와요
        const endpoint = getAirtableEndpoint(TABLE_USER_ASSESSMENTS);
        
        // 설문 결과 레코드 ID가 있으면 업데이트, 없으면 새로 생성해요
        let result;
        if (surveyRecordId) {
            // 기존 레코드를 업데이트해요
            const updateEndpoint = `${endpoint}/${surveyRecordId}`;
            const updateData = {
                fields: fields
            };
            result = await callAirtableAPI(updateEndpoint, 'PATCH', updateData);
        } else {
            // 새 레코드를 생성해요
            const createData = {
                records: [
                    {
                        fields: fields
                    }
                ]
            };
            result = await callAirtableAPI(endpoint, 'POST', createData);
        }
        
        console.log('✅ 역량 진단 결과 저장 완료!', result);
        return result;
    } catch (error) {
        console.error('❌ 역량 진단 결과 저장 실패:', error);
        throw error;
    }
}

// ============================================
// 관리자 대시보드 데이터 조회 함수
// ============================================

/**
 * 관리자 대시보드에서 사용할 모든 진단 결과를 Airtable에서 가져오는 함수예요
 * @returns {Promise<Array>} 사용자 데이터 배열
 */
async function fetchAllAssessmentResultsFromAirtable() {
    console.log('📊 Airtable에서 모든 진단 결과를 가져옵니다...');
    
    try {
        // Airtable API 엔드포인트를 가져와요
        const endpoint = getAirtableEndpoint(TABLE_USER_ASSESSMENTS);
        
        // 모든 레코드를 가져오기 위해 페이지네이션을 처리해요
        let allRecords = [];
        let offset = null;
        
        do {
            // 쿼리 파라미터를 준비해요
            let url = endpoint;
            const params = new URLSearchParams();
            
            // 정렬: 진단 일시 기준 최신순
            params.append('sort[0][field]', '진단일시');
            params.append('sort[0][direction]', 'desc');
            
            // 페이지네이션: 한 번에 최대 100개씩 가져와요
            params.append('pageSize', '100');
            
            if (offset) {
                params.append('offset', offset);
            }
            
            url += '?' + params.toString();
            
            // API에 요청을 보내요
            const response = await callAirtableAPI(url, 'GET');
            
            // 레코드를 배열에 추가해요
            if (response.records) {
                allRecords = allRecords.concat(response.records);
            }
            
            // 다음 페이지가 있으면 offset을 업데이트해요
            offset = response.offset || null;
        } while (offset);
        
        // Airtable 레코드를 관리자 대시보드 형식으로 변환해요
        const formattedData = allRecords.map(record => {
            const fields = record.fields;
            
            // 역량 점수 파싱 (JSON 문자열인 경우)
            let competencyScores = {};
            if (fields['역량점수']) {
                try {
                    competencyScores = typeof fields['역량점수'] === 'string' 
                        ? JSON.parse(fields['역량점수']) 
                        : fields['역량점수'];
                } catch (e) {
                    console.warn('역량 점수 파싱 실패:', e);
                }
            }
            
            return {
                id: record.id,
                employeeId: fields['사번'] || '',
                role: fields['희망역할'] || fields['최종역할'] || '',
                // ⚠️ Airtable 필드 이름 확인: '생성형 AI 점수' (공백 있음, "점수" 앞에도 공백 있음)
                // 여러 가능한 필드 이름을 시도해요 (Airtable 필드 이름이 다를 수 있으므로)
                genAIScore: fields['생성형 AI 점수'] || fields['생성형 AI점수'] || fields['생성형AI점수'] || 0,
                fieldScore: fields['실무 데이터 점수'] || fields['실무데이터점수'] || 0,
                strategyScore: fields['전략 점수'] || fields['전략점수'] || 0,
                expertScore: fields['전문가 점수'] || fields['전문가점수'] || 0,
                finalRole: fields['최종역할'] || '',
                diagnosisDate: fields['진단일시'] || fields['역량진단일시'] || '',
                competencyScores: competencyScores
            };
        });
        
        console.log(`✅ ${formattedData.length}개의 진단 결과를 가져왔습니다.`);
        return formattedData;
    } catch (error) {
        console.error('❌ 진단 결과 조회 실패:', error);
        throw error;
    }
}

