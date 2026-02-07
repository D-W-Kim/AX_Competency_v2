/**
 * 관리자 대시보드 JavaScript 파일 (admin.js)
 * 
 * 이 파일은 관리자 대시보드의 모든 동작을 제어하는 파일이에요.
 * HR이나 혁신 리더들이 AX 진단 결과를 모니터링할 수 있도록 도와주는 기능들이 들어있어요!
 * 
 * 주요 기능:
 * 1. 관리자 인증 (비밀번호 확인)
 * 2. Airtable API에서 진단 결과 데이터 가져오기
 * 3. 통계 계산 및 표시
 * 4. Chart.js를 사용한 차트 생성
 * 5. 사용자 목록 테이블 표시
 * 6. 검색, 필터, 정렬, 페이지네이션 기능
 * 7. CSV 다운로드 기능
 */

// ============================================
// 전역 변수 선언
// ============================================
/**
 * 전역 변수는 프로그램 전체에서 사용할 수 있는 변수예요.
 * 마치 집 안에서 어디서든 사용할 수 있는 공용 물건 같은 거예요!
 */

// 관리자 비밀번호 (실제 환경에서는 서버에서 관리하거나 환경 변수로 관리해야 해요)
// ⚠️ 보안 주의: 실제 배포 시에는 이 값을 서버에서 관리하거나 더 안전한 인증 방식을 사용해야 해요!
const ADMIN_PASSWORD = 'admin123'; // 기본 비밀번호 (실제 사용 시 변경 필요)

// 현재 로드된 사용자 데이터를 저장하는 변수예요
let userData = [];

// 필터링된 사용자 데이터를 저장하는 변수예요
let filteredUserData = [];

// 현재 정렬 설정을 저장하는 변수예요
let currentSort = {
    column: null,      // 정렬할 컬럼 이름
    direction: 'asc'   // 정렬 방향 ('asc': 오름차순, 'desc': 내림차순)
};

// 현재 페이지 번호를 저장하는 변수예요
let currentPage = 1;

// 페이지당 표시할 항목 수예요
const ITEMS_PER_PAGE = 20;

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
function initializeAdmin() {
    console.log('🚀 관리자 대시보드가 시작되었습니다!');
    
    // 인증 화면을 보여줘요
    showAuthScreen();
    
    // 이벤트 리스너를 등록해요
    setupEventListeners();
}

/**
 * 이벤트 리스너를 설정하는 함수예요
 * 이벤트 리스너는 사용자의 행동(클릭, 입력 등)을 감지해서 
 * 적절한 함수를 실행하게 해주는 도구예요
 */
function setupEventListeners() {
    console.log('🔗 이벤트 리스너를 설정합니다...');
    
    // 인증 폼 제출 이벤트
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
    
    // 새로고침 버튼 클릭 이벤트
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadDashboardData);
    }
    
    // CSV 다운로드 버튼 클릭 이벤트
    const csvDownloadBtn = document.getElementById('csv-download-btn');
    if (csvDownloadBtn) {
        csvDownloadBtn.addEventListener('click', downloadCSV);
    }
    
    // 검색 및 필터 이벤트
    const searchEmployeeId = document.getElementById('search-employee-id');
    if (searchEmployeeId) {
        searchEmployeeId.addEventListener('input', handleFilterChange);
    }
    
    const filterRole = document.getElementById('filter-role');
    if (filterRole) {
        filterRole.addEventListener('change', handleFilterChange);
    }
    
    const filterStartDate = document.getElementById('filter-start-date');
    if (filterStartDate) {
        filterStartDate.addEventListener('change', handleFilterChange);
    }
    
    const filterEndDate = document.getElementById('filter-end-date');
    if (filterEndDate) {
        filterEndDate.addEventListener('change', handleFilterChange);
    }
    
    // 테이블 헤더 클릭 이벤트 (정렬 기능)
    const tableHeaders = document.querySelectorAll('th[data-sort]');
    tableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            handleSort(column);
        });
    });
    
    console.log('✅ 이벤트 리스너 설정이 완료되었습니다.');
}

// ============================================
// 인증 관련 함수
// ============================================
/**
 * 인증 화면을 표시하는 함수예요
 */
function showAuthScreen() {
    const authScreen = document.getElementById('auth-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    if (authScreen) {
        authScreen.classList.remove('hidden');
    }
    
    if (dashboardScreen) {
        dashboardScreen.classList.add('hidden');
        dashboardScreen.classList.remove('opacity-100');
        dashboardScreen.classList.add('opacity-0');
    }
}

/**
 * 인증 폼 제출을 처리하는 함수예요
 * @param {Event} event - 폼 제출 이벤트
 */
function handleAuthSubmit(event) {
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    
    const passwordInput = document.getElementById('admin-password');
    const errorMessage = document.getElementById('auth-error');
    
    if (!passwordInput || !errorMessage) {
        console.error('❌ 인증 요소를 찾을 수 없습니다!');
        return;
    }
    
    const enteredPassword = passwordInput.value;
    
    // 비밀번호 확인
    if (enteredPassword === ADMIN_PASSWORD) {
        // 인증 성공
        console.log('✅ 인증 성공!');
        
        // 에러 메시지 숨기기
        errorMessage.classList.add('hidden');
        
        // 인증 화면 숨기기
        const authScreen = document.getElementById('auth-screen');
        if (authScreen) {
            authScreen.classList.add('hidden');
        }
        
        // 대시보드 화면 표시
        showDashboardScreen();
        
        // 대시보드 데이터 로드
        loadDashboardData();
    } else {
        // 인증 실패
        console.log('❌ 인증 실패: 비밀번호가 올바르지 않습니다.');
        
        // 에러 메시지 표시
        errorMessage.classList.remove('hidden');
        
        // 비밀번호 입력 필드 초기화
        passwordInput.value = '';
        passwordInput.focus();
    }
}

/**
 * 대시보드 화면을 표시하는 함수예요
 */
function showDashboardScreen() {
    const dashboardScreen = document.getElementById('dashboard-screen');
    
    if (dashboardScreen) {
        dashboardScreen.classList.remove('hidden');
        
        // 페이드 인 애니메이션
        setTimeout(() => {
            dashboardScreen.classList.remove('opacity-0');
            dashboardScreen.classList.add('opacity-100');
        }, 50);
    }
}

// ============================================
// 데이터 로드 함수
// ============================================
/**
 * 대시보드 데이터를 로드하는 함수예요
 * Airtable API에서 진단 결과를 가져와서 화면에 표시해요
 */
async function loadDashboardData() {
    console.log('📊 대시보드 데이터를 로드합니다...');
    
    try {
        // 현재는 Airtable API를 사용하지 않고 mock 데이터를 사용해요
        // 실제 환경에서는 Airtable API를 호출해야 해요
        const data = await fetchUserData();
        
        // 데이터 저장
        userData = data;
        filteredUserData = [...data];
        
        // 통계 업데이트
        updateStatistics();
        
        // 차트 업데이트
        updateCharts();
        
        // 테이블 업데이트
        updateTable();
        
        console.log('✅ 대시보드 데이터 로드 완료!');
    } catch (error) {
        console.error('❌ 대시보드 데이터 로드 실패:', error);
        showErrorMessage('데이터를 불러오는 데 문제가 발생했습니다. 다시 시도해주세요.');
    }
}

/**
 * 사용자 데이터를 가져오는 함수예요
 * Airtable API에서 실제 진단 결과를 가져와요
 * @returns {Promise<Array>} 사용자 데이터 배열
 */
async function fetchUserData() {
    // Airtable 설정이 올바른지 확인해요
    if (!validateConfig(true)) {
        console.warn('⚠️ Airtable 설정이 올바르지 않습니다. config.js를 확인해주세요.');
        console.warn('⚠️ Mock 데이터를 사용합니다.');
        return [];
    }
    
    try {
        // Airtable에서 모든 진단 결과를 가져와요
        const data = await fetchAllAssessmentResultsFromAirtable();
        return data;
    } catch (error) {
        console.error('❌ Airtable에서 데이터를 가져오는 중 오류 발생:', error);
        console.warn('⚠️ Mock 데이터를 사용합니다.');
        // 에러가 발생해도 빈 배열을 반환해서 대시보드가 작동하도록 해요
        return [];
    }
}

// ============================================
// 통계 업데이트 함수
// ============================================
/**
 * 통계 카드를 업데이트하는 함수예요
 * 총 참여자, 평균 점수, 오늘 완료 인원, 역할 종류 등을 계산해서 표시해요
 */
function updateStatistics() {
    console.log('📊 통계를 업데이트합니다...');
    
    // 총 참여 인원 수
    const totalParticipants = userData.length;
    updateStatCard('stat-total-participants', totalParticipants.toLocaleString());
    
    // 평균 점수 계산
    if (userData.length > 0) {
        const allScores = [];
        userData.forEach(user => {
            if (user.genAIScore) allScores.push(user.genAIScore);
            if (user.fieldScore) allScores.push(user.fieldScore);
            if (user.strategyScore) allScores.push(user.strategyScore);
            if (user.expertScore) allScores.push(user.expertScore);
        });
        
        const averageScore = allScores.length > 0
            ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1)
            : '0.0';
        updateStatCard('stat-average-score', averageScore);
    } else {
        updateStatCard('stat-average-score', '0.0');
    }
    
    // 오늘 완료 인원 수 계산
    const today = new Date().toISOString().split('T')[0];
    const todayCompleted = userData.filter(user => {
        if (!user.diagnosisDate) return false;
        const userDate = new Date(user.diagnosisDate).toISOString().split('T')[0];
        return userDate === today;
    }).length;
    updateStatCard('stat-today-completed', todayCompleted.toLocaleString());
    
    // 역할 종류 수 계산
    const uniqueRoles = new Set(userData.map(user => user.finalRole || user.role).filter(Boolean));
    updateStatCard('stat-role-count', uniqueRoles.size.toString());
}

/**
 * 통계 카드의 값을 업데이트하는 함수예요
 * @param {string} elementId - 업데이트할 요소의 ID
 * @param {string} value - 표시할 값
 */
function updateStatCard(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// ============================================
// 차트 업데이트 함수
// ============================================
/**
 * Chart.js 차트를 업데이트하는 함수예요
 * 역할 분포 파이 차트와 역량별 평균 점수 막대 그래프를 생성해요
 */
function updateCharts() {
    console.log('📊 차트를 업데이트합니다...');
    
    // 역할 분포 파이 차트 업데이트
    updateRoleDistributionChart();
    
    // 역량별 평균 점수 막대 그래프 업데이트
    updateCompetencyScoreChart();
}

/**
 * 역할 분포 파이 차트를 업데이트하는 함수예요
 */
function updateRoleDistributionChart() {
    const canvas = document.getElementById('role-distribution-chart');
    if (!canvas) {
        console.error('❌ 역할 분포 차트 캔버스를 찾을 수 없습니다!');
        return;
    }
    
    // 역할별 개수 계산
    const roleCounts = {};
    userData.forEach(user => {
        const role = user.finalRole || user.role || '미분류';
        roleCounts[role] = (roleCounts[role] || 0) + 1;
    });
    
    // 차트 데이터 준비
    const labels = Object.keys(roleCounts);
    const data = Object.values(roleCounts);
    
    // 색상 배열 (역할별로 다른 색상 사용)
    const colors = [
        'rgba(59, 130, 246, 0.8)',  // 파란색
        'rgba(16, 185, 129, 0.8)',  // 초록색
        'rgba(245, 158, 11, 0.8)',  // 노란색
        'rgba(239, 68, 68, 0.8)',   // 빨간색
        'rgba(139, 92, 246, 0.8)',  // 보라색
        'rgba(236, 72, 153, 0.8)'   // 분홍색
    ];
    
    // 기존 차트가 있으면 제거해요
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    // 새로운 차트 생성
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: colors.slice(0, labels.length).map(c => c.replace('0.8', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value}명 (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * 역량별 평균 점수 막대 그래프를 업데이트하는 함수예요
 */
function updateCompetencyScoreChart() {
    const canvas = document.getElementById('competency-score-chart');
    if (!canvas) {
        console.error('❌ 역량별 점수 차트 캔버스를 찾을 수 없습니다!');
        return;
    }
    
    // 역량별 평균 점수 계산
    const competencyScores = {};
    let count = 0;
    
    userData.forEach(user => {
        if (user.competencyScores && typeof user.competencyScores === 'object') {
            Object.keys(user.competencyScores).forEach(competency => {
                if (!competencyScores[competency]) {
                    competencyScores[competency] = { sum: 0, count: 0 };
                }
                competencyScores[competency].sum += user.competencyScores[competency];
                competencyScores[competency].count += 1;
            });
            count++;
        }
    });
    
    // 평균 계산
    const labels = Object.keys(competencyScores);
    const data = labels.map(competency => {
        const stats = competencyScores[competency];
        return stats.count > 0 ? (stats.sum / stats.count).toFixed(1) : 0;
    });
    
    // 기존 차트가 있으면 제거해요
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    // 새로운 차트 생성
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '평균 점수',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: '점수 (1-5)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `평균: ${context.parsed.y}점`;
                        }
                    }
                }
            }
        }
    });
}

// ============================================
// 테이블 업데이트 함수
// ============================================
/**
 * 사용자 목록 테이블을 업데이트하는 함수예요
 */
function updateTable() {
    console.log('📋 테이블을 업데이트합니다...');
    
    const tableBody = document.getElementById('user-table-body');
    if (!tableBody) {
        console.error('❌ 테이블 본문을 찾을 수 없습니다!');
        return;
    }
    
    // 필터링된 데이터가 없으면 메시지 표시
    if (filteredUserData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-4 py-8 text-center text-gray-500">
                    조건에 맞는 결과가 없습니다.
                </td>
            </tr>
        `;
        updatePagination();
        return;
    }
    
    // 정렬 적용
    const sortedData = applySort(filteredUserData);
    
    // 페이지네이션 적용
    const paginatedData = applyPagination(sortedData);
    
    // 테이블 행 생성
    const rows = paginatedData.map(user => {
        const employeeId = user.employeeId || user.id || '-';
        const role = user.role || '-';
        const genAIScore = user.genAIScore ? user.genAIScore.toFixed(1) : '-';
        const fieldScore = user.fieldScore ? user.fieldScore.toFixed(1) : '-';
        const strategyScore = user.strategyScore ? user.strategyScore.toFixed(1) : '-';
        const expertScore = user.expertScore ? user.expertScore.toFixed(1) : '-';
        const finalRole = user.finalRole || user.role || '-';
        const diagnosisDate = user.diagnosisDate 
            ? new Date(user.diagnosisDate).toLocaleString('ko-KR')
            : '-';
        
        return `
            <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-4 py-3">${employeeId}</td>
                <td class="px-4 py-3">${role}</td>
                <td class="px-4 py-3">${genAIScore}</td>
                <td class="px-4 py-3">${fieldScore}</td>
                <td class="px-4 py-3">${strategyScore}</td>
                <td class="px-4 py-3">${expertScore}</td>
                <td class="px-4 py-3">${finalRole}</td>
                <td class="px-4 py-3">${diagnosisDate}</td>
            </tr>
        `;
    }).join('');
    
    tableBody.innerHTML = rows;
    
    // 페이지네이션 업데이트
    updatePagination();
}

/**
 * 정렬을 적용하는 함수예요
 * @param {Array} data - 정렬할 데이터 배열
 * @returns {Array} 정렬된 데이터 배열
 */
function applySort(data) {
    if (!currentSort.column) {
        return data;
    }
    
    const sorted = [...data].sort((a, b) => {
        let aValue = a[currentSort.column];
        let bValue = b[currentSort.column];
        
        // 숫자로 변환 가능하면 숫자로 비교해요
        if (!isNaN(aValue) && !isNaN(bValue)) {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }
        
        // 날짜 형식이면 날짜로 비교해요
        if (currentSort.column === 'diagnosisDate') {
            aValue = aValue ? new Date(aValue).getTime() : 0;
            bValue = bValue ? new Date(bValue).getTime() : 0;
        }
        
        // 문자열 비교
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }
        
        // null이나 undefined 처리
        if (aValue == null) aValue = '';
        if (bValue == null) bValue = '';
        
        // 비교
        if (aValue < bValue) {
            return currentSort.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return currentSort.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
    
    return sorted;
}

/**
 * 페이지네이션을 적용하는 함수예요
 * @param {Array} data - 페이지네이션할 데이터 배열
 * @returns {Array} 현재 페이지의 데이터 배열
 */
function applyPagination(data) {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
}

/**
 * 페이지네이션 UI를 업데이트하는 함수예요
 */
function updatePagination() {
    const totalItems = filteredUserData.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
    
    // 페이지네이션 정보 업데이트
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `전체 ${totalItems.toLocaleString()}개 중 ${startIndex}-${endIndex}개 표시`;
    }
    
    // 페이지네이션 버튼 생성
    const paginationButtons = document.getElementById('pagination-buttons');
    if (!paginationButtons) {
        return;
    }
    
    if (totalPages <= 1) {
        paginationButtons.innerHTML = '';
        return;
    }
    
    let buttonsHTML = '';
    
    // 이전 페이지 버튼
    buttonsHTML += `
        <button
            ${currentPage === 1 ? 'disabled' : ''}
            onclick="goToPage(${currentPage - 1})"
            class="
                px-3
                py-1
                border
                border-gray-300
                rounded
                ${currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }
                text-sm
            "
        >
            이전
        </button>
    `;
    
    // 페이지 번호 버튼들
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        buttonsHTML += `
            <button
                onclick="goToPage(${i})"
                class="
                    px-3
                    py-1
                    border
                    border-gray-300
                    rounded
                    ${i === currentPage 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }
                    text-sm
                "
            >
                ${i}
            </button>
        `;
    }
    
    // 다음 페이지 버튼
    buttonsHTML += `
        <button
            ${currentPage === totalPages ? 'disabled' : ''}
            onclick="goToPage(${currentPage + 1})"
            class="
                px-3
                py-1
                border
                border-gray-300
                rounded
                ${currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }
                text-sm
            >
            다음
        </button>
    `;
    
    paginationButtons.innerHTML = buttonsHTML;
}

/**
 * 특정 페이지로 이동하는 함수예요
 * @param {number} page - 이동할 페이지 번호
 */
function goToPage(page) {
    const totalPages = Math.ceil(filteredUserData.length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) {
        return;
    }
    
    currentPage = page;
    updateTable();
    
    // 스크롤을 테이블 상단으로 이동해요
    const tableBody = document.getElementById('user-table-body');
    if (tableBody) {
        tableBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// 필터 및 검색 함수
// ============================================
/**
 * 필터 변경을 처리하는 함수예요
 */
function handleFilterChange() {
    console.log('🔍 필터가 변경되었습니다...');
    
    // 검색어 가져오기
    const searchEmployeeId = document.getElementById('search-employee-id');
    const employeeIdFilter = searchEmployeeId ? searchEmployeeId.value.trim().toLowerCase() : '';
    
    // 역할 필터 가져오기
    const filterRole = document.getElementById('filter-role');
    const roleFilter = filterRole ? filterRole.value : '';
    
    // 날짜 필터 가져오기
    const filterStartDate = document.getElementById('filter-start-date');
    const filterEndDate = document.getElementById('filter-end-date');
    const startDateFilter = filterStartDate ? filterStartDate.value : '';
    const endDateFilter = filterEndDate ? filterEndDate.value : '';
    
    // 필터링 적용
    filteredUserData = userData.filter(user => {
        // 사번 필터
        if (employeeIdFilter) {
            const employeeId = (user.employeeId || user.id || '').toString().toLowerCase();
            if (!employeeId.includes(employeeIdFilter)) {
                return false;
            }
        }
        
        // 역할 필터
        if (roleFilter) {
            const role = user.finalRole || user.role || '';
            if (role !== roleFilter) {
                return false;
            }
        }
        
        // 날짜 필터
        if (startDateFilter || endDateFilter) {
            if (!user.diagnosisDate) {
                return false;
            }
            
            const userDate = new Date(user.diagnosisDate).toISOString().split('T')[0];
            
            if (startDateFilter && userDate < startDateFilter) {
                return false;
            }
            
            if (endDateFilter && userDate > endDateFilter) {
                return false;
            }
        }
        
        return true;
    });
    
    // 첫 페이지로 이동
    currentPage = 1;
    
    // 테이블 업데이트
    updateTable();
}

/**
 * 정렬을 처리하는 함수예요
 * @param {string} column - 정렬할 컬럼 이름
 */
function handleSort(column) {
    console.log(`📊 정렬: ${column}`);
    
    // 같은 컬럼을 클릭하면 정렬 방향을 바꿔요
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    
    // 정렬 인디케이터 업데이트
    const headers = document.querySelectorAll('th[data-sort]');
    headers.forEach(header => {
        const indicator = header.querySelector('.sort-indicator');
        if (header.getAttribute('data-sort') === column) {
            indicator.textContent = currentSort.direction === 'asc' ? '↑' : '↓';
        } else {
            indicator.textContent = '↕';
        }
    });
    
    // 테이블 업데이트
    updateTable();
}

// ============================================
// CSV 다운로드 함수
// ============================================
/**
 * CSV 파일을 다운로드하는 함수예요
 */
function downloadCSV() {
    console.log('📥 CSV 파일을 다운로드합니다...');
    
    if (filteredUserData.length === 0) {
        alert('다운로드할 데이터가 없습니다.');
        return;
    }
    
    // CSV 헤더
    const headers = ['사번', '역할', '생성형 AI 점수', '실무 데이터 점수', '전략 점수', '전문가 점수', '최종 역할', '진단 일시'];
    
    // CSV 데이터
    const rows = filteredUserData.map(user => {
        return [
            user.employeeId || user.id || '',
            user.role || '',
            user.genAIScore ? user.genAIScore.toFixed(1) : '',
            user.fieldScore ? user.fieldScore.toFixed(1) : '',
            user.strategyScore ? user.strategyScore.toFixed(1) : '',
            user.expertScore ? user.expertScore.toFixed(1) : '',
            user.finalRole || user.role || '',
            user.diagnosisDate ? new Date(user.diagnosisDate).toLocaleString('ko-KR') : ''
        ];
    });
    
    // CSV 문자열 생성
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 다운로드 링크 생성
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `AX_진단결과_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ CSV 파일 다운로드 완료!');
}

// ============================================
// 유틸리티 함수
// ============================================
/**
 * 에러 메시지를 화면에 표시하는 함수예요
 * @param {string} message - 표시할 에러 메시지
 */
function showErrorMessage(message) {
    // 간단한 alert로 표시해요 (나중에 더 예쁜 UI로 개선할 수 있어요)
    alert(message);
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
    document.addEventListener('DOMContentLoaded', initializeAdmin);
} else {
    // HTML이 이미 로드되었으면 바로 실행해요
    initializeAdmin();
}

