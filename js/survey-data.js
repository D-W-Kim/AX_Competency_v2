/**
 * 자가진단 설문 데이터 파일 (survey-data.js)
 * 
 * 이 파일은 자가진단 설문의 모든 질문과 관련 정보를 저장하는 파일이에요.
 * 마치 시험 문제지를 만드는 것처럼, 설문 질문들을 정리해두는 거예요!
 * 
 * 총 20문항이 4개 축으로 구성되어 있어요:
 * - Q1-Q5: 생성형 AI 활용 능력 및 의지
 * - Q6-Q10: 실무 데이터 활용 경험 및 태도
 * - Q11-Q15: 전략적 기획력, 커뮤니케이션, ROI 중심 AI 관점
 * - Q16-Q20: 모델 개발 및 고급 AI 기술 이해도
 */

// ============================================
// 설문 질문 데이터
// ============================================

/**
 * 자가진단 설문 질문 배열이에요
 * 각 질문은 객체 형태로 저장되어 있어요
 * 
 * 구조:
 * - id: 질문 번호 (1부터 시작)
 * - category: 질문이 속한 축 (카테고리)
 * - question: 질문 내용
 * - axis: 어떤 역량을 측정하는지 (나중에 점수 계산에 사용돼요)
 */
const SURVEY_QUESTIONS = [
    // ============================================
    // 축 1: 생성형 AI 활용 능력 및 의지 (Q1-Q5)
    // ============================================
    {
        id: 1,
        category: '생성형 AI 활용',
        question: 'ChatGPT, Claude, Gemini 같은 생성형 AI 도구를 업무에 활용한 경험이 있습니다.',
        axis: 'genAI'
    },
    {
        id: 2,
        category: '생성형 AI 활용',
        question: '생성형 AI를 사용하여 문서 작성, 이메일 작성, 보고서 작성 등의 반복 업무를 효율화한 경험이 있습니다.',
        axis: 'genAI'
    },
    {
        id: 3,
        category: '생성형 AI 활용',
        question: '생성형 AI 도구의 프롬프트(Prompt) 작성 방법을 이해하고 활용할 수 있습니다.',
        axis: 'genAI'
    },
    {
        id: 4,
        category: '생성형 AI 활용',
        question: '생성형 AI를 활용하여 창의적인 아이디어나 솔루션을 도출한 경험이 있습니다.',
        axis: 'genAI'
    },
    {
        id: 5,
        category: '생성형 AI 활용',
        question: '앞으로 생성형 AI 도구를 더 적극적으로 활용하여 업무 효율을 높이고 싶습니다.',
        axis: 'genAI'
    },
    
    // ============================================
    // 축 2: 실무 데이터 활용 경험 및 태도 (Q6-Q10)
    // ============================================
    {
        id: 6,
        category: '실무 데이터 활용',
        question: '업무에서 Excel, SQL, Python 등을 사용하여 데이터를 분석한 경험이 있습니다.',
        axis: 'field'
    },
    {
        id: 7,
        category: '실무 데이터 활용',
        question: '실무 데이터를 기반으로 문제를 발견하고 개선 방안을 도출한 경험이 있습니다.',
        axis: 'field'
    },
    {
        id: 8,
        category: '실무 데이터 활용',
        question: '데이터 시각화 도구(Tableau, Power BI, Excel 차트 등)를 사용하여 인사이트를 전달한 경험이 있습니다.',
        axis: 'field'
    },
    {
        id: 9,
        category: '실무 데이터 활용',
        question: '데이터 기반 의사결정의 중요성을 이해하고, 업무에 적용하려는 의지가 있습니다.',
        axis: 'field'
    },
    {
        id: 10,
        category: '실무 데이터 활용',
        question: '현업에서 발생하는 데이터를 수집, 정제, 분석하는 프로세스를 이해하고 있습니다.',
        axis: 'field'
    },
    
    // ============================================
    // 축 3: 전략적 기획력, 커뮤니케이션, ROI 중심 AI 관점 (Q11-Q15)
    // ============================================
    {
        id: 11,
        category: '전략 및 커뮤니케이션',
        question: 'AI 기술을 비즈니스 목표 달성에 연결하여 전략을 수립한 경험이 있습니다.',
        axis: 'strategy'
    },
    {
        id: 12,
        category: '전략 및 커뮤니케이션',
        question: 'AI 프로젝트의 ROI(투자 대비 효과)를 평가하고 우선순위를 결정한 경험이 있습니다.',
        axis: 'strategy'
    },
    {
        id: 13,
        category: '전략 및 커뮤니케이션',
        question: 'AI 기술을 비기술 직군에게 설명하고 공감대를 형성한 경험이 있습니다.',
        axis: 'strategy'
    },
    {
        id: 14,
        category: '전략 및 커뮤니케이션',
        question: '조직 내 AI 도입 전략을 기획하고 실행 계획을 수립한 경험이 있습니다.',
        axis: 'strategy'
    },
    {
        id: 15,
        category: '전략 및 커뮤니케이션',
        question: 'AI 프로젝트의 성공 기준을 정의하고, 성과를 측정한 경험이 있습니다.',
        axis: 'strategy'
    },
    
    // ============================================
    // 축 4: 모델 개발 및 고급 AI 기술 이해도 (Q16-Q20)
    // ============================================
    {
        id: 16,
        category: 'AI 기술 전문성',
        question: '머신러닝 모델을 직접 개발하거나 튜닝한 경험이 있습니다.',
        axis: 'expert'
    },
    {
        id: 17,
        category: 'AI 기술 전문성',
        question: '딥러닝, 신경망, 트랜스포머 등의 고급 AI 기술 개념을 이해하고 있습니다.',
        axis: 'expert'
    },
    {
        id: 18,
        category: 'AI 기술 전문성',
        question: 'Python, TensorFlow, PyTorch 등의 도구를 사용하여 AI 모델을 구현한 경험이 있습니다.',
        axis: 'expert'
    },
    {
        id: 19,
        category: 'AI 기술 전문성',
        question: 'AI 모델의 성능을 평가하고 개선하는 방법을 이해하고 있습니다.',
        axis: 'expert'
    },
    {
        id: 20,
        category: 'AI 기술 전문성',
        question: 'AI 기술을 조직에 내재화하고 팀원들에게 전파한 경험이 있습니다.',
        axis: 'expert'
    }
];

/**
 * 설문 페이지 구성 정보예요
 * 20문항을 4페이지로 나누어요 (각 페이지당 5문항)
 */
const SURVEY_PAGES = [
    {
        pageNumber: 1,
        title: '생성형 AI 활용 능력',
        description: '생성형 AI 도구 활용 능력 및 의지에 대해 평가해주세요.',
        questionIndices: [0, 1, 2, 3, 4] // Q1-Q5 (배열 인덱스는 0부터 시작)
    },
    {
        pageNumber: 2,
        title: '실무 데이터 활용 경험',
        description: '실무 데이터 활용 경험 및 태도에 대해 평가해주세요.',
        questionIndices: [5, 6, 7, 8, 9] // Q6-Q10
    },
    {
        pageNumber: 3,
        title: '전략 및 커뮤니케이션',
        description: '전략적 기획력, 커뮤니케이션, ROI 중심 AI 관점에 대해 평가해주세요.',
        questionIndices: [10, 11, 12, 13, 14] // Q11-Q15
    },
    {
        pageNumber: 4,
        title: 'AI 기술 전문성',
        description: '모델 개발 및 고급 AI 기술 이해도에 대해 평가해주세요.',
        questionIndices: [15, 16, 17, 18, 19] // Q16-Q20
    }
];

/**
 * 5점 척도 선택지 라벨이에요
 * Likert scale: 전혀 그렇지 않다(1) ~ 매우 그렇다(5)
 */
const LIKERT_SCALE_LABELS = {
    1: '전혀 그렇지 않다',
    2: '그렇지 않다',
    3: '보통이다',
    4: '그렇다',
    5: '매우 그렇다'
};

/**
 * 설문 질문 데이터를 가져오는 함수예요
 * @returns {Array} 설문 질문 배열
 */
function getSurveyQuestions() {
    return SURVEY_QUESTIONS;
}

/**
 * 설문 페이지 정보를 가져오는 함수예요
 * @returns {Array} 설문 페이지 배열
 */
function getSurveyPages() {
    return SURVEY_PAGES;
}

/**
 * 특정 페이지의 질문들을 가져오는 함수예요
 * @param {number} pageNumber - 페이지 번호 (1부터 시작)
 * @returns {Array} 해당 페이지의 질문 배열
 */
function getQuestionsByPage(pageNumber) {
    const page = SURVEY_PAGES.find(p => p.pageNumber === pageNumber);
    if (!page) {
        return [];
    }
    
    // 페이지 정보에 있는 질문 인덱스를 사용해서 실제 질문들을 가져와요
    return page.questionIndices.map(index => SURVEY_QUESTIONS[index]);
}

/**
 * Likert 척도 라벨을 가져오는 함수예요
 * @param {number} score - 점수 (1~5)
 * @returns {string} 라벨 텍스트
 */
function getLikertLabel(score) {
    return LIKERT_SCALE_LABELS[score] || '';
}

