/**
 * 설정 파일 (config.js)
 * 
 * 이 파일은 웹 애플리케이션에서 사용하는 중요한 설정 정보들을 저장하는 곳이에요.
 * 마치 집의 주소나 전화번호를 적어두는 주소록 같은 역할을 해요!
 * 
 * ⚠️ 중요: 이 파일에는 민감한 정보(API 키 등)가 들어가므로
 * 절대로 GitHub 같은 공개 저장소에 올리지 마세요!
 */

// ============================================
// Airtable API 설정
// ============================================
/**
 * Airtable는 데이터를 저장하고 관리할 수 있는 클라우드 서비스예요.
 * 마치 엑셀 같은 표를 인터넷에서 사용할 수 있게 해주는 도구예요!
 * 
 * API 키와 Base ID는 Airtable 웹사이트에서 발급받을 수 있어요.
 */

// Airtable API 키를 저장하는 변수예요
// 이 키는 Airtable 계정에 접근할 수 있는 비밀번호 같은 거예요
// 실제 사용 시에는 여기에 본인의 API 키를 입력하세요
const AIRTABLE_API_KEY = 'patIEXEUp9t0xtfUR.4e1634052d70edcce3cdb68fa964b6dcfccd376472761673a8e56ee4048e2ea0';

// Airtable Base ID를 저장하는 변수예요
// Base는 여러 개의 표(Table)를 담는 큰 상자 같은 거예요
// 실제 사용 시에는 여기에 본인의 Base ID를 입력하세요
const AIRTABLE_BASE_ID = 'appFEVpaCY3q4e1y8';

// Airtable API의 기본 URL이에요
// 이 주소로 요청을 보내면 Airtable의 데이터를 가져올 수 있어요
const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

// ============================================
// 테이블 이름 설정
// ============================================
/**
 * Airtable Base 안에는 여러 개의 테이블(표)이 있을 수 있어요.
 * 각 테이블은 서로 다른 종류의 데이터를 저장해요.
 * 예를 들어, 사용자 정보 테이블, 역량 평가 테이블, 교육 프로그램 테이블 등이 있어요.
 */

// AX 역량 모델 정보를 저장하는 테이블 이름이에요
const TABLE_COMPETENCY_MODEL = 'AX_역량모델';

// AX 수행 역할 정보를 저장하는 테이블 이름이에요
const TABLE_ROLES = 'AX_수행역할';

// 역량과 역할을 연결하는 매트릭스 테이블 이름이에요
const TABLE_COMPETENCY_MATRIX = '역량_역할_매트릭스';

// 교육 프로그램 정보를 저장하는 테이블 이름이에요
const TABLE_EDUCATION_PROGRAMS = '교육프로그램';

// 자가진단 설문 질문을 저장하는 테이블 이름이에요
const TABLE_SURVEY_QUESTIONS = '자가진단_질문';

// 사용자 평가 결과를 저장하는 테이블 이름이에요
const TABLE_USER_ASSESSMENTS = '사용자_평가결과';

// ============================================
// API 엔드포인트 설정
// ============================================
/**
 * 엔드포인트는 특정 데이터를 가져오기 위한 주소예요.
 * 마치 도서관에서 특정 책을 찾기 위한 책 번호 같은 거예요!
 */

/**
 * 특정 테이블의 모든 데이터를 가져오는 함수를 만들어요
 * @param {string} tableName - 가져올 테이블의 이름
 * @returns {string} - 완성된 API 주소
 * 
 * 사용 예시:
 * getAirtableEndpoint('AX_역량모델') 
 * -> 'https://api.airtable.com/v0/YOUR_BASE_ID/AX_역량모델'
 */
function getAirtableEndpoint(tableName) {
    // API 주소를 조합해서 만들어요
    // Base ID와 테이블 이름을 합쳐서 완전한 주소를 만드는 거예요
    // 한글 테이블 이름은 URL 인코딩이 필요해요 (encodeURIComponent 사용)
    const encodedTableName = encodeURIComponent(tableName);
    return `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodedTableName}`;
}

// ============================================
// 환경 설정
// ============================================
/**
 * 개발 환경과 실제 서비스 환경을 구분하기 위한 설정이에요.
 * 개발 중일 때는 테스트 데이터를 사용하고,
 * 실제 서비스할 때는 진짜 데이터를 사용하는 거예요!
 */

// 현재 환경이 개발 환경인지 확인하는 변수예요
// true면 개발 환경, false면 실제 서비스 환경이에요
const IS_DEVELOPMENT = true;

// 개발 환경일 때 사용할 테스트 데이터를 저장하는 변수예요
// 실제 API를 호출하지 않고 테스트할 때 사용해요
const USE_MOCK_DATA = false;

// ============================================
// 설정 검증 함수
// ============================================
/**
 * 설정이 제대로 되어 있는지 확인하는 함수예요.
 * API 키나 Base ID가 제대로 입력되었는지 체크해요.
 * 마치 출발 전에 여권과 티켓을 확인하는 것처럼요!
 */

/**
 * 설정이 올바른지 확인하는 함수예요
 * @param {boolean} silent - true이면 오류 메시지를 콘솔에 출력하지 않아요 (기본값: false)
 * @returns {boolean} - 설정이 올바르면 true, 아니면 false
 */
function validateConfig(silent = false) {
    // API 키가 제대로 입력되었는지 확인해요
    // 'YOUR_AIRTABLE_API_KEY_HERE'는 기본값이므로 실제 키로 바꿔야 해요
    if (AIRTABLE_API_KEY === 'YOUR_AIRTABLE_API_KEY_HERE') {
        if (!silent) {
            console.warn('⚠️ Airtable API 키가 설정되지 않았습니다. Airtable 기능을 사용하려면 config.js에서 설정해주세요.');
        }
        return false;
    }
    
    // Base ID가 제대로 입력되었는지 확인해요
    if (AIRTABLE_BASE_ID === 'YOUR_AIRTABLE_BASE_ID_HERE') {
        if (!silent) {
            console.warn('⚠️ Airtable Base ID가 설정되지 않았습니다. Airtable 기능을 사용하려면 config.js에서 설정해주세요.');
        }
        return false;
    }
    
    // 모든 설정이 올바르면 true를 반환해요
    if (!silent) {
        console.log('✅ 설정이 올바르게 되어 있습니다!');
    }
    return true;
}

// 페이지가 로드될 때 설정을 자동으로 확인해요
// 이렇게 하면 설정이 잘못되었을 때 바로 알 수 있어요
// 주의: Airtable을 사용하지 않는 기능(설문 등)에서는 이 검증을 건너뛸 수 있어요
if (typeof window !== 'undefined') {
    // 브라우저 환경에서만 실행되도록 확인해요
    window.addEventListener('DOMContentLoaded', () => {
        // Airtable 기능을 사용할 때만 검증하도록 조건부 실행
        // 현재는 설문 기능만 사용하므로 검증을 건너뛰어요
        // Airtable 연동이 필요할 때 아래 주석을 해제하세요
        // validateConfig();
    });
}

