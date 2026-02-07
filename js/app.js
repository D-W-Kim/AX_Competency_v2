/**
 * 메인 애플리케이션 파일 (app.js)
 * 
 * 이 파일은 웹 애플리케이션의 핵심 동작을 제어하는 파일이에요.
 * 마치 자동차의 엔진처럼, 모든 기능이 여기서 작동해요!
 * 
 * 주요 기능:
 * 1. 페이지가 로드될 때 초기화 작업 수행
 * 2. 사용자와의 상호작용 처리 (버튼 클릭, 입력 등)
 * 3. Airtable API와 통신하여 데이터 가져오기
 * 4. 화면에 데이터 표시하기
 */

// ============================================
// 전역 변수 선언
// ============================================
/**
 * 전역 변수는 프로그램 전체에서 사용할 수 있는 변수예요.
 * 마치 집 안에서 어디서든 사용할 수 있는 공용 물건 같은 거예요!
 */

// 현재 사용자의 정보를 저장하는 변수예요
// 나중에 사용자가 로그인하거나 정보를 입력하면 여기에 저장해요
let currentUser = null;

// 현재 진행 중인 설문의 상태를 저장하는 변수예요
// 설문이 몇 번째 질문인지, 답변은 무엇인지 등을 기억해요
let surveyState = {
    currentPage: 1,            // 현재 페이지 번호 (1부터 시작, 총 4페이지)
    answers: [],               // 사용자가 입력한 답변들 (20개, 각 1~5점)
    isCompleted: false         // 설문이 완료되었는지 여부
};

// 현재 진행 중인 역량 진단의 상태를 저장하는 변수예요
// 역량 진단이 몇 번째 페이지인지, 답변은 무엇인지 등을 기억해요
let competencyState = {
    currentPage: 1,            // 현재 페이지 번호 (1부터 시작, 총 8페이지)
    answers: [],               // 사용자가 입력한 답변들 (24개, 각 1~5점)
    isCompleted: false,        // 역량 진단이 완료되었는지 여부
    selectedRoles: []           // 선택된 희망 역할들
};

// 역량 진단 라디오 버튼 이벤트 리스너가 등록되었는지 확인하는 플래그예요
// 한 번만 등록되도록 하기 위한 변수예요
let competencyRadioListenersAttached = false;

// ============================================
// 초기화 함수
// ============================================
/**
 * 페이지가 처음 로드될 때 실행되는 함수예요.
 * 마치 집에 들어와서 불을 켜고 정리하는 것처럼, 
 * 웹페이지를 사용할 준비를 하는 거예요!
 */

/**
 * 애플리케이션을 초기화하는 함수예요
 * 페이지가 로드되면 자동으로 실행돼요
 */
function initializeApp() {
    console.log('🚀 애플리케이션이 시작되었습니다!');
    
    // 랜딩 페이지가 처음에 보이도록 설정해요
    // 메인 콘텐츠는 처음에 숨겨져 있어요
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    
    if (landingPage) {
        // 랜딩 페이지를 보이게 만들어요
        landingPage.classList.remove('hidden');
        landingPage.classList.add('opacity-100');
    }
    
    if (mainContent) {
        // 메인 콘텐츠를 숨겨요
        mainContent.classList.add('hidden');
        mainContent.classList.remove('opacity-100');
        mainContent.classList.add('opacity-0');
    }
    
    // 이벤트 리스너를 등록해요
    // 이벤트 리스너는 사용자가 버튼을 클릭하거나 입력할 때 실행되는 함수예요
    setupEventListeners();
}

/**
 * 초기 화면(홈 화면)을 표시하는 함수예요
 * 사용자가 처음 웹페이지에 들어왔을 때 보게 되는 화면이에요
 * @param {boolean} isConfigValid - 설정이 올바르게 되어 있는지 여부
 */
function renderHomeScreen(isConfigValid = true) {
    // app-content라는 ID를 가진 요소를 찾아요
    // 이 요소는 index.html에 있는 메인 콘텐츠 영역이에요
    const contentArea = document.getElementById('app-content');
    
    if (!contentArea) {
        console.error('❌ 콘텐츠 영역을 찾을 수 없습니다!');
        return;
    }
    
    // 설정 안내 메시지를 만들어요
    // 설정이 아직 안 되어 있으면 친절한 안내 메시지를 표시해요
    const configNotice = isConfigValid ? '' : `
        <div class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <span class="text-2xl">⚠️</span>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800">
                        초기 설정이 필요합니다
                    </h3>
                    <div class="mt-2 text-sm text-yellow-700">
                        <p>
                            Airtable API를 사용하려면 <code class="bg-yellow-100 px-2 py-1 rounded">config.js</code> 파일에서 
                            API 키와 Base ID를 설정해주세요.
                        </p>
                        <p class="mt-2">
                            현재는 기본 화면만 확인할 수 있어요. 기능을 사용하려면 설정을 완료해주세요!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 홈 화면의 HTML 내용을 만들어요
    // 이 내용이 사용자에게 보여져요
    contentArea.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">
                AX 수행 역할 자가진단에 오신 것을 환영합니다!
            </h2>
            
            ${configNotice}
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- 자가진단 설문 시작 버튼 -->
                <button 
                    id="start-survey-btn" 
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-200 ${!isConfigValid ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${!isConfigValid ? 'disabled' : ''}
                >
                    📋 자가진단 설문 시작하기
                </button>
                
                <!-- 역량 평가 시작 버튼 -->
                <button 
                    id="start-assessment-btn" 
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-200 ${!isConfigValid ? 'opacity-50 cursor-not-allowed' : ''}"
                    ${!isConfigValid ? 'disabled' : ''}
                >
                    📊 역량 평가 시작하기
                </button>
            </div>
            
            <div class="mt-8 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-gray-700">
                    💡 <strong>안내:</strong> 자가진단 설문을 통해 본인에게 적합한 AX 수행 역할을 확인한 후, 
                    해당 역할에 필요한 역량을 평가해보세요.
                </p>
            </div>
        </div>
    `;
}

/**
 * 이벤트 리스너를 설정하는 함수예요
 * 이벤트 리스너는 사용자의 행동(클릭, 입력 등)을 감지해서 
 * 적절한 함수를 실행하게 해주는 도구예요
 */
function setupEventListeners() {
    console.log('🔗 이벤트 리스너를 설정합니다...');
    
    // 진단 시작 버튼에 클릭 이벤트를 연결해요
    // 사용자가 랜딩 페이지의 "진단 시작" 버튼을 클릭하면 바로 설문을 시작해요
    const startDiagnosisBtn = document.getElementById('start-diagnosis-btn');
    if (startDiagnosisBtn) {
        console.log('✅ 진단 시작 버튼을 찾았습니다. 이벤트 리스너를 연결합니다.');
        startDiagnosisBtn.addEventListener('click', (event) => {
            console.log('🖱️ 진단 시작 버튼이 클릭되었습니다!');
            event.preventDefault(); // 기본 동작 방지
            // 메인 페이지로 이동한 후 설문을 시작해요
            navigateToMainPageAndStartSurvey();
        });
    } else {
        console.error('❌ 진단 시작 버튼을 찾을 수 없습니다! (id: start-diagnosis-btn)');
    }
    
    // 이벤트 위임을 사용하여 동적으로 생성되는 버튼에도 이벤트를 연결해요
    // 이렇게 하면 나중에 추가되는 버튼도 자동으로 작동해요
    document.addEventListener('click', (event) => {
        // 자가진단 설문 시작 버튼
        if (event.target.id === 'start-survey-btn' || event.target.closest('#start-survey-btn')) {
            console.log('🖱️ 자가진단 설문 시작 버튼이 클릭되었습니다!');
            event.preventDefault();
            startSurvey();
        }
        
        // 역량 평가 시작 버튼
        if (event.target.id === 'start-assessment-btn' || event.target.closest('#start-assessment-btn')) {
            console.log('🖱️ 역량 평가 시작 버튼이 클릭되었습니다!');
            event.preventDefault();
            startAssessment();
        }
        
        // 역량 진단 이전 페이지 버튼
        if (event.target.id === 'prev-competency-page-btn' || event.target.closest('#prev-competency-page-btn')) {
            const btn = event.target.id === 'prev-competency-page-btn' ? event.target : event.target.closest('#prev-competency-page-btn');
            if (btn && !btn.disabled && competencyState) {
                console.log('🖱️ 역량 진단 이전 페이지 버튼이 클릭되었습니다!');
                event.preventDefault();
                event.stopPropagation();
                
                // 첫 번째 페이지면 역할 선택 화면으로 돌아가요
                if (competencyState.currentPage === 1) {
                    console.log('📋 첫 번째 페이지입니다. 역할 선택 화면으로 돌아갑니다.');
                    
                    // localStorage에서 역할 결과를 불러와요
                    const savedRoleResult = localStorage.getItem('roleResult');
                    if (savedRoleResult) {
                        try {
                            const roleResult = JSON.parse(savedRoleResult);
                            renderRoleResultPage(roleResult);
                        } catch (error) {
                            console.error('❌ 역할 결과를 불러오는 중 오류 발생:', error);
                            alert('역할 선택 화면으로 돌아갈 수 없습니다. 자가진단을 다시 시작해주세요.');
                        }
                    } else {
                        console.warn('⚠️ 저장된 역할 결과가 없습니다. 자가진단을 다시 시작해주세요.');
                        alert('역할 선택 화면으로 돌아갈 수 없습니다. 자가진단을 다시 시작해주세요.');
                    }
                } else {
                    // 두 번째 페이지 이후면 이전 페이지로 이동해요
                    competencyState.currentPage = competencyState.currentPage - 1;
                    saveCompetencyState();
                    renderCompetencyPage(competencyState.currentPage);
                }
            }
        }
        
        // 역량 진단 다음 페이지 버튼
        if (event.target.id === 'next-competency-page-btn' || event.target.closest('#next-competency-page-btn')) {
            const btn = event.target.id === 'next-competency-page-btn' ? event.target : event.target.closest('#next-competency-page-btn');
            if (btn && competencyState) {
                console.log('🖱️ 역량 진단 다음 페이지 버튼이 클릭되었습니다!');
                event.preventDefault();
                event.stopPropagation();
                
                // 답변 검증 로직을 여기서 실행해요
                const pageNumber = competencyState.currentPage;
                const pages = competencyState.filteredPages;
                const currentPageInfo = pages.find(p => p.pageNumber === pageNumber);
                
                if (!currentPageInfo) {
                    console.error('❌ 현재 페이지 정보를 찾을 수 없습니다.');
                    return;
                }
                
                // 이전 페이지들의 질문 수를 모두 더해서 현재 페이지의 시작 인덱스를 계산해요
                let startIndex = 0;
                for (let i = 0; i < pageNumber - 1; i++) {
                    startIndex += pages[i].questionIndices.length;
                }
                
                // 각 질문에 대해 답변이 있는지 확인해요
                const unansweredQuestions = [];
                for (let localIndex = 0; localIndex < currentPageInfo.questionIndices.length; localIndex++) {
                    const filteredIndex = startIndex + localIndex;
                    const originalIndex = currentPageInfo.questionIndices[localIndex];
                    const question = COMPETENCY_QUESTIONS[originalIndex];
                    
                    if (!question) continue;
                    
                    const savedAnswer = competencyState.answers[filteredIndex];
                    const isValidAnswer = (answer) => {
                        return answer !== null && answer !== undefined && answer !== '' && !isNaN(answer) && answer >= 1 && answer <= 5;
                    };
                    
                    if (!isValidAnswer(savedAnswer)) {
                        // DOM에서 확인해요
                        const selectedRadio = document.querySelector(`input[type="radio"][data-question-id="${question.id}"]:checked`);
                        if (!selectedRadio) {
                            unansweredQuestions.push({
                                questionId: question.id,
                                questionText: question.question
                            });
                        } else {
                            // DOM에서 찾았으면 저장해요
                            const radioValue = parseInt(selectedRadio.value || selectedRadio.getAttribute('data-score') || selectedRadio.getAttribute('value'));
                            if (!isNaN(radioValue) && radioValue >= 1 && radioValue <= 5) {
                                competencyState.answers[filteredIndex] = radioValue;
                                saveCompetencyState();
                            } else {
                                unansweredQuestions.push({
                                    questionId: question.id,
                                    questionText: question.question
                                });
                            }
                        }
                    }
                }
                
                if (unansweredQuestions.length > 0) {
                    alert('모든 질문에 답변해주세요.');
                    const firstUnanswered = unansweredQuestions[0];
                    const questionRow = document.querySelector(`[data-question-id="${firstUnanswered.questionId}"]`)?.closest('tr');
                    if (questionRow) {
                        questionRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        questionRow.classList.add('ring-2', 'ring-red-500');
                        setTimeout(() => {
                            questionRow.classList.remove('ring-2', 'ring-red-500');
                        }, 2000);
                    }
                    return;
                }
                
                // 마지막 페이지면 역량 진단을 완료해요
                if (pageNumber >= pages.length) {
                    completeCompetencyDiagnosis();
                } else {
                    // 다음 페이지로 이동해요
                    competencyState.currentPage = pageNumber + 1;
                    saveCompetencyState();
                    renderCompetencyPage(competencyState.currentPage);
                }
            }
        }
    });
    
    console.log('✅ 이벤트 리스너 설정이 완료되었습니다.');
}

// ============================================
// 페이지 전환 함수
// ============================================
/**
 * 랜딩 페이지에서 메인 페이지로 전환하는 함수예요
 * 사용자가 "진단 시작" 버튼을 클릭하면 실행돼요
 * 부드러운 애니메이션 효과와 함께 페이지가 전환돼요
 */
function navigateToMainPage() {
    console.log('🚀 메인 페이지로 이동합니다!');
    
    // 랜딩 페이지와 메인 콘텐츠 영역을 찾아요
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    
    // 요소들이 존재하는지 확인해요
    if (!landingPage || !mainContent) {
        console.error('❌ 페이지 요소를 찾을 수 없습니다!');
        return;
    }
    
    // 랜딩 페이지를 서서히 사라지게 만들어요 (페이드 아웃 효과)
    // opacity-0은 완전히 투명하게 만드는 거예요
    landingPage.classList.add('opacity-0');
    
    // 애니메이션이 끝난 후에 랜딩 페이지를 완전히 숨기고 메인 콘텐츠를 보여줘요
    // setTimeout은 일정 시간 후에 함수를 실행하는 거예요
    // 500ms(0.5초) 후에 실행해요 (애니메이션 시간과 맞춰요)
    setTimeout(() => {
        // 랜딩 페이지를 완전히 숨겨요
        landingPage.classList.add('hidden');
        
        // 메인 콘텐츠를 보이게 만들어요
        mainContent.classList.remove('hidden');
        
        // 메인 콘텐츠가 나타나는 애니메이션을 시작해요
        // 약간의 지연을 주고 opacity를 1로 만들어요 (페이드 인 효과)
        setTimeout(() => {
            mainContent.classList.remove('opacity-0');
            mainContent.classList.add('opacity-100');
            
            // 메인 페이지가 표시되었으니 초기화 작업을 해요
            initializeMainPage();
        }, 50); // 50ms 후에 페이드 인 시작 (매우 짧은 지연)
    }, 500); // 500ms 후에 페이지 전환
}

/**
 * 랜딩 페이지에서 메인 페이지로 전환하고 바로 설문을 시작하는 함수예요
 * 사용자가 랜딩 페이지의 "진단 시작" 버튼을 클릭하면 실행돼요
 */
function navigateToMainPageAndStartSurvey() {
    console.log('🚀 메인 페이지로 이동하고 설문을 시작합니다!');
    console.log('현재 시간:', new Date().toISOString());
    
    // 랜딩 페이지와 메인 콘텐츠 영역을 찾아요
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    
    console.log('랜딩 페이지 요소:', landingPage);
    console.log('메인 콘텐츠 요소:', mainContent);
    
    // 요소들이 존재하는지 확인해요
    if (!landingPage || !mainContent) {
        console.error('❌ 페이지 요소를 찾을 수 없습니다!');
        console.error('landingPage:', landingPage);
        console.error('mainContent:', mainContent);
        console.error('전체 DOM 구조를 확인합니다...');
        console.log('document.body:', document.body);
        return;
    }
    
    // 랜딩 페이지를 서서히 사라지게 만들어요 (페이드 아웃 효과)
    landingPage.classList.add('opacity-0');
    
    // 애니메이션이 끝난 후에 메인 콘텐츠를 보여주고 설문을 시작해요
    setTimeout(() => {
        // 랜딩 페이지를 완전히 숨겨요
        landingPage.classList.add('hidden');
        
        // 메인 콘텐츠를 보이게 만들어요
        mainContent.classList.remove('hidden');
        
        // 메인 콘텐츠가 나타나는 애니메이션을 시작해요
        setTimeout(() => {
            mainContent.classList.remove('opacity-0');
            mainContent.classList.add('opacity-100');
            
            // app-content 요소가 존재하는지 확인해요
            const appContent = document.getElementById('app-content');
            if (!appContent) {
                console.error('❌ app-content 요소를 찾을 수 없습니다!');
                return;
            }
            
            // 설문 데이터 함수들이 로드되었는지 확인해요
            if (typeof getSurveyPages !== 'function') {
                console.error('❌ getSurveyPages 함수를 찾을 수 없습니다! survey-data.js가 로드되었는지 확인해주세요.');
                return;
            }
            
            console.log('✅ 모든 준비가 완료되었습니다. 설문을 시작합니다.');
            
            // 바로 설문을 시작해요
            startSurvey();
        }, 50);
    }, 500);
}

/**
 * 메인 페이지를 초기화하는 함수예요
 * 메인 페이지로 이동한 후에 실행돼요
 */
function initializeMainPage() {
    console.log('📋 메인 페이지가 초기화되었습니다!');
    
    // 설정이 올바른지 확인해요
    // silent 모드로 확인하여 오류 메시지를 콘솔에 출력하지 않아요
    // (설문 기능은 Airtable을 사용하지 않으므로)
    const isConfigValid = typeof validateConfig === 'function' ? validateConfig(true) : false;
    
    // 초기 화면을 표시해요 (설정 상태와 함께)
    renderHomeScreen(isConfigValid);
}

// ============================================
// 설문 관련 함수
// ============================================
/**
 * 자가진단 설문을 시작하는 함수예요
 * 사용자가 "자가진단 설문 시작하기" 버튼을 클릭하면 실행돼요
 */
function startSurvey() {
    console.log('📋 설문이 시작되었습니다!');
    
    // app-content 요소가 존재하는지 확인해요
    const contentArea = document.getElementById('app-content');
    if (!contentArea) {
        console.error('❌ app-content 요소를 찾을 수 없습니다!');
        console.error('현재 DOM 상태를 확인합니다...');
        return;
    }
    
    // 설문 데이터 함수들이 로드되었는지 확인해요
    if (typeof getSurveyPages !== 'function') {
        console.error('❌ getSurveyPages 함수를 찾을 수 없습니다!');
        console.error('survey-data.js 파일이 제대로 로드되었는지 확인해주세요.');
        return;
    }
    
    if (typeof getQuestionsByPage !== 'function') {
        console.error('❌ getQuestionsByPage 함수를 찾을 수 없습니다!');
        return;
    }
    
    if (typeof getLikertLabel !== 'function') {
        console.error('❌ getLikertLabel 함수를 찾을 수 없습니다!');
        return;
    }
    
    // 설문 상태를 초기화해요
    // 새로운 설문을 시작하므로 이전 답변들을 모두 지워요
    surveyState = {
        currentPage: 1,
        answers: new Array(20).fill(null), // 20문항을 위한 배열, 처음에는 모두 null
        isCompleted: false
    };
    
    // localStorage에 설문 상태를 저장해요
    // 이렇게 하면 페이지를 새로고침해도 답변이 유지돼요
    saveSurveyState();
    
    console.log('✅ 설문 상태 초기화 완료. 첫 번째 페이지를 렌더링합니다.');
    
    // 첫 번째 페이지를 표시해요
    renderSurveyPage(1);
}

/**
 * 설문 페이지를 화면에 표시하는 함수예요
 * @param {number} pageNumber - 표시할 페이지 번호 (1부터 시작)
 */
function renderSurveyPage(pageNumber) {
    console.log(`📄 설문 페이지 ${pageNumber}를 렌더링합니다.`);
    
    const contentArea = document.getElementById('app-content');
    
    if (!contentArea) {
        console.error('❌ 콘텐츠 영역을 찾을 수 없습니다!');
        return;
    }
    
    // 설문 페이지 정보를 가져와요
    let pages;
    try {
        pages = getSurveyPages();
        console.log('✅ 설문 페이지 정보를 가져왔습니다:', pages);
    } catch (error) {
        console.error('❌ getSurveyPages() 함수 실행 중 오류 발생:', error);
        return;
    }
    
    if (!pages || pages.length === 0) {
        console.error('❌ 설문 페이지 정보가 비어있습니다!');
        return;
    }
    
    const currentPageInfo = pages.find(p => p.pageNumber === pageNumber);
    
    if (!currentPageInfo) {
        console.error(`❌ 페이지 ${pageNumber}의 정보를 찾을 수 없습니다!`);
        console.error('사용 가능한 페이지:', pages.map(p => p.pageNumber));
        return;
    }
    
    console.log('✅ 현재 페이지 정보:', currentPageInfo);
    
    // 해당 페이지의 질문들을 가져와요
    let questions;
    try {
        questions = getQuestionsByPage(pageNumber);
        console.log('✅ 질문을 가져왔습니다:', questions.length, '개');
    } catch (error) {
        console.error('❌ getQuestionsByPage() 함수 실행 중 오류 발생:', error);
        return;
    }
    
    if (questions.length === 0) {
        console.error('❌ 질문을 찾을 수 없습니다!');
        return;
    }
    
    // 진행률을 계산해요 (현재 페이지 / 전체 페이지 * 100)
    const progress = (pageNumber / pages.length) * 100;
    
    // 질문 행들을 만들어요 (좌측: 질문, 우측: 라디오 버튼)
    const questionRows = questions.map((question, index) => {
        // 전체 질문 번호를 계산해요 (페이지 내 인덱스가 아니라 전체 질문 번호)
        const globalQuestionIndex = currentPageInfo.questionIndices[index];
        // 현재 저장된 답변을 가져와요
        const currentAnswer = surveyState.answers[globalQuestionIndex];
        
        // 라디오 버튼 옵션들을 만들어요
        // 5점 척도: 1(전혀 그렇지 않다) ~ 5(매우 그렇다) 순서로 배치
        const radioOptions = [1, 2, 3, 4, 5].map(score => {
            const isSelected = currentAnswer === score;
            const label = getLikertLabel(score);
            return `
                <label class="flex flex-col items-center cursor-pointer group flex-1 min-w-0">
                    <input
                        type="radio"
                        name="question-${question.id}"
                        value="${score}"
                        data-question-id="${question.id}"
                        data-score="${score}"
                        ${isSelected ? 'checked' : ''}
                        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer flex-shrink-0"
                        aria-label="${label}"
                    />
                    <span class="mt-0.5 text-xs text-gray-700 text-center whitespace-nowrap">${score}</span>
                    <span class="mt-0.5 text-xs text-gray-600 text-center leading-tight px-0.5">${label}</span>
                </label>
            `;
        }).join('');
        
        return `
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="py-3 px-4 align-top w-1/2">
                    <div class="flex items-start">
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded mr-2 flex-shrink-0">
                            Q${question.id}
                        </span>
                        <span class="text-xs sm:text-sm text-gray-800 leading-relaxed">
                            ${question.question}
                        </span>
                    </div>
                </td>
                <td class="py-3 px-4 align-top w-1/2">
                    <div class="flex flex-nowrap justify-between items-start w-full gap-1">
                        ${radioOptions}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    // 이전/다음 버튼을 만들어요
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === pages.length;
    
    const navigationButtons = `
        <div class="flex justify-between items-center mt-6">
            <button
                id="prev-page-btn"
                type="button"
                ${isFirstPage ? 'disabled' : ''}
                class="
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${isFirstPage 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                    }
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                "
            >
                ← 이전
            </button>
            <span class="text-sm text-gray-600">
                ${pageNumber} / ${pages.length}
            </span>
            <button
                id="next-page-btn"
                type="button"
                class="
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    bg-blue-600 hover:bg-blue-700 text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:bg-gray-300 disabled:cursor-not-allowed
                "
            >
                ${isLastPage ? '완료' : '다음 →'}
            </button>
        </div>
    `;
    
    // 전체 HTML을 조합해요
    contentArea.innerHTML = `
        <div class="w-full max-w-6xl mx-auto space-y-4">
            <!-- 페이지 헤더 -->
            <div class="text-center">
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-600">
                    ${currentPageInfo.title}
                </h2>
            </div>
            
            <!-- 진행률 바 -->
            <div class="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                <div 
                    class="bg-blue-600 h-3 sm:h-4 rounded-full transition-all duration-500"
                    style="width: ${progress}%"
                    role="progressbar"
                    aria-valuenow="${pageNumber}"
                    aria-valuemin="1"
                    aria-valuemax="${pages.length}"
                    aria-label="진행률 ${Math.round(progress)}%"
                ></div>
            </div>
            
            <!-- 질문 테이블 (좌측: 질문, 우측: 라디오 버튼) -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="py-3 px-4 text-left text-xs sm:text-sm font-semibold text-gray-700 w-1/2">
                                설문 문항
                            </th>
                            <th class="py-3 px-4 text-center text-xs sm:text-sm font-semibold text-gray-700 w-1/2">
                                응답 선택 (1: 전혀 그렇지 않다 ~ 5: 매우 그렇다)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${questionRows}
                    </tbody>
                </table>
            </div>
            
            <!-- 네비게이션 버튼 -->
            ${navigationButtons}
        </div>
    `;
    
    // 이벤트 리스너를 연결해요
    setupSurveyPageListeners(pageNumber);
    
    // 스크롤을 맨 위로 이동해요
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 설문 페이지의 이벤트 리스너를 설정하는 함수예요
 * @param {number} pageNumber - 현재 페이지 번호
 */
function setupSurveyPageListeners(pageNumber) {
    // 라디오 버튼 change 이벤트
    // 라디오 버튼이 선택되면 change 이벤트가 발생해요
    document.querySelectorAll('input[type="radio"][data-question-id]').forEach(radio => {
        radio.addEventListener('change', function() {
            const questionId = parseInt(this.getAttribute('data-question-id'));
            const score = parseInt(this.getAttribute('data-score') || this.value);
            
            console.log(`📝 질문 ${questionId}에 대한 답변: ${score}점`);
            
            // 답변을 저장해요
            // questionId는 1부터 시작하므로 배열 인덱스로 변환 (questionId - 1)
            surveyState.answers[questionId - 1] = score;
            saveSurveyState();
        });
    });
    
    // 이전 페이지 버튼
    const prevBtn = document.getElementById('prev-page-btn');
    if (prevBtn && !prevBtn.disabled) {
        prevBtn.addEventListener('click', () => {
            if (pageNumber > 1) {
                surveyState.currentPage = pageNumber - 1;
                saveSurveyState();
                renderSurveyPage(surveyState.currentPage);
            }
        });
    }
    
    // 다음 페이지 버튼
    const nextBtn = document.getElementById('next-page-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // 현재 페이지의 모든 질문에 답변했는지 확인해요
            const pages = getSurveyPages();
            const currentPageInfo = pages.find(p => p.pageNumber === pageNumber);
            const allAnswered = currentPageInfo.questionIndices.every(index => {
                return surveyState.answers[index] !== null;
            });
            
            if (!allAnswered) {
                // 답변하지 않은 질문이 있으면 에러 메시지를 표시해요
                alert('모든 질문에 답변해주세요.');
                return;
            }
            
            // 마지막 페이지면 설문을 완료해요
            if (pageNumber >= pages.length) {
                completeSurvey();
            } else {
                // 다음 페이지로 이동해요
                surveyState.currentPage = pageNumber + 1;
                saveSurveyState();
                renderSurveyPage(surveyState.currentPage);
            }
        });
    }
}

/**
 * 설문 상태를 localStorage에 저장하는 함수예요
 * 이렇게 하면 페이지를 새로고침해도 답변이 유지돼요
 */
function saveSurveyState() {
    try {
        localStorage.setItem('surveyState', JSON.stringify(surveyState));
    } catch (error) {
        console.error('❌ 설문 상태 저장 실패:', error);
    }
}

/**
 * localStorage에서 설문 상태를 불러오는 함수예요
 */
function loadSurveyState() {
    try {
        const saved = localStorage.getItem('surveyState');
        if (saved) {
            surveyState = JSON.parse(saved);
            return true;
        }
    } catch (error) {
        console.error('❌ 설문 상태 불러오기 실패:', error);
    }
    return false;
}

/**
 * 설문을 완료하는 함수예요
 * 모든 답변을 확인하고 역할을 분류해요
 */
function completeSurvey() {
    console.log('✅ 설문이 완료되었습니다!');
    
    // 모든 답변이 입력되었는지 확인해요
    const allAnswered = surveyState.answers.every(answer => answer !== null);
    
    if (!allAnswered) {
        alert('모든 질문에 답변해주세요.');
        return;
    }
    
    // 설문 완료 상태로 변경해요
    surveyState.isCompleted = true;
    saveSurveyState();
    
    // 역할 분류 함수를 호출해요
    const roleResult = calculateRoleFromAnswers(surveyState.answers);
    
    // 결과를 localStorage에 저장해요
    localStorage.setItem('roleResult', JSON.stringify(roleResult));
    localStorage.setItem('surveyAnswers', JSON.stringify(surveyState.answers));
    
    // Airtable에 설문 결과 저장하기 (비동기로 실행, 실패해도 계속 진행)
    // 사용자가 사번을 입력하지 않았을 수도 있으므로 선택사항으로 처리해요
    saveSurveyResultToAirtable({
        employeeId: '', // 나중에 사번 입력 기능을 추가할 수 있어요
        answers: surveyState.answers,
        roleResult: roleResult
    }).then(result => {
        console.log('✅ Airtable 설문 결과 저장 성공:', result);
        // 저장된 레코드 ID를 localStorage에 저장해요 (나중에 역량 진단 결과와 연결하기 위해)
        if (result.records && result.records.length > 0) {
            const recordId = result.records[0].id;
            console.log('💾 저장된 레코드 ID:', recordId);
            localStorage.setItem('surveyRecordId', recordId);
        }
    }).catch(error => {
        console.error('❌ Airtable 설문 결과 저장 실패:', error);
        console.warn('⚠️ Airtable 저장 실패 (계속 진행):', error);
        // Airtable 저장이 실패해도 사용자 경험에는 영향을 주지 않아요
    });
    
    // 결과 페이지로 이동해요
    console.log('역할 분류 결과:', roleResult);
    
    // 역할 결과 페이지를 표시해요
    renderRoleResultPage(roleResult);
}

// ============================================
// 역할 분류 함수
// ============================================
/**
 * 설문 답변을 기반으로 사용자의 AI 수행 역할을 분류하는 함수예요
 * 프롬프트 지시문의 단계 2-2에 명시된 로직을 구현한 거예요
 * 
 * @param {Array<number>} answers - 20개 질문에 대한 답변 배열 (각 1~5점)
 * @returns {Object} 역할 분류 결과 객체
 *   - finalRole: 최종 역할명 (문자열)
 *   - description: 역할 설명 (문자열)
 */
function calculateRoleFromAnswers(answers) {
    // 배열의 평균을 계산하는 함수예요
    // reduce는 배열의 모든 값을 더하는 거예요
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    
    // 4개 축의 점수를 계산해요
    // Q1-Q5: 생성형 AI 활용 능력 및 의지
    const genAI_score = avg(answers.slice(0, 5));
    
    // Q6-Q10: 실무 데이터 활용 경험 및 태도
    const field_score = avg(answers.slice(5, 10));
    
    // Q11-Q15: 전략적 기획력, 커뮤니케이션, ROI 중심 AI 관점
    const strategy_score = avg(answers.slice(10, 15));
    
    // Q16-Q20: 모델 개발 및 고급 AI 기술 이해도
    const expert_score = avg(answers.slice(15, 20));
    
    // 모든 점수를 배열로 모아요
    const allScores = [genAI_score, field_score, strategy_score, expert_score];
    
    // 역할 분류 로직을 순서대로 확인해요
    // 우선순위가 높은 조건부터 확인하는 거예요
    
    // 1. 모든 점수가 2.5 미만이면 AI 입문자
    if (allScores.every(score => score < 2.5)) {
        return {
            finalRole: 'AI 입문자',
            description: 'AI 기술과 활용에 대한 학습이 필요한 초기 단계입니다. 이후 원하는 역할을 선택해 필요한 역량을 진단하고, 맞춤형 교육을 받아보세요.',
            scores: {
                genAI: genAI_score,
                field: field_score,
                strategy: strategy_score,
                expert: expert_score
            }
        };
    }
    
    // 2. 전문가 점수가 3.5 이상이고 생성형 AI 점수가 3.5 미만이면 AI 전문가
    if (expert_score >= 3.5 && genAI_score < 3.5) {
        return {
            finalRole: 'AI 전문가',
            description: '당신은 고급 모델링과 AI 기술 내재화에 강점을 지닌 기술 전문가입니다.',
            scores: {
                genAI: genAI_score,
                field: field_score,
                strategy: strategy_score,
                expert: expert_score
            }
        };
    }
    
    // 3. 전략 점수가 2.5 이상이고 실무 데이터 활용 점수가 3.0 미만이면 현업 AI 관리자
    if (strategy_score >= 2.5 && field_score < 3.0) {
        return {
            finalRole: '현업 AI 관리자',
            description: '당신은 현장 중심 AI 과제를 기획·조율하고, 팀원 교육·도입을 주도하는 현업 리더로서 실무와 전략을 연결하는 실행 관리자입니다.',
            scores: {
                genAI: genAI_score,
                field: field_score,
                strategy: strategy_score,
                expert: expert_score
            }
        };
    }
    
    // 4. 전략 점수가 3.5 이상이고 실무 데이터 활용 점수가 3.0 이상이면 AI 전략 리더
    if (strategy_score >= 3.5 && field_score >= 3.0) {
        return {
            finalRole: 'AI 전략 리더',
            description: '당신은 조직의 AI 전략을 설계하고 책임 있게 운영할 수 있는 관리자 유형입니다.',
            scores: {
                genAI: genAI_score,
                field: field_score,
                strategy: strategy_score,
                expert: expert_score
            }
        };
    }
    
    // 5. 생성형 AI 점수가 3.5 이상이면 생성형 AI 활용자
    if (genAI_score >= 3.5) {
        return {
            finalRole: '생성형 AI 활용자',
            description: '당신은 생성형 AI 도구를 활용해 반복 업무를 줄이고 창의성을 발휘하는 강점을 지녔습니다.',
            scores: {
                genAI: genAI_score,
                field: field_score,
                strategy: strategy_score,
                expert: expert_score
            }
        };
    }
    
    // 6. 실무 데이터 활용 점수가 3.0 이상이면 AI 실무자
    if (field_score >= 3.0) {
        return {
            finalRole: 'AI 실무자',
            description: '당신은 현업에서 데이터를 기반으로 개선 활동을 주도하는 실무형 AI 활용자입니다.',
            scores: {
                genAI: genAI_score,
                field: field_score,
                strategy: strategy_score,
                expert: expert_score
            }
        };
    }
    
    // 7. 위 조건에 해당하지 않으면 기본값으로 AI 입문자
    return {
        finalRole: 'AI 입문자',
        description: 'AI 기술과 활용에 대한 학습이 필요한 초기 단계입니다. 이후 원하는 역할을 선택해 필요한 역량을 진단하고, 맞춤형 교육을 받아보세요.',
        scores: {
            genAI: genAI_score,
            field: field_score,
            strategy: strategy_score,
            expert: expert_score
        }
    };
}

// ============================================
// 역할 결과 페이지 함수
// ============================================
/**
 * 역할 결과 페이지를 화면에 표시하는 함수예요
 * 설문 완료 후 진단 결과와 희망 역할 선택 화면을 보여줘요
 * 
 * @param {Object} roleResult - 역할 분류 결과 객체
 *   - finalRole: 최종 역할명
 *   - description: 역할 설명
 *   - scores: 4개 축 점수 객체
 */
function renderRoleResultPage(roleResult) {
    console.log('📊 역할 결과 페이지를 렌더링합니다.');
    
    const contentArea = document.getElementById('app-content');
    
    if (!contentArea) {
        console.error('❌ 콘텐츠 영역을 찾을 수 없습니다!');
        return;
    }
    
    // 4개 축 점수 정보를 가져와요
    const scores = roleResult.scores || {};
    const genAIScore = scores.genAI || 0;
    const fieldScore = scores.field || 0;
    const strategyScore = scores.strategy || 0;
    const expertScore = scores.expert || 0;
    
    // 막대 그래프를 만들어요 (Tailwind CSS만 사용)
    // 각 축의 점수를 0~5 범위에서 0~100%로 변환해서 막대 길이를 결정해요
    const createBarChart = (label, score) => {
        const percentage = (score / 5) * 100; // 5점 만점을 100%로 변환
        return `
            <div class="mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm sm:text-base font-medium text-gray-700">${label}</span>
                    <span class="text-sm sm:text-base font-semibold text-gray-800">${score.toFixed(1)} / 5.0</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4 sm:h-5">
                    <div 
                        class="bg-blue-600 h-4 sm:h-5 rounded-full transition-all duration-500"
                        style="width: ${percentage}%"
                        role="progressbar"
                        aria-valuenow="${score}"
                        aria-valuemin="0"
                        aria-valuemax="5"
                        aria-label="${label}: ${score.toFixed(1)}점"
                    ></div>
                </div>
            </div>
        `;
    };
    
    // 사용 가능한 역할 목록이에요 (AI 입문자 제외)
    const availableRoles = [
        'AI 전문가',
        'AI 실무자',
        '생성형 AI 활용자',
        '현업 AI 관리자',
        'AI 전략 리더'
    ];
    
    // 역할별 정의 정보예요
    const roleDefinitions = {
        'AI 전문가': 'AI 기술의 전문지식을 보유하고, AI 모델을 직접 개발·운영하거나 새로운 솔루션을 설계하는 고급 기술 인력.',
        'AI 실무자': '자신의 업무 영역에서 데이터를 활용해 AI 기술을 적용하거나, AI 전문가와 협업해 프로젝트를 수행하는 실무 중심 인력 (사내 Citizen Data Scientist역할 포함)',
        '생성형 AI 활용자': '생성형 AI 도구를 적극적으로 활용하여 본인의 비개발 직무를 자동화하거나, 문서·보고서·아이디어 생성 등에서 생산성을 높이는 사용자',
        '현업 AI 관리자': 'AI 프로젝트를 현장 단위에서 기획·조율하고, 팀원 교육·도입을 주도하는 현업 리더 또는 관리자로서 실무와 전략을 연결하는 실행 관리자',
        'AI 전략 리더': '조직 차원의 AI 도입 방향과 투자 우선순위를 설계하고, 윤리·보안·성과(ROI) 관점에서 책임 있는 기술 도입을 리드하는 의사결정자'
    };
    
    // 처음 화면에는 아무것도 선택되지 않은 상태로 표시해요
    // localStorage에 저장된 값이 있어도 처음에는 무시하고 빈 배열로 시작해요
    let previouslySelectedRoles = [];
    
    // 결과 화면을 처음 렌더링할 때는 항상 빈 배열로 시작
    // 사용자가 직접 선택한 후에만 localStorage에 저장되고 다음에 불러와집니다
    
    // 역할 선택 체크박스들을 만들어요 (복수 선택 가능)
    const roleCheckboxes = availableRoles.map(role => {
        const isChecked = previouslySelectedRoles.includes(role);
        const definition = roleDefinitions[role] || '';
        return `
            <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isChecked 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
            }">
                <input
                    type="checkbox"
                    name="desired-role"
                    value="${role}"
                    ${isChecked ? 'checked' : ''}
                    class="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer flex-shrink-0"
                    aria-label="${role} 선택"
                />
                <div class="ml-3 flex-1">
                    <div class="font-semibold text-gray-800 text-base sm:text-lg mb-1">
                        ${role}
                    </div>
                    <div class="text-sm text-gray-600 leading-relaxed">
                        ${definition}
                    </div>
                </div>
            </label>
        `;
    }).join('');
    
    // 전체 HTML을 조합해요
    contentArea.innerHTML = `
        <div class="w-full max-w-4xl mx-auto space-y-6">
            <!-- 페이지 제목 -->
            <div class="text-center">
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">
                    자가진단 결과
                </h2>
            </div>
            
            <!-- 진단 결과 요약 카드 -->
            <div class="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-200">
                <div class="text-center mb-4">
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        당신의 현재 AX 수행 역할은: <span class="text-blue-600">${roleResult.finalRole}</span>
                    </h3>
                    <p class="text-sm sm:text-base text-gray-600">
                        ${roleResult.description}
                    </p>
                </div>
            </div>
            
            <!-- 4개 축 점수 시각화 카드 -->
            <div class="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-200">
                <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-6">
                    4개 축 점수 분석
                </h3>
                ${createBarChart('생성형 AI 활용', genAIScore)}
                ${createBarChart('실무 데이터 활용', fieldScore)}
                ${createBarChart('전략 기획', strategyScore)}
                ${createBarChart('AI 기술 이해', expertScore)}
            </div>
            
            <!-- 희망 역할 선택 카드 -->
            <div class="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-200">
                <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    희망하는 AX 수행 역할 선택
                </h3>
                <p class="text-sm sm:text-base text-gray-600 mb-6">
                    희망하는 AX 수행 역할을 선택해주세요 (복수 선택 가능, 향후 역량진단/추천에 활용됩니다).
                </p>
                
                <!-- 역할별 정의 섹션 -->
                <div class="mb-6">
                    <h4 class="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                        [역할별 정의]
                    </h4>
                    <div class="space-y-3">
                        ${roleCheckboxes}
                    </div>
                </div>
            </div>
            
            <!-- 역량 진단 시작하기 버튼 -->
            <div class="flex justify-center">
                <button
                    id="start-competency-diagnosis-btn"
                    type="button"
                    class="
                        bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                        text-white font-bold
                        py-4 px-8 sm:py-5 sm:px-10 md:py-6 md:px-12
                        text-lg sm:text-xl md:text-2xl
                        rounded-lg shadow-lg hover:shadow-xl
                        transform hover:scale-105 active:scale-100
                        transition-all duration-300
                        focus:outline-none focus:ring-4 focus:ring-blue-300
                        min-w-48 sm:min-w-56 md:min-w-64
                        cursor-pointer
                    "
                    aria-label="역량 진단 시작하기"
                >
                    역량 진단 시작하기 →
                </button>
            </div>
        </div>
    `;
    
    // 이벤트 리스너를 연결해요
    setupRoleResultPageListeners();
    
    // 스크롤을 맨 위로 이동해요
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 역할 결과 페이지의 이벤트 리스너를 설정하는 함수예요
 */
function setupRoleResultPageListeners() {
    // 희망 역할 선택 체크박스 변경 이벤트 (복수 선택 지원)
    const roleCheckboxes = document.querySelectorAll('input[name="desired-role"]');
    roleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 선택된 모든 역할을 수집해요
            const selectedRoles = Array.from(document.querySelectorAll('input[name="desired-role"]:checked'))
                .map(cb => cb.value);
            
            console.log('📝 희망 역할이 선택/해제되었습니다:', selectedRoles);
            
            // localStorage에 배열로 저장해요
            localStorage.setItem('selectedRoles', JSON.stringify(selectedRoles));
            
            // 호환성을 위해 첫 번째 선택된 역할도 별도로 저장해요
            if (selectedRoles.length > 0) {
                localStorage.setItem('selectedRole', selectedRoles[0]);
            }
            
            // 체크박스의 부모 label 스타일을 업데이트해요
            const label = this.closest('label');
            if (this.checked) {
                label.classList.remove('border-gray-300', 'bg-white');
                label.classList.add('border-blue-600', 'bg-blue-50');
            } else {
                label.classList.remove('border-blue-600', 'bg-blue-50');
                label.classList.add('border-gray-300', 'bg-white');
            }
        });
    });
    
    // 역량 진단 시작하기 버튼 클릭 이벤트
    const startBtn = document.getElementById('start-competency-diagnosis-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('🚀 역량 진단을 시작합니다!');
            
            // 선택된 모든 희망 역할을 수집해요
            const selectedRoles = Array.from(document.querySelectorAll('input[name="desired-role"]:checked'))
                .map(cb => cb.value);
            
            if (selectedRoles.length === 0) {
                alert('최소 1개 이상의 역할을 선택해주세요.');
                return;
            }
            
            // localStorage에 배열로 저장해요
            localStorage.setItem('selectedRoles', JSON.stringify(selectedRoles));
            
            // 호환성을 위해 첫 번째 선택된 역할도 별도로 저장해요
            localStorage.setItem('selectedRole', selectedRoles[0]);
            
            console.log('✅ 희망 역할이 저장되었습니다:', selectedRoles);
            
            // 역량 진단을 시작해요
            startCompetencyDiagnosis(selectedRoles);
        });
    }
}

// ============================================
// 역량 진단 관련 함수
// ============================================
/**
 * 역량 진단을 시작하는 함수예요
 * 사용자가 "역량 진단 시작하기" 버튼을 클릭하면 실행돼요
 * 
 * @param {Array<string>} selectedRoles - 선택된 희망 역할 배열
 */
function startCompetencyDiagnosis(selectedRoles) {
    console.log('📊 역량 진단이 시작되었습니다!');
    console.log('선택된 역할:', selectedRoles);
    
    // 선택된 역할에 따라 필요한 역량만 필터링해요
    const filteredPages = getFilteredCompetencyPages(selectedRoles);
    const totalQuestions = filteredPages.reduce((sum, page) => sum + page.questionIndices.length, 0);
    
    console.log('필터링된 역량 페이지:', filteredPages);
    console.log('총 질문 수:', totalQuestions);
    
    // 역량 진단 상태를 초기화해요
    competencyState = {
        currentPage: 1,
        answers: new Array(totalQuestions).fill(null), // 필터링된 문항 수만큼 배열 생성
        isCompleted: false,
        selectedRoles: selectedRoles || [],
        filteredPages: filteredPages // 필터링된 페이지 정보 저장
    };
    
    // localStorage에 역량 진단 상태를 저장해요
    saveCompetencyState();
    
    // 첫 번째 페이지를 표시해요
    renderCompetencyPage(1);
}

/**
 * 역량 진단 페이지를 화면에 표시하는 함수예요
 * @param {number} pageNumber - 표시할 페이지 번호 (1부터 시작)
 */
function renderCompetencyPage(pageNumber) {
    console.log(`📄 역량 진단 페이지 ${pageNumber}를 렌더링합니다.`);
    
    const contentArea = document.getElementById('app-content');
    
    if (!contentArea) {
        console.error('❌ 콘텐츠 영역을 찾을 수 없습니다!');
        return;
    }
    
    // 필터링된 페이지 정보를 가져와요
    let pages = competencyState.filteredPages;
    
    if (!pages || pages.length === 0) {
        // 필터링된 페이지가 없으면 다시 필터링해요
        pages = getFilteredCompetencyPages(competencyState.selectedRoles);
        competencyState.filteredPages = pages;
    }
    
    if (!pages || pages.length === 0) {
        console.error('❌ 역량 진단 페이지 정보가 비어있습니다!');
        return;
    }
    
    const currentPageInfo = pages.find(p => p.pageNumber === pageNumber);
    
    if (!currentPageInfo) {
        console.error(`❌ 페이지 ${pageNumber}의 정보를 찾을 수 없습니다!`);
        return;
    }
    
    console.log('✅ 현재 페이지 정보:', currentPageInfo);
    
    // 필터링된 페이지의 질문 인덱스를 사용해서 질문들을 가져와요
    // currentPageInfo.questionIndices는 원본 질문 배열의 인덱스예요
    let questions = [];
    try {
        if (currentPageInfo.questionIndices && currentPageInfo.questionIndices.length > 0) {
            questions = currentPageInfo.questionIndices.map(index => {
                const question = COMPETENCY_QUESTIONS[index];
                if (!question) {
                    console.warn(`⚠️ 질문을 찾을 수 없습니다. 인덱스: ${index}`);
                }
                return question;
            }).filter(q => q !== undefined); // undefined 제거
            console.log('✅ 질문을 가져왔습니다:', questions.length, '개');
        } else {
            console.error('❌ 현재 페이지에 질문 인덱스가 없습니다!');
            return;
        }
    } catch (error) {
        console.error('❌ 질문을 가져오는 중 오류 발생:', error);
        return;
    }
    
    if (questions.length === 0) {
        console.error('❌ 질문을 찾을 수 없습니다!');
        return;
    }
    
    // 역량 영역 정보를 가져와요
    const competencyArea = getCompetencyAreaById(currentPageInfo.competencyId);
    
    // 진행률을 계산해요 (현재 페이지 / 전체 페이지 * 100)
    const progress = (pageNumber / pages.length) * 100;
    
    // 질문 행들을 만들어요 (좌측: 질문, 우측: 라디오 버튼)
    const questionRows = questions.map((question, index) => {
        // 필터링된 페이지에서의 질문 인덱스를 계산해요
        // currentPageInfo.questionIndices는 원본 질문 배열의 인덱스예요
        const originalQuestionIndex = currentPageInfo.questionIndices[index];
        
        // 필터링된 페이지에서의 실제 인덱스를 찾아요
        // 이전 페이지들의 질문 수를 모두 더해서 현재 페이지의 인덱스를 계산해요
        let filteredIndex = 0;
        for (let i = 0; i < pageNumber - 1; i++) {
            filteredIndex += pages[i].questionIndices.length;
        }
        filteredIndex += index;
        
        // 현재 저장된 답변을 가져와요
        const currentAnswer = competencyState.answers[filteredIndex];
        
        // 라디오 버튼 옵션들을 만들어요
        // 5점 척도: 1(전혀 그렇지 않다) ~ 5(매우 그렇다) 순서로 배치
        const radioOptions = [1, 2, 3, 4, 5].map(score => {
            const isSelected = currentAnswer === score;
            const label = getLikertLabel(score);
            return `
                <label class="flex flex-col items-center cursor-pointer group flex-1 min-w-0">
                    <input
                        type="radio"
                        name="competency-question-${question.id}"
                        value="${score}"
                        data-question-id="${question.id}"
                        data-score="${score}"
                        ${isSelected ? 'checked' : ''}
                        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer flex-shrink-0"
                        aria-label="${label}"
                    />
                    <span class="mt-0.5 text-xs text-gray-700 text-center whitespace-nowrap">${score}</span>
                    <span class="mt-0.5 text-xs text-gray-600 text-center leading-tight px-0.5">${label}</span>
                </label>
            `;
        }).join('');
        
        return `
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="py-3 px-4 align-top w-1/2">
                    <div class="flex items-start">
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded mr-2 flex-shrink-0">
                            Q${question.id}
                        </span>
                        <div class="flex-1">
                            <span class="text-xs sm:text-sm text-gray-800 leading-relaxed">
                                ${question.question}
                            </span>
                            ${question.tooltip ? `
                                <button
                                    type="button"
                                    class="ml-2 text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-0.5 inline-flex items-center"
                                    aria-label="용어 설명 보기"
                                    onclick="showTooltip(event, '${question.tooltip.replace(/'/g, "\\'")}')"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </td>
                <td class="py-3 px-4 align-top w-1/2">
                    <div class="flex flex-nowrap justify-between items-start w-full gap-1">
                        ${radioOptions}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    // 이전/다음 버튼을 만들어요
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber >= pages.length;
    
    const navigationButtons = `
        <div class="flex justify-between items-center mt-6">
            <button
                id="prev-competency-page-btn"
                type="button"
                class="
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    bg-gray-500 hover:bg-gray-600 text-white cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                "
            >
                ← 이전
            </button>
            <span class="text-sm text-gray-600">
                ${pageNumber} / ${pages.length}
            </span>
            <button
                id="next-competency-page-btn"
                type="button"
                class="
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    bg-blue-600 hover:bg-blue-700 text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:bg-gray-300 disabled:cursor-not-allowed
                "
            >
                ${isLastPage ? '완료' : '다음 →'}
            </button>
        </div>
    `;
    
    // 전체 HTML을 조합해요
    contentArea.innerHTML = `
        <div class="w-full max-w-6xl mx-auto space-y-4">
            <!-- 페이지 헤더 -->
            <div class="text-center">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-600 mb-1">
                    ${currentPageInfo.competencyName}
                </h3>
                ${competencyArea && competencyArea.description ? `
                    <p class="text-xs sm:text-sm text-gray-500">
                        ${competencyArea.description}
                    </p>
                ` : ''}
            </div>
            
            <!-- 진행률 바 -->
            <div class="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                <div 
                    class="bg-blue-600 h-3 sm:h-4 rounded-full transition-all duration-500"
                    style="width: ${progress}%"
                    role="progressbar"
                    aria-valuenow="${pageNumber}"
                    aria-valuemin="1"
                    aria-valuemax="${pages.length}"
                    aria-label="진행률 ${Math.round(progress)}%"
                ></div>
            </div>
            
            <!-- 질문 테이블 (좌측: 질문, 우측: 라디오 버튼) -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="py-3 px-4 text-left text-xs sm:text-sm font-semibold text-gray-700 w-1/2">
                                설문 문항
                            </th>
                            <th class="py-3 px-4 text-center text-xs sm:text-sm font-semibold text-gray-700 w-1/2">
                                응답 선택 (1: 전혀 그렇지 않다 ~ 5: 매우 그렇다)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${questionRows}
                    </tbody>
                </table>
            </div>
            
            <!-- 네비게이션 버튼 -->
            ${navigationButtons}
        </div>
    `;
    
    // 이벤트 리스너를 연결해요
    setupCompetencyPageListeners(pageNumber);
    
    // 스크롤을 맨 위로 이동해요
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 역량 진단 페이지의 이벤트 리스너를 설정하는 함수예요
 * @param {number} pageNumber - 현재 페이지 번호
 */
function setupCompetencyPageListeners(pageNumber) {
    // 답변을 저장하는 공통 함수예요
    const saveAnswer = function(radioElement) {
        if (!radioElement || !radioElement.checked) {
            return;
        }
        
        const questionId = parseInt(radioElement.getAttribute('data-question-id'));
        const score = parseInt(radioElement.getAttribute('data-score') || radioElement.value);
        
        if (isNaN(questionId) || isNaN(score)) {
            console.error('❌ 질문 ID 또는 점수를 파싱할 수 없습니다:', {
                questionId: radioElement.getAttribute('data-question-id'),
                score: radioElement.getAttribute('data-score') || radioElement.value
            });
            return;
        }
        
        console.log(`📝 역량 질문 ${questionId}에 대한 답변: ${score}점`);
        
        // 답변을 저장해요
        // 현재 페이지의 질문 인덱스를 찾아서 저장해요
        const pages = competencyState.filteredPages;
        const currentPageInfo = pages.find(p => p.pageNumber === pageNumber);
        if (currentPageInfo) {
            // questionIndices 배열에서 질문 ID를 찾아서 그 배열의 인덱스(localIndex)를 찾아요
            let questionLocalIndex = -1;
            for (let i = 0; i < currentPageInfo.questionIndices.length; i++) {
                const originalIndex = currentPageInfo.questionIndices[i];
                const question = COMPETENCY_QUESTIONS[originalIndex];
                if (question && question.id === questionId) {
                    questionLocalIndex = i;
                    break;
                }
            }
            
            if (questionLocalIndex !== -1) {
                // 이전 페이지들의 질문 수를 모두 더해서 실제 인덱스를 계산해요
                let filteredIndex = 0;
                for (let i = 0; i < pageNumber - 1; i++) {
                    filteredIndex += pages[i].questionIndices.length;
                }
                filteredIndex += questionLocalIndex;
                
                // 배열 크기 확인 및 필요시 확장
                if (filteredIndex >= competencyState.answers.length) {
                    console.warn(`⚠️ 답변 배열 크기 부족. 현재: ${competencyState.answers.length}, 필요: ${filteredIndex + 1}`);
                    // 배열을 확장해요
                    while (competencyState.answers.length <= filteredIndex) {
                        competencyState.answers.push(null);
                    }
                }
                
                console.log(`💾 답변 저장: 질문 ID ${questionId}, 로컬 인덱스 ${questionLocalIndex}, 필터링된 인덱스 ${filteredIndex}, 점수 ${score}`);
                competencyState.answers[filteredIndex] = score;
                saveCompetencyState();
                
                // 저장 후 확인
                console.log(`✅ 저장 확인: competencyState.answers[${filteredIndex}] = ${competencyState.answers[filteredIndex]}`);
            } else {
                console.error(`❌ 질문 ID ${questionId}를 현재 페이지에서 찾을 수 없습니다.`);
                console.error('현재 페이지 정보:', currentPageInfo);
                console.error('questionIndices:', currentPageInfo.questionIndices);
            }
        }
    };
    
    // 전역 이벤트 리스너를 한 번만 등록해요 (중복 방지)
    // 이렇게 하면 페이지가 바뀌어도 이벤트 리스너가 계속 작동해요
    if (!competencyRadioListenersAttached) {
        console.log('🔗 역량 진단 라디오 버튼 전역 이벤트 리스너를 등록합니다.');
        
        const contentArea = document.getElementById('app-content');
        if (contentArea) {
            // change 이벤트 핸들러
            const handleRadioChange = function(event) {
                // label을 클릭한 경우 실제 input을 찾아요
                let target = event.target;
                if (target.tagName === 'LABEL') {
                    const input = target.querySelector('input[type="radio"]');
                    if (input) {
                        target = input;
                    }
                }
                
                // 라디오 버튼이 아니면 무시해요
                if (!target || target.type !== 'radio' || !target.hasAttribute('data-question-id')) {
                    return;
                }
                
                console.log('🖱️ 라디오 버튼 change 이벤트 발생:', {
                    questionId: target.getAttribute('data-question-id'),
                    score: target.getAttribute('data-score') || target.value,
                    checked: target.checked
                });
                
                // 현재 페이지 번호를 가져와서 saveAnswer 함수에 전달해요
                const currentPage = competencyState.currentPage;
                if (currentPage) {
                    // saveAnswer 함수를 호출하기 위해 현재 페이지 정보를 전달해요
                    // saveAnswer는 클로저로 pageNumber를 참조하므로, 동적으로 찾아야 해요
                    const questionId = parseInt(target.getAttribute('data-question-id'));
                    const score = parseInt(target.getAttribute('data-score') || target.value);
                    
                    if (!isNaN(questionId) && !isNaN(score) && target.checked) {
                        // 직접 답변을 저장해요
                        const pages = competencyState.filteredPages;
                        const currentPageInfo = pages.find(p => p.pageNumber === currentPage);
                        if (currentPageInfo) {
                            let questionLocalIndex = -1;
                            for (let i = 0; i < currentPageInfo.questionIndices.length; i++) {
                                const originalIndex = currentPageInfo.questionIndices[i];
                                const question = COMPETENCY_QUESTIONS[originalIndex];
                                if (question && question.id === questionId) {
                                    questionLocalIndex = i;
                                    break;
                                }
                            }
                            
                            if (questionLocalIndex !== -1) {
                                let filteredIndex = 0;
                                for (let i = 0; i < currentPage - 1; i++) {
                                    filteredIndex += pages[i].questionIndices.length;
                                }
                                filteredIndex += questionLocalIndex;
                                
                                if (filteredIndex >= competencyState.answers.length) {
                                    while (competencyState.answers.length <= filteredIndex) {
                                        competencyState.answers.push(null);
                                    }
                                }
                                
                                console.log(`💾 답변 저장: 질문 ID ${questionId}, 필터링된 인덱스 ${filteredIndex}, 점수 ${score}`);
                                competencyState.answers[filteredIndex] = score;
                                saveCompetencyState();
                                console.log(`✅ 저장 확인: competencyState.answers[${filteredIndex}] = ${competencyState.answers[filteredIndex]}`);
                            }
                        }
                    }
                }
            };
            
            // click 이벤트 핸들러
            const handleRadioClick = function(event) {
                // label을 클릭한 경우 실제 input을 찾아요
                let target = event.target;
                if (target.tagName === 'LABEL') {
                    const input = target.querySelector('input[type="radio"]');
                    if (input) {
                        target = input;
                    }
                }
                
                // 라디오 버튼이 아니면 무시해요
                if (!target || target.type !== 'radio' || !target.hasAttribute('data-question-id')) {
                    return;
                }
                
                console.log('🖱️ 라디오 버튼 click 이벤트 발생:', {
                    questionId: target.getAttribute('data-question-id'),
                    score: target.getAttribute('data-score') || target.value,
                    checked: target.checked
                });
                
                // 약간의 지연 후 저장 (change 이벤트가 먼저 처리되도록)
                setTimeout(() => {
                    if (target.checked) {
                        console.log('💾 click 이벤트에서 답변 저장 시도');
                        // change 이벤트 핸들러와 동일한 로직을 실행해요
                        handleRadioChange({ target: target });
                    }
                }, 150);
            };
            
            // 이벤트 리스너 등록 (capture phase에서도 처리)
            contentArea.addEventListener('change', handleRadioChange, true);
            contentArea.addEventListener('click', handleRadioClick, true);
            
            competencyRadioListenersAttached = true;
            console.log('✅ 전역 이벤트 리스너 등록 완료');
        }
    }
    
    // 직접 연결 방식도 추가 (이중 보안)
    // 약간의 지연을 두고 라디오 버튼을 찾아서 이벤트를 연결해요
    setTimeout(() => {
        const radios = document.querySelectorAll('input[type="radio"][data-question-id]');
        console.log(`🔗 라디오 버튼 ${radios.length}개에 직접 이벤트 리스너 연결`);
        
        radios.forEach(radio => {
            // 이미 이벤트 리스너가 연결되어 있는지 확인하기 위해
            // 한 번만 연결하도록 해요 (once 옵션 사용)
            const handleDirectChange = function() {
                console.log('🖱️ 직접 연결된 change 이벤트 발생:', {
                    questionId: this.getAttribute('data-question-id'),
                    score: this.getAttribute('data-score') || this.value,
                    checked: this.checked
                });
                
                if (this.checked) {
                    const questionId = parseInt(this.getAttribute('data-question-id'));
                    const score = parseInt(this.getAttribute('data-score') || this.value);
                    const currentPage = competencyState.currentPage;
                    
                    if (!isNaN(questionId) && !isNaN(score) && currentPage) {
                        const pages = competencyState.filteredPages;
                        const currentPageInfo = pages.find(p => p.pageNumber === currentPage);
                        if (currentPageInfo) {
                            let questionLocalIndex = -1;
                            for (let i = 0; i < currentPageInfo.questionIndices.length; i++) {
                                const originalIndex = currentPageInfo.questionIndices[i];
                                const question = COMPETENCY_QUESTIONS[originalIndex];
                                if (question && question.id === questionId) {
                                    questionLocalIndex = i;
                                    break;
                                }
                            }
                            
                            if (questionLocalIndex !== -1) {
                                let filteredIndex = 0;
                                for (let i = 0; i < currentPage - 1; i++) {
                                    filteredIndex += pages[i].questionIndices.length;
                                }
                                filteredIndex += questionLocalIndex;
                                
                                if (filteredIndex >= competencyState.answers.length) {
                                    while (competencyState.answers.length <= filteredIndex) {
                                        competencyState.answers.push(null);
                                    }
                                }
                                
                                console.log(`💾 직접 연결: 답변 저장 - 질문 ID ${questionId}, 필터링된 인덱스 ${filteredIndex}, 점수 ${score}`);
                                competencyState.answers[filteredIndex] = score;
                                saveCompetencyState();
                            }
                        }
                    }
                }
            };
            
            radio.addEventListener('change', handleDirectChange, { once: false });
            
            radio.addEventListener('click', function() {
                setTimeout(() => {
                    if (this.checked) {
                        handleDirectChange.call(this);
                    }
                }, 150);
            }, { once: false });
        });
    }, 200);
    
    // 이전 페이지 버튼 - 전역 이벤트 위임을 사용하므로 여기서는 버튼 상태만 업데이트해요
    // 첫 번째 페이지에서도 활성화하여 역할 선택 화면으로 돌아갈 수 있도록 해요
    const prevBtn = document.getElementById('prev-competency-page-btn');
    if (prevBtn) {
        // 항상 활성화 상태로 유지해요
        prevBtn.disabled = false;
        prevBtn.classList.remove('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
        prevBtn.classList.add('bg-gray-500', 'hover:bg-gray-600', 'text-white', 'cursor-pointer');
    }
    
    // 다음 페이지 버튼 - 전역 이벤트 위임을 사용하므로 여기서는 이벤트 리스너를 추가하지 않아요
    // 버튼은 이미 전역 이벤트 위임으로 처리되고 있어요
}

/**
 * 역량 진단 상태를 localStorage에 저장하는 함수예요
 */
function saveCompetencyState() {
    try {
        localStorage.setItem('competencyState', JSON.stringify(competencyState));
    } catch (error) {
        console.error('❌ 역량 진단 상태 저장 실패:', error);
    }
}

/**
 * localStorage에서 역량 진단 상태를 불러오는 함수예요
 */
function loadCompetencyState() {
    try {
        const saved = localStorage.getItem('competencyState');
        if (saved) {
            competencyState = JSON.parse(saved);
            return true;
        }
    } catch (error) {
        console.error('❌ 역량 진단 상태 불러오기 실패:', error);
    }
    return false;
}

/**
 * 역량 진단을 완료하는 함수예요
 * 모든 답변을 확인하고 역량 점수를 계산해요
 */
function completeCompetencyDiagnosis() {
    console.log('✅ 역량 진단이 완료되었습니다!');
    
    // 모든 답변이 입력되었는지 확인해요
    const allAnswered = competencyState.answers.every(answer => answer !== null);
    
    if (!allAnswered) {
        alert('모든 질문에 답변해주세요.');
        return;
    }
    
    // 역량 진단 완료 상태로 변경해요
    competencyState.isCompleted = true;
    saveCompetencyState();
    
    // 각 역량별 점수를 계산해요 (각 역량당 5문항의 평균)
    const competencyScores = calculateCompetencyScores(competencyState.answers, competencyState.filteredPages);
    
    // 결과를 localStorage에 저장해요
    localStorage.setItem('competencyScores', JSON.stringify(competencyScores));
    localStorage.setItem('competencyAnswers', JSON.stringify(competencyState.answers));
    
    console.log('역량 점수 결과:', competencyScores);
    
    // 선택된 역할들을 가져와요 (복수 선택 가능)
    const selectedRoles = competencyState.selectedRoles || [];
    if (selectedRoles.length === 0) {
        // 선택된 역할이 없으면 localStorage에서 가져와요
        const savedRoles = localStorage.getItem('selectedRoles');
        if (savedRoles) {
            try {
                selectedRoles.push(...JSON.parse(savedRoles));
            } catch (error) {
                console.error('❌ 선택된 역할을 불러오는 중 오류 발생:', error);
            }
        }
    }
    
    // 격차 분석 및 교육 추천을 수행해요
    // 여러 역할이 선택된 경우, 각 역할에 대해 격차를 분석하고 가장 큰 격차를 가진 역량을 우선 추천해요
    const gapAnalysisResults = [];
    
    for (const role of selectedRoles) {
        // 역할별 필요 역량 수준을 가져와요
        const roleMatrix = getRoleCompetencyMatrix()[role];
        if (roleMatrix) {
            const gapResult = analyzeGapAndRecommend(competencyScores, roleMatrix, [role]);
            gapAnalysisResults.push({
                role: role,
                ...gapResult
            });
        }
    }
    
    // Airtable에 역량 진단 결과 저장하기 (비동기로 실행, 실패해도 계속 진행)
    // 설문 결과 레코드 ID가 있으면 같은 레코드를 업데이트하고, 없으면 새로 생성해요
    const surveyRecordId = localStorage.getItem('surveyRecordId');
    saveCompetencyResultToAirtable({
        employeeId: '', // 나중에 사번 입력 기능을 추가할 수 있어요
        selectedRoles: selectedRoles,
        competencyScores: competencyScores,
        gapAnalysisResults: gapAnalysisResults
    }, surveyRecordId).then(result => {
        console.log('✅ Airtable 역량 진단 결과 저장 성공:', result);
    }).catch(error => {
        console.warn('⚠️ Airtable 역량 진단 결과 저장 실패 (계속 진행):', error);
        // Airtable 저장이 실패해도 사용자 경험에는 영향을 주지 않아요
    });
    
    // 결과 페이지를 표시해요
    renderCompetencyResultPage(competencyScores, gapAnalysisResults, selectedRoles);
}

/**
 * 역량별 점수를 계산하는 함수예요
 * 각 역량당 5문항의 평균을 계산해요
 * 필터링된 페이지 정보를 사용하여 역량별 점수를 계산해요
 * 
 * @param {Array<number>} answers - 필터링된 질문에 대한 답변 배열
 * @param {Array<Object>} filteredPages - 필터링된 페이지 배열
 * @returns {Object} 역량별 점수 객체
 */
function calculateCompetencyScores(answers, filteredPages) {
    const avg = (arr) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    
    const scores = {};
    let answerIndex = 0;
    
    // 각 페이지(역량)별로 점수를 계산해요
    filteredPages.forEach(page => {
        const pageAnswers = [];
        for (let i = 0; i < page.questionIndices.length; i++) {
            if (answerIndex < answers.length && answers[answerIndex] !== null) {
                pageAnswers.push(answers[answerIndex]);
            }
            answerIndex++;
        }
        scores[page.competencyName] = avg(pageAnswers);
    });
    
    return scores;
}

/**
 * 툴팁을 표시하는 함수예요
 * @param {Event} event - 클릭 이벤트
 * @param {string} tooltipText - 툴팁 텍스트
 */
function showTooltip(event, tooltipText) {
    event.preventDefault();
    event.stopPropagation();
    
    // 간단한 alert로 툴팁을 표시해요
    // 나중에 더 예쁜 툴팁 UI로 개선할 수 있어요
    alert(tooltipText);
}

// ============================================
// 격차 분석 및 교육 추천 함수
// ============================================

/**
 * 사용자의 진단 역량 점수와 역할별 필요 수준을 비교하여 격차를 분석하고 교육을 추천하는 함수예요
 * 
 * @param {Object} competencyResult - 사용자의 진단 역량 점수 객체
 *   예: { "AI 개념 이해": 2, "데이터 활용 및 시각화": 3, ... }
 * @param {Object} roleMatrix - 역할별 필요 역량 수준 객체
 *   예: { "AI 개념 이해": 4, "데이터 활용 및 시각화": 4, ... }
 * @param {Array<string>} roles - 대상 역할 배열
 * @returns {Object} 격차 분석 및 추천 결과 객체
 */
function analyzeGapAndRecommend(competencyResult, roleMatrix, roles) {
    console.log('📊 격차 분석을 시작합니다.');
    console.log('사용자 역량 점수:', competencyResult);
    console.log('필요 역량 수준:', roleMatrix);
    console.log('대상 역할:', roles);
    
    // 부족한 역량 목록과 격차 수준을 계산해요
    const insufficientCompetencies = [];
    const gapLevels = {};
    
    // 모든 역량에 대해 격차를 계산해요
    for (const competencyName in roleMatrix) {
        const requiredLevel = roleMatrix[competencyName];
        const currentLevel = competencyResult[competencyName] || 0;
        const gap = currentLevel - requiredLevel;
        
        // 격차가 음수면 부족한 역량이에요
        if (gap < 0) {
            insufficientCompetencies.push(competencyName);
            gapLevels[competencyName] = gap;
        }
    }
    
    console.log('부족한 역량:', insufficientCompetencies);
    console.log('격차 수준:', gapLevels);
    
    // 격차가 큰 역량부터 정렬해요 (격차가 클수록 우선순위가 높아요)
    const sortedGaps = Object.entries(gapLevels)
        .sort((a, b) => a[1] - b[1]) // 격차가 작은 값(더 부족한 것)부터 정렬
        .map(([competencyName, gap]) => competencyName);
    
    console.log('격차 순서 (큰 것부터):', sortedGaps);
    
    // 부족한 역량에 대해 교육 과정을 추천해요
    const recommendedCourses = [];
    const maxCoursesPerCompetency = 1; // 역량당 최대 1개 과정 추천
    const maxTotalCourses = 3; // 전체 최대 3개 과정 추천
    
    for (const competencyName of sortedGaps) {
        if (recommendedCourses.length >= maxTotalCourses) {
            break;
        }
        
        // 해당 역량에 대한 교육 과정을 조회해요
        const courses = getEducationCourses(competencyName, roles, maxCoursesPerCompetency);
        
        // 교육 과정을 추천 목록에 추가해요
        for (const course of courses) {
            if (recommendedCourses.length >= maxTotalCourses) {
                break;
            }
            
            recommendedCourses.push({
                과정명: course.courseName,
                대상역량: course.targetCompetency,
                방식: course.method,
                소요시간: course.duration,
                난이도: course.difficulty,
                신청링크: course.link,
                설명: course.description
            });
        }
    }
    
    console.log('추천 교육 과정:', recommendedCourses);
    
    return {
        부족역량목록: insufficientCompetencies,
        격차수준: gapLevels,
        추천학습과정: recommendedCourses
    };
}

/**
 * 역량 진단 결과 페이지를 표시하는 함수예요
 * 격차 분석 결과와 추천 교육 과정을 카드 형태로 보여줘요
 * 
 * @param {Object} competencyScores - 역량별 점수 객체
 * @param {Array<Object>} gapAnalysisResults - 격차 분석 결과 배열 (역할별)
 * @param {Array<string>} selectedRoles - 선택된 역할 배열
 */
function renderCompetencyResultPage(competencyScores, gapAnalysisResults, selectedRoles) {
    console.log('📊 역량 진단 결과 페이지를 렌더링합니다.');
    
    const contentArea = document.getElementById('app-content');
    if (!contentArea) {
        console.error('❌ app-content 영역을 찾을 수 없습니다.');
        return;
    }
    
    // 모든 격차 분석 결과를 통합해요
    const allInsufficientCompetencies = new Set();
    const allGapLevels = {};
    const allRecommendedCourses = [];
    
    // 역량별 설문문항 수를 계산해요 (filteredPages를 사용)
    const competencyQuestionCounts = {};
    if (competencyState && competencyState.filteredPages) {
        competencyState.filteredPages.forEach(page => {
            competencyQuestionCounts[page.competencyName] = page.questionIndices.length;
        });
    }
    
    for (const result of gapAnalysisResults) {
        // 부족한 역량 목록 통합
        result.부족역량목록.forEach(comp => allInsufficientCompetencies.add(comp));
        
        // 격차 수준 통합 (가장 큰 격차를 유지해요)
        for (const [comp, gap] of Object.entries(result.격차수준)) {
            if (!allGapLevels[comp] || gap < allGapLevels[comp]) {
                allGapLevels[comp] = gap;
            }
        }
        
        // 추천 교육 과정 통합 (중복 제거)
        for (const course of result.추천학습과정) {
            if (!allRecommendedCourses.find(c => c.과정명 === course.과정명)) {
                allRecommendedCourses.push(course);
            }
        }
    }
    
    // 추천 교육 과정을 우선순위에 따라 정렬해요
    // 우선순위: 설문문항수가 많고, Gap 점수가 낮은(더 부족한) 역량 순서
    const sortedRecommendedCourses = allRecommendedCourses.sort((a, b) => {
        const aQuestionCount = competencyQuestionCounts[a.대상역량] || 0;
        const bQuestionCount = competencyQuestionCounts[b.대상역량] || 0;
        const aGap = allGapLevels[a.대상역량] || 0;
        const bGap = allGapLevels[b.대상역량] || 0;
        
        // 설문문항수가 많은 순서로 정렬
        if (aQuestionCount !== bQuestionCount) {
            return bQuestionCount - aQuestionCount;
        }
        
        // 설문문항수가 같으면 Gap 점수가 낮은(더 부족한) 순서로 정렬
        return aGap - bGap;
    });
    
    // 추천 교육 과정을 최대 3개로 제한해요
    const finalRecommendedCourses = sortedRecommendedCourses.slice(0, 3);
    
    // 모든 역량의 Gap 점수 평균 계산
    const allGapScores = [];
    Object.entries(competencyScores).forEach(([name, score]) => {
        const targetScore = 5.0;
        const gapScore = score - targetScore;
        allGapScores.push(gapScore);
    });
    const averageGapScore = allGapScores.reduce((sum, gap) => sum + gap, 0) / allGapScores.length;
    
    // 역량 점수와 Gap 점수를 통합하여 표시하기 위한 HTML을 만들어요
    const competencyBars = Object.entries(competencyScores).map(([name, score]) => {
        const percentage = (score / 5) * 100;
        const targetScore = 5.0;
        const gapScore = score - targetScore;
        
        // 설문문항 수 가져오기
        const questionCount = competencyQuestionCounts[name] || 0;
        
        // 설문문항이 3개 이상이면 bold 표시
        const nameClass = questionCount >= 3 ? 'text-sm font-bold text-gray-700' : 'text-sm font-medium text-gray-700';
        
        // 설문문항이 3개 이상인 역량의 Gap 점수가 -1.5 이하이면 자주색으로 표시
        const gapColorClass = (questionCount >= 3 && gapScore <= -1.5) ? 'text-purple-600' : 'text-gray-700';
        
        return `
            <div class="mb-4">
                <div class="flex justify-between items-center mb-1">
                    <span class="${nameClass}">${name} (${questionCount})</span>
                    <div class="flex items-center gap-3">
                        <div class="flex-1 bg-gray-200 rounded-full h-4">
                            <div class="bg-blue-600 h-4 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
                        </div>
                        <span class="text-sm font-bold text-gray-800">${score.toFixed(1)} / 5.0</span>
                        <span class="text-sm font-bold ${gapColorClass}">${gapScore.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // 추천 교육 과정 카드를 만들어요
    // 요청사항: 좌측(과정명+난이도), 중간(과정소개+태그), 우측(교육신청 버튼)
    const courseCards = finalRecommendedCourses.length > 0
        ? finalRecommendedCourses.map(course => {
            // 전체 5개의 별을 표시하고, 난이도 수준만큼만 채워진 별로 표시해요
            // 예: 난이도 1이면 ⭐☆☆☆☆, 난이도 3이면 ⭐⭐⭐☆☆
            const filledStars = '⭐'.repeat(course.난이도);
            const emptyStars = '☆'.repeat(5 - course.난이도);
            const difficultyStars = filledStars + emptyStars;
            return `
                <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex items-center gap-6">
                    <!-- 좌측: 과정명과 난이도 -->
                    <div class="flex-shrink-0 w-48">
                        <h4 class="text-lg font-bold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">${course.과정명}</h4>
                        <div class="text-xs text-gray-500">난이도: ${difficultyStars}</div>
                    </div>
                    
                    <!-- 중간: 과정소개와 태그들 -->
                    <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-600 mb-3">${course.설명}</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${course.대상역량}</span>
                            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">${course.방식}</span>
                            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">${course.소요시간}</span>
                        </div>
                    </div>
                    
                    <!-- 우측: 교육신청 버튼 -->
                    <div class="flex-shrink-0">
                        <a 
                            href="${course.신청링크}" 
                            target="_blank"
                            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap"
                        >
                            교육신청
                        </a>
                    </div>
                </div>
            `;
        }).join('')
        : '<div class="text-center text-gray-500 py-8">추천 교육 과정이 없습니다.</div>';
    
    // 선택된 역할을 표시해요
    const rolesDisplay = selectedRoles.length > 0
        ? selectedRoles.map(role => `<span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2">${role}</span>`).join('')
        : '<span class="text-gray-500">선택된 역할이 없습니다.</span>';
    
    // 전체 HTML을 조합해요
    contentArea.innerHTML = `
        <div class="w-full max-w-6xl mx-auto space-y-6">
            <!-- 페이지 헤더 -->
            <div class="text-center">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    역량 진단 결과
                </h2>
                <p class="text-gray-600">
                    선택한 역할: ${rolesDisplay}
                </p>
            </div>
            
            <!-- 역량 점수 시각화 카드 (통합) -->
            <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">역량별 점수 및 Gap</h3>
                <div class="space-y-4">
                    ${competencyBars}
                </div>
                <div class="mt-4 text-sm text-gray-500 text-center">
                    전체 역량 Gap 점수 평균: ${averageGapScore.toFixed(2)} (설문문항이 3개 이상이고 Gap 점수가 -1.5 이하인 역량은 자주색으로 표시)
                </div>
            </div>
            
            <!-- 추천 교육 과정 카드 -->
            <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 class="text-xl font-bold text-gray-800 mb-4">추천 교육 과정</h3>
                ${finalRecommendedCourses.length > 0 
                    ? '<p class="text-sm text-gray-600 mb-4">격차가 큰 역량을 보완하기 위한 교육 과정을 추천합니다.</p>'
                    : '<p class="text-sm text-gray-600 mb-4">현재 모든 역량이 요구 수준을 충족하고 있습니다.</p>'
                }
                <div class="flex flex-col gap-4">
                    ${courseCards}
                </div>
            </div>
            
            <!-- 다시 진단하기 버튼 -->
            <div class="flex justify-center pt-4">
                <button
                    id="restart-diagnosis-btn"
                    type="button"
                    class="
                        bg-gray-500 hover:bg-gray-600
                        text-white font-bold
                        py-3 px-6
                        rounded-lg shadow-md hover:shadow-lg
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                    "
                >
                    다시 진단하기
                </button>
            </div>
        </div>
    `;
    
    // 다시 진단하기 버튼 이벤트 리스너를 연결해요
    const restartBtn = document.getElementById('restart-diagnosis-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // localStorage를 초기화하고 처음부터 시작해요
            localStorage.removeItem('competencyState');
            localStorage.removeItem('competencyScores');
            localStorage.removeItem('competencyAnswers');
            localStorage.removeItem('selectedRoles');
            localStorage.removeItem('roleResult');
            localStorage.removeItem('surveyState');
            localStorage.removeItem('surveyAnswers');
            
            // 페이지를 새로고침해요
            window.location.reload();
        });
    }
    
    // 스크롤을 맨 위로 이동해요
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// 평가 관련 함수
// ============================================
/**
 * 역량 평가를 시작하는 함수예요
 * 사용자가 "역량 평가 시작하기" 버튼을 클릭하면 실행돼요
 */
function startAssessment() {
    console.log('📊 역량 평가가 시작되었습니다!');
    
    const contentArea = document.getElementById('app-content');
    
    if (!contentArea) {
        return;
    }
    
    // 임시로 평가 화면을 표시해요
    contentArea.innerHTML = `
        <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                역량 평가
            </h2>
            <p class="text-gray-600">
                역량 평가 화면이 여기에 표시될 예정이에요.
            </p>
            <p class="text-sm text-gray-500 mt-4">
                ⚠️ 아직 구현 중입니다. Airtable에서 역량 정보를 가져와서 평가할 예정이에요.
            </p>
        </div>
    `;
}

// ============================================
// 유틸리티 함수
// ============================================
/**
 * 에러 메시지를 화면에 표시하는 함수예요
 * @param {string} message - 표시할 에러 메시지
 */
function showErrorMessage(message) {
    const contentArea = document.getElementById('app-content');
    
    if (!contentArea) {
        console.error(message);
        return;
    }
    
    // 에러 메시지를 빨간색 박스로 표시해요
    contentArea.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong class="font-bold">오류 발생!</strong>
            <span class="block sm:inline">${message}</span>
        </div>
    `;
}

/**
 * 성공 메시지를 화면에 표시하는 함수예요
 * @param {string} message - 표시할 성공 메시지
 */
function showSuccessMessage(message) {
    const contentArea = document.getElementById('app-content');
    
    if (!contentArea) {
        console.log('✅', message);
        return;
    }
    
    // 성공 메시지를 초록색 박스로 표시해요
    contentArea.innerHTML = `
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong class="font-bold">성공!</strong>
            <span class="block sm:inline">${message}</span>
        </div>
    `;
}

// ============================================
// 애플리케이션 시작
// ============================================
/**
 * 페이지가 로드되면 자동으로 애플리케이션을 시작해요
 * DOMContentLoaded 이벤트는 HTML이 모두 읽혀졌을 때 발생해요
 */
if (document.readyState === 'loading') {
    // HTML이 아직 로딩 중이면 이벤트 리스너를 등록해요
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // HTML이 이미 로드되었으면 바로 실행해요
    initializeApp();
}

