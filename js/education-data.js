/**
 * 교육 과정 데이터 파일 (education-data.js)
 * 
 * 이 파일은 AX 역량별 추천 교육 과정 데이터를 저장하는 파일이에요.
 * 나중에 Airtable API로 교체할 수 있도록 구조화되어 있어요.
 * 
 * 각 교육 과정은 다음 정보를 포함해요:
 * - 과정명
 * - 대상 역량
 * - 대상 역할
 * - 학습 방식 (온라인, 오프라인, 하이브리드)
 * - 소요 시간
 * - 난이도 (1~5)
 * - 신청 링크
 */

// ============================================
// 교육 과정 데이터
// ============================================

/**
 * 역량별 교육 과정 데이터예요
 * 구조: { 역량명: [교육과정 배열] }
 */
const EDUCATION_COURSES = {
    "AI 개념 이해": [
        {
            courseName: "AI 기초 이론 입문",
            targetCompetency: "AI 개념 이해",
            targetRoles: ["AI 입문자", "AI 실무자", "생성형 AI 활용자", "현업 AI 관리자"],
            method: "온라인",
            duration: "2주",
            difficulty: 1,
            link: "https://example.com/ai-basics",
            description: "AI의 기본 개념부터 머신러닝, 딥러닝까지 체계적으로 학습하는 입문 과정"
        },
        {
            courseName: "AI 개념 심화",
            targetCompetency: "AI 개념 이해",
            targetRoles: ["AI 실무자", "AI 전문가", "현업 AI 관리자", "AI 전략 리더"],
            method: "온라인",
            duration: "4주",
            difficulty: 3,
            link: "https://example.com/ai-advanced",
            description: "AI의 고급 개념과 최신 트렌드를 깊이 있게 다루는 심화 과정"
        },
        {
            courseName: "AI 개념 마스터",
            targetCompetency: "AI 개념 이해",
            targetRoles: ["AI 전문가", "AI 전략 리더"],
            method: "하이브리드",
            duration: "6주",
            difficulty: 5,
            link: "https://example.com/ai-master",
            description: "AI의 이론적 배경과 실무 적용을 종합적으로 다루는 마스터 과정"
        }
    ],
    "데이터 활용 및 시각화": [
        {
            courseName: "데이터 분석 기초",
            targetCompetency: "데이터 활용 및 시각화",
            targetRoles: ["AI 입문자", "AI 실무자", "생성형 AI 활용자"],
            method: "온라인",
            duration: "3주",
            difficulty: 2,
            link: "https://example.com/data-basics",
            description: "Excel과 기본 통계를 활용한 데이터 분석 기초 과정"
        },
        {
            courseName: "데이터 시각화 실무",
            targetCompetency: "데이터 활용 및 시각화",
            targetRoles: ["AI 실무자", "현업 AI 관리자", "AI 전략 리더"],
            method: "온라인",
            duration: "4주",
            difficulty: 3,
            link: "https://example.com/data-visualization",
            description: "Tableau, Power BI 등을 활용한 데이터 시각화 실무 과정"
        },
        {
            courseName: "고급 데이터 분석",
            targetCompetency: "데이터 활용 및 시각화",
            targetRoles: ["AI 전문가", "AI 전략 리더"],
            method: "하이브리드",
            duration: "6주",
            difficulty: 4,
            link: "https://example.com/advanced-data",
            description: "Python과 R을 활용한 고급 데이터 분석 및 머신러닝 기법을 다루는 과정"
        }
    ],
    "생성형 AI 도구 활용": [
        {
            courseName: "ChatGPT 활용 기초",
            targetCompetency: "생성형 AI 도구 활용",
            targetRoles: ["AI 입문자", "생성형 AI 활용자", "AI 실무자"],
            method: "온라인",
            duration: "1주",
            difficulty: 1,
            link: "https://example.com/chatgpt-basics",
            description: "ChatGPT의 기본 사용법과 프롬프트 작성 기법을 학습하는 과정"
        },
        {
            courseName: "생성형 AI 도구 마스터",
            targetCompetency: "생성형 AI 도구 활용",
            targetRoles: ["생성형 AI 활용자", "AI 실무자", "현업 AI 관리자"],
            method: "온라인",
            duration: "3주",
            difficulty: 3,
            link: "https://example.com/genai-master",
            description: "ChatGPT, Claude, Gemini 등 다양한 생성형 AI 도구를 활용하는 고급 과정"
        },
        {
            courseName: "생성형 AI 비즈니스 활용",
            targetCompetency: "생성형 AI 도구 활용",
            targetRoles: ["현업 AI 관리자", "AI 전략 리더"],
            method: "하이브리드",
            duration: "4주",
            difficulty: 4,
            link: "https://example.com/genai-business",
            description: "생성형 AI를 비즈니스 프로세스에 통합하고 ROI를 극대화하는 전략 과정"
        }
    ],
    "파이썬 활용 기초": [
        {
            courseName: "파이썬 프로그래밍 입문",
            targetCompetency: "파이썬 활용 기초",
            targetRoles: ["AI 입문자", "AI 실무자", "생성형 AI 활용자"],
            method: "온라인",
            duration: "4주",
            difficulty: 2,
            link: "https://example.com/python-basics",
            description: "파이썬의 기본 문법과 데이터 타입을 학습하는 입문 과정"
        },
        {
            courseName: "파이썬 데이터 분석",
            targetCompetency: "파이썬 활용 기초",
            targetRoles: ["AI 실무자", "AI 전문가", "현업 AI 관리자"],
            method: "온라인",
            duration: "6주",
            difficulty: 3,
            link: "https://example.com/python-data",
            description: "Pandas, NumPy 등 라이브러리를 활용한 데이터 분석 실무 과정"
        },
        {
            courseName: "파이썬 고급 프로그래밍",
            targetCompetency: "파이썬 활용 기초",
            targetRoles: ["AI 전문가", "AI 전략 리더"],
            method: "하이브리드",
            duration: "8주",
            difficulty: 5,
            link: "https://example.com/python-advanced",
            description: "객체지향 프로그래밍, 디자인 패턴, 성능 최적화 등 고급 기법을 다루는 과정"
        }
    ],
    "AI 모델링 원리 이해": [
        {
            courseName: "머신러닝 기초",
            targetCompetency: "AI 모델링 원리 이해",
            targetRoles: ["AI 실무자", "AI 전문가"],
            method: "온라인",
            duration: "5주",
            difficulty: 3,
            link: "https://example.com/ml-basics",
            description: "지도학습, 비지도학습 등 머신러닝의 기본 원리를 학습하는 과정"
        },
        {
            courseName: "딥러닝 심화",
            targetCompetency: "AI 모델링 원리 이해",
            targetRoles: ["AI 전문가", "AI 전략 리더"],
            method: "하이브리드",
            duration: "8주",
            difficulty: 5,
            link: "https://example.com/deep-learning",
            description: "신경망 구조, 학습 알고리즘, 최적화 기법 등 딥러닝의 심화 내용을 다루는 과정"
        },
        {
            courseName: "AI 모델 설계 실무",
            targetCompetency: "AI 모델링 원리 이해",
            targetRoles: ["AI 전문가"],
            method: "오프라인",
            duration: "10주",
            difficulty: 5,
            link: "https://example.com/model-design",
            description: "실제 비즈니스 문제를 해결하기 위한 AI 모델 설계 및 구현 실무 과정"
        }
    ],
    "알고리즘/코딩 적용 능력": [
        {
            courseName: "알고리즘 기초",
            targetCompetency: "알고리즘/코딩 적용 능력",
            targetRoles: ["AI 입문자", "AI 실무자"],
            method: "온라인",
            duration: "4주",
            difficulty: 2,
            link: "https://example.com/algorithm-basics",
            description: "기본적인 알고리즘과 자료구조를 학습하는 과정"
        },
        {
            courseName: "코딩 실무 프로젝트",
            targetCompetency: "알고리즘/코딩 적용 능력",
            targetRoles: ["AI 실무자", "AI 전문가"],
            method: "하이브리드",
            duration: "6주",
            difficulty: 4,
            link: "https://example.com/coding-project",
            description: "실제 프로젝트를 통해 코딩 능력을 향상시키는 실무 과정"
        },
        {
            courseName: "고급 알고리즘 및 최적화",
            targetCompetency: "알고리즘/코딩 적용 능력",
            targetRoles: ["AI 전문가"],
            method: "오프라인",
            duration: "8주",
            difficulty: 5,
            link: "https://example.com/advanced-algorithm",
            description: "복잡한 알고리즘 설계와 성능 최적화 기법을 다루는 고급 과정"
        }
    ],
    "AI 협업/의사소통 역량": [
        {
            courseName: "AI 프로젝트 협업 기초",
            targetCompetency: "AI 협업/의사소통 역량",
            targetRoles: ["AI 입문자", "AI 실무자", "생성형 AI 활용자"],
            method: "온라인",
            duration: "2주",
            difficulty: 1,
            link: "https://example.com/collaboration-basics",
            description: "AI 프로젝트에서 효과적인 협업 방법을 학습하는 과정"
        },
        {
            courseName: "AI 커뮤니케이션 스킬",
            targetCompetency: "AI 협업/의사소통 역량",
            targetRoles: ["AI 실무자", "현업 AI 관리자", "AI 전략 리더"],
            method: "하이브리드",
            duration: "3주",
            difficulty: 3,
            link: "https://example.com/ai-communication",
            description: "비기술 직군에게 AI를 효과적으로 설명하고 공감대를 형성하는 커뮤니케이션 기법을 학습하는 과정"
        },
        {
            courseName: "AI 리더십 및 팀 관리",
            targetCompetency: "AI 협업/의사소통 역량",
            targetRoles: ["현업 AI 관리자", "AI 전략 리더"],
            method: "오프라인",
            duration: "4주",
            difficulty: 4,
            link: "https://example.com/ai-leadership",
            description: "AI 프로젝트 팀을 이끌고 관리하는 리더십 역량을 향상시키는 과정"
        }
    ],
    "AI 전략적 사고 및 윤리 인식": [
        {
            courseName: "AI 윤리 기초",
            targetCompetency: "AI 전략적 사고 및 윤리 인식",
            targetRoles: ["AI 입문자", "AI 실무자", "생성형 AI 활용자"],
            method: "온라인",
            duration: "2주",
            difficulty: 1,
            link: "https://example.com/ai-ethics-basics",
            description: "AI의 윤리적 사용과 사회적 책임에 대한 기초 지식을 학습하는 과정"
        },
        {
            courseName: "AI 전략 수립",
            targetCompetency: "AI 전략적 사고 및 윤리 인식",
            targetRoles: ["현업 AI 관리자", "AI 전략 리더"],
            method: "하이브리드",
            duration: "5주",
            difficulty: 4,
            link: "https://example.com/ai-strategy",
            description: "조직의 AI 전략을 수립하고 실행 계획을 설계하는 전략 과정"
        },
        {
            courseName: "AI 비즈니스 가치 창출",
            targetCompetency: "AI 전략적 사고 및 윤리 인식",
            targetRoles: ["AI 전략 리더"],
            method: "오프라인",
            duration: "6주",
            difficulty: 5,
            link: "https://example.com/ai-business-value",
            description: "AI 투자의 ROI를 극대화하고 비즈니스 가치를 창출하는 고급 전략 과정"
        }
    ]
};

/**
 * 특정 역량과 역할에 맞는 교육 과정을 조회하는 함수예요
 * 나중에 Airtable API로 교체할 수 있어요
 * 
 * @param {string} competencyName - 역량명
 * @param {Array<string>} roles - 대상 역할 배열
 * @param {number} limit - 최대 조회 개수 (기본값: 3)
 * @returns {Array<Object>} 교육 과정 배열
 */
function getEducationCourses(competencyName, roles, limit = 3) {
    try {
        // 해당 역량의 교육 과정을 가져와요
        const courses = EDUCATION_COURSES[competencyName] || [];
        
        // 역할에 맞는 교육 과정만 필터링해요
        const filteredCourses = courses.filter(course => {
            // 역할이 명시되지 않았거나, 현재 역할이 대상 역할에 포함되어 있으면 포함해요
            return !course.targetRoles || course.targetRoles.some(role => roles.includes(role));
        });
        
        // 난이도 순으로 정렬하고, 최대 개수만큼 반환해요
        return filteredCourses
            .sort((a, b) => a.difficulty - b.difficulty)
            .slice(0, limit);
    } catch (error) {
        console.error('❌ 교육 과정 조회 중 오류 발생:', error);
        return [];
    }
}

/**
 * 모든 교육 과정 데이터를 반환하는 함수예요
 * @returns {Object} 교육 과정 데이터 객체
 */
function getAllEducationCourses() {
    return EDUCATION_COURSES;
}

