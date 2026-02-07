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
 * 
 * 역량별_교육과정_최종매칭.csv 파일의 내용을 기반으로 생성되었어요
 */
const EDUCATION_COURSES = {
    "AI 개념 이해": [
        { courseName: "AX Level 1 과정 (AI 기초)", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "14시간", provider: "LGD", level: "초급", description: "1. AX/AI 이해 2. 데이터의 이해 3. AX/AI 활용" },
        { courseName: "AI 리터러시 기초", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "초급", description: "1. AI 기술의 개념과 역사 2. AI 리터러시의 이해 3. 일상 속 AI 기술의 이해 4. 기계 학습의 원리 5. 딥러닝의 원리 6. 대규모 언어 모델과 생성형 AI 7. AI 윤리와 주요 이슈 8. AI와 사회적 영향 9. 프롬프트 엔지니어링 기초 10. 고급 프롬프트 엔지니어링 기법" },
        { courseName: "머신러닝 101", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "사외", description: "1 머신러닝의 기본 개념 2 지도학습 알고리즘 3 비지도학습 알고리즘 4 딥러닝 모델" },
        { courseName: "데이터과학개론", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "14시간", provider: "한국기술교육대학", level: "사외", description: "1 빅데이터의 등장 배경 2 빅데이터의 수명주기와 IT 기술 3 데이터 과학의 개요 4 데이터 과학의 방법론-인공지능 5 데이터 과학의 방법론-머신러닝 6 데이터 과학의 방법론-데이터 분석 방법론 7 데이터 분석 실습환경 8 머신러닝 알고리즘-의사결정 트리 9 머신러닝 알고리즘-의사결정 트리 실습 10 머신러닝 알고리즘-회귀분석 11 머신러닝 알고리즘-회귀분석 실습 12 머신러닝 알고리즘-군집분석 13 머신러닝 알고리즘-인공신경망 14 머신러닝 알고리즘-인공신경망 실습" },
        { courseName: "머신러닝과 딥러닝", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "16시간", provider: "한국기술교육대학", level: "사외", description: "2 데이터셋 구성" },
        { courseName: "[AX] LG AX 개념 이해", difficulty: 1, difficultyStars: "★", method: "LETO", duration: "50시간", provider: "LGD", level: "초급", description: "LG AX 개념 이해" },
        { courseName: "[AX] AI 기술의 작동원리 이해", difficulty: 2, difficultyStars: "★★", method: "LETO", duration: "50시간", provider: "LGD", level: "사외", description: "AI 기술의 작동원리 이해" },
        { courseName: "[AX] 데이터 분석을 위한 수학/통계/머신러닝/딥러닝 이해", difficulty: 2, difficultyStars: "★★", method: "LETO", duration: "50시간", provider: "LGD", level: "사외", description: "데이터 분석을 위한 수학/통계/머신러닝/딥러닝 이해" },
        { courseName: "[AX] 인공지능기술 개론", difficulty: 3, difficultyStars: "★★★", method: "LETO", duration: "50시간", provider: "LGD", level: "중급", description: "인공지능기술 이해, 머신러닝 수학/통계, 머신러닝, 딥러닝, 컴퓨터 비전, 이상탐지, 강화학습, GPT 기술, 자연어처리 등" }
    ],
    "데이터 활용 및 시각화": [
        { courseName: "정형 데이터 분석의 모든 것", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "사외", description: "2 정형 데이터 분석 4단계" },
        { courseName: "MAS Spotfire 활용 과정 (이러닝)", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "5.2시간", provider: "LGD", level: "초급", description: "1. MAS 목적, MAS 시스템 구성/2. 테이블, 크로스테이블, 콤비네이션 차트 등 시각화 활용" },
        { courseName: "개발 엔지니어를 위한 MAS 시스템 활용 Skill-up 과정", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "20시간", provider: "LGD", level: "초급", description: "1. 데이터 실처리 정보  2. 데이터 테이블 생성 3. Master 시각화 구현 4. 항목별 분포 파악 위한 시각화 구현 5. 주요 인자 연계분석 위한 시각화 구현" },
        { courseName: "Matplotlib과 Seaborn을 활용한 빅데이터 시각화 실무", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "18시간", provider: "한국기술교육대학", level: "중급", description: "1\t파이썬 기본 문법 2\t파이썬 자료 구조 3\tNumPy & SciPy 4\t판다스(Pandas) 5\tMatplotlib 기초 6\tMatplotlib 그래프 그리기 7\tMatplotlib 차트 그리기 8\tMatplotlib 컬러 사용 9\tMatplotlib 주석 사용 10\tMatplotlib 그림 사용 11\tMatplotlib 결과 출력 12\tSeaborn 기초 13\tSeaborn 그래프 그리기 14\t범주형 다차원 데이터 시각화 15\t수치형 다차원 데이터 시각화 16\t다양한 데이터 시각화 17\t공공 데이터 시각화 프로젝트 18\t기업 데이터 시각화 프로젝트" },
        { courseName: "MAS Core Member 양성 과정", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "32시간", provider: "LGD", level: "중급", description: "1. FQA/ODA/TPA 기능 별 활용, 정형 분석 기능 별 활용, Data Service 기능 별 활용/2. Spotfire 시각화 기능별 활용, Spotfire Menu별 활용, Spotfire 데이터/필터/함수 활용/3. MAS 모듈 소개, MAS 분석 기능 소개" },
        { courseName: "Excel을 활용한 데이터 리터러시", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "15시간", provider: "한국기술교육대학", level: "사외", description: "1 데이터 이해와 분석 2 수식 작성과 데이터 바꾸기 3 보고서 서식활용 4 데이터 시각화를 위한 차트 활용 5 표 이해와 활용 6 데이터 처리를 위한 고급 함수 7 데이터 분석을 위한 피벗 테이블 활용 8 데이터 가공을 위한 파워 쿼리 9 웹 데이터 가져와 지도로 시각화하기 10 데이터 모델링을 위한 파워 피벗 11 고급 DAX 함수 활용 12 엑셀 통계와 빈도 분석 13 데이터 중심 성향과 변동성 14 데이터 상관관계와 미래값 예측 15 도전! 데이터 분석 실무" },
        { courseName: "통계 기반 데이터 분석", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "19시간", provider: "한국기술교육대학", level: "사외", description: "1 가설 설정 2 통계처리 결과에 대한 해석 3 빅데이터 처리 기술 4 상관분석 5 회귀분석 6 분산분석 7 주성분분석 8 로지스틱 회귀분석 9 예측분석 10 군집화 11 파생변수를 활용한 분석모델 확장 12 앙상블 기법을 활용한 분석모델 확장 13 예측 오차를 통한 예측 모델 성능 평가 14 교차 유효성 검사를 통한 예측 모델 성능 평가 15 컨퓨전 매트릭스를 통한 분류 모델 성능 평가 16 ROC 곡선 기법을 통한 분류 모델 성능 평가 17 내부 평가를 이용한 분류 모델 성능 평가 18 빅데이터 모델 운영시스템 적용방안 19 빅데이터 모델 개선방안" },
        { courseName: "통계 기반 데이터 해석", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "12시간", provider: "한국기술교육대학", level: "사외", description: "1 과학철학과 데이터 2 R 운용 기초 3 일변인 분석과 시각화 4 기술통계 5 추론통계 이론 6 가설 검증의 원리 7 카이제곱(χ2) 검증의 원리 8 t/z 검증의 원리 9 상관관계(r)의 원리 10 회귀분석의 원리 11 ANOVA의 원리 12 가설 검증의 한계와 윤리" },
        { courseName: "Power BI를 활용한 데이터 시각화 과정", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "15시간", provider: "한국기술교육대학", level: "사외", description: "1 Power BI 시작하기 2 데이터 가져오기 3 보고서 작성하기 4 파워 쿼리 편집기 활용하기 5 파일 결합하기 6 테이블 관계 설정 7 DAX 수식 작성하기 8 날짜 테이블 활용하기 9 DAX 함수 활용 10 데이터 시각화 11 맵 시각화 12 테이블 시각화 13 슬라이서와 필터 14 다양한 시각적 개체 활용하기 15 유용한 도구 활용하기" },
        { courseName: "파이썬 데이터 시각화", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "14시간", provider: "한국기술교육대학", level: "사외", description: "2 파이썬 개발 환경 이해" },
        { courseName: "[AX] 데이터 분석을 위한 기초 통계 이해", difficulty: 1, difficultyStars: "★", method: "LETO", duration: "50시간", provider: "LGD", level: "초급", description: "데이터 분석을 위한 기초 통계 이해" },
        { courseName: "AX Level 2 과정 (AI 활용) \"엔지니어\"", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "32시간", provider: "LGD", level: "중급", description: "1. 업무자동화 2. DIDOV 방법론 3. 데이터 전처리와 시각화 4. 머신러닝 5. Case Study" },
        { courseName: "AX Level 2 과정 (AI 활용) \"비엔지니어\"", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "32시간", provider: "LGD", level: "중급", description: "1. 업무자동화 2. DIDOV 방법론 3. 데이터 전처리와 시각화 4. 머신러닝 5. Case Study" },
        { courseName: "AI 머신러닝 실무 Master 과정 (바이브 코딩)", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "24시간", provider: "LGD", level: "중급", description: "바이브코딩을 활용하여 데이터분석/머신러닝 과제 수행 실무 프로세스 실습하는 프로그램" },
        { courseName: "[AX] 데이터 분석을 위한 수학/통계/머신러닝/딥러닝 이해", difficulty: 2, difficultyStars: "★★", method: "LETO", duration: "50시간", provider: "LGD", level: "사외", description: "데이터 분석을 위한 수학/통계/머신러닝/딥러닝 이해" },
        { courseName: "AI Machine Learning 기본", difficulty: 3, difficultyStars: "★★★", method: "Virtual Class", duration: "32시간", provider: "LGD", level: "중급", description: "1. 인공지능을 위한 수학기초  2. Linear/Nonlinear Model  3. Machine Learning의 이해 3. 인공 신경망 및 심층 신경망 이해" },
        { courseName: "R 데이터 분석 첫걸음", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "사외", description: "1 데이터 입출력 2 데이터 전처리 3 기술 통계 분석 4 데이터 시각화" },
        { courseName: "빅데이터 분석을 위한 R 프로그래밍(심화)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "사외", description: "1 데이터 과학과 빅데이터 처리 2 데이터의 구조와 데이터 입출력 3 데이터 조건문과 반복문 4 탐색적 데이터의 분석 처리 5 데이터 시각화와 데이터 과학 6 데이터 과학 세계의 모델링 7 데이터 모델의 회귀 분석 8 선형 모델과 로지스틱 회귀분석 9 텍스트 데이터의 파이프라인 처리 10 웹 데이터를 활용한 실전 프로젝트" }
    ],
    "생성형 AI 도구 활용": [
        { courseName: "다양한 생성형 AI 서비스 활용 기초", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "초급", description: "1. ChatGPT 이해와 활용 2. 클로드/제미나이 이해 및 활용 3. 검색 AI의 이해 및 활용 4. 이미지 생성 AI의 이해 및 활용 5. 동영상 생성 AI의 이해 및 활용 6. 음악 생성 AI의 이해 및 활용 7. 프레젠테이션 생성 AI의 이해 및 활용 8. 자료 시각화 AI로 데이터 스토리텔링 9. 특화 기능 AI 도구 이해 및 활용 10. 나만의 AI 비서 구축하기" },
        { courseName: "사무직의 AI 리터러시 향상하기", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "초급", description: "생성형 AI를 화룡한 문서 요약/보고서 생성/데이터 분석/VBA 데이터 처리/인포그래픽/카드뉴스 제작방법 등" },
        { courseName: "마케팅 직군의 AI 리터러시 향상하기", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "초급", description: "1.마케팅 분야 생성형 AI 개요 2.마케팅 콘셉트 및 전략 수립 3.시장 분석을 위한 AI 리서치\t 4.마케팅 블로그 포스트 생성하기 5.마케팅 이미지 생성하기 6.마케팅 이미지 편집하기 7.\t포스터 및 로고 제작하기 8.\tAI 기반 숏폼 영상 제작 9.제품 홍보 영상 제작 10.제품 홍보 영상 편집 및 음악 생성" },
        { courseName: "생성형 AI 업무 활용 기초", difficulty: 2, difficultyStars: "★★", method: "Off-line", duration: "8시간", provider: "LGD", level: "사외", description: "생성형 AI를 활용한 VBA 코드 업무효율화/자동화 방법" },
        { courseName: "ChatGPT 개발 활용 초급", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "12시간", provider: "한국기술교육대학", level: "중급", description: "1\t언어 지능과 LLM 2\tGPT 원리 3\tPrompt Engineering 기초 4\tPrompt Engineering 심화 5\tOpenAI API 사용 6\tOpenAI API 기초 7\tOpenAI API 심화 8\tFine Tuning 9\tEmbedding 10\tOpenAI API 응용 11\tRAG의 기초 12\tRAG의 수행" },
        { courseName: "ChatGPT와 TRIZ를 활용한 문제 해결 및 혁신제품 콘셉트 개발(기초)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "13시간", provider: "한국기술교육대학", level: "중급", description: "1\t제품 콘셉트와 문제 해결 2\t문제 인식과 목표 설정 3\t원인 분석 4\t문제 해결안 도출 - 기술적 모순과 40개 발명 원리 5\t문제 해결안 도출 - 물리적 모순, 분리 원리, 기능지향검색 6\t문제 해결안 도출 - 76가지 표준해결책과 ARIZ 7\tChatGPT 소개 및 활용 8\tChatGPT 고급 활용 9\tChatGPT 활용 사례 10\tChatGPT와 TRIZ의 통합 활용 11\t시장 조사와 아이디어 생성 12\t제품 콘셉트 모델링 및 시제품 제작 13\t제품 콘셉트 상업화" },
        { courseName: "비개발자를 위한 바이브 코딩 업무자동화 실무", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "16시간", provider: "LGD", level: "중급", description: "바이브코딩의 구조와 기본 개념을 이해하고, 이를 활용하여 업무 자동화 스킬을 습득하고, Excel/CSV 데이터 처리, 문서 자동 생성 등 다양한 자동화 실습을 통해  개인별 직무에서 창의적 문제 해결 아이디어를 도출할 수 있다." },
        { courseName: "업무 자동화를 위한 RPA 활용 Skill-Up 과정", difficulty: 2, difficultyStars: "★★", method: "Off-line", duration: "7시간", provider: "LGD", level: "사외", description: "1. RPA & UiPath   2. UiPath StudioX 소개  3. 실습" },
        { courseName: "챗GPT 업무 활용법", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "초급", description: "2 챗GPT 똑똑하게 활용하기" },
        { courseName: "[AX] ChatEXAONE 이해 및 활용 (엑사원)", difficulty: 1, difficultyStars: "★", method: "LETO", duration: "50시간", provider: "LGD", level: "초급", description: "LG그룹 자체 LLM 모델 (문서생성, 데이터 분석 등)" },
        { courseName: "[AX] 생성형 AI 이해를 위한 자율학습 컨텐츠", difficulty: 1, difficultyStars: "★", method: "LETO", duration: "50시간", provider: "LGD", level: "초급", description: "생성형 AI 이해를 위한 자율학습 컨텐츠" },
        { courseName: "AI 머신러닝 실무 Master 과정 (바이브 코딩)", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "24시간", provider: "LGD", level: "중급", description: "바이브코딩을 활용하여 데이터분석/머신러닝 과제 수행 실무 프로세스 실습하는 프로그램" }
    ],
    "파이썬 활용 기초": [
        { courseName: "AX Level 2 과정 (파이썬 입문)", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "10시간", provider: "LGD", level: "초급", description: "1. 파이썬 소개 2. 파이썬 기본 (1)(2) 3. 파이썬 실습" },
        { courseName: "파이썬 프로그래밍 (2024년)", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "16시간", provider: "한국기술교육대학", level: "초급", description: "1 파이썬 시작하기 2 파이썬 언어의 기본 3 수치형 자료형과 문자열 자료형의 특징 4 리스트, 튜플, 사전, 집합 자료형의 특징 5 리스트, 튜플, 사전 자료형의 활용 6 문자열 자료형의 메소드와 포맷팅 7 파이썬의 조건문 8 파이썬의 반복문 9 파이썬의 파일 입출력 10 파이썬의 함수 11 파이썬 함수의 활용과 람다 함수 12 파이썬의 모듈 13 파이썬 외부 모듈의 활용 14 파이썬의 클래스 15 파이썬 클래스의 활용 16 파이썬의 예외 처리" },
        { courseName: "Python PJT", difficulty: 2, difficultyStars: "★★", method: "Virtual Class", duration: "16시간", provider: "LGD", level: "사외", description: "1. Python 기초, Python Coding  기초 연습/2. Python Coding 응용 실습" },
        { courseName: "NumPy를 활용한 데이터처리 및 연산", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "중급", description: "1 데이터 분석 실습 준비하기 2 NumPy 기본 익히기 3 다차원 배열 생성하기 4 배열 가공하기 5 배열 원소 빠르게 처리하기 6 배열을 사용한 데이터 처리하기 7 배열을 사용한 데이터 통계 처리하기 8 행렬과 벡터 익히기 9 행렬과 벡터 활용하기 10 NumPy 활용하기" },
        { courseName: "Pandas를 활용한 데이터처리 및 연산", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "중급", description: "1 데이터 분석 실습 준비하기 2 Pandas의 자료구조 익히기 3 DataFrame 익히기 4 통계함수 익히기 5 Pandas의 인덱스 익히기 6 산술 및 그룹 연산하기 7 사용자 함수 정의 및 매핑하기 8 데이터 전처리하기 9 데이터 입출력하기 10 Pandas를 이용하여 데이터 분석하기" },
        { courseName: "Python을 활용한 데이터 분석 실습", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "사외", description: "1 데이터 분석 시작하기 2 기초 데이터 핸들링 3 기초 통계 4 머신러닝" },
        { courseName: "[AX] Python (파이썬) 코딩 스킬 기본", difficulty: 1, difficultyStars: "★", method: "LETO", duration: "50시간", provider: "LGD", level: "초급", description: "파이썬 코딩 입문, 데이터 분석을 위한 Numpy/Panda 라이브러리 활용법 등" }
    ],
    "AI 모델링 원리 이해": [
        { courseName: "[AX] 인공지능기술 개론", difficulty: 3, difficultyStars: "★★★", method: "LETO", duration: "30시간", provider: "LGD", level: "중급", description: "인공지능 소개 및 머신러닝, 컴퓨터 비전/딥러닝, 자연어 처리, 강화학습/이상탐지, 최신 인공지능 동향" },
        { courseName: "Python으로 배우는 머신러닝과 데이터 분석 (2024년)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "14시간", provider: "한국기술교육대학", level: "중급", description: "1\t데이터 분석과 Python 개발환경 설정  2\t탐색적 데이터 분석 1  3\t탐색적 데이터 분석 2 4\t탐색적 데이터 분석 3 5\t탐색적 데이터 분석 4 6\t데이터 전처리 7\t머신러닝의 기초 8\t회귀 및 분류모델 기초 9\t지도학습 머신러닝 모델링(1)-분류모델 10\t지도학습 머신러닝 모델링(2)-분류모델 11\t지도학습 머신러닝 모델링(3)-분류모델 12\t지도학습 머신러닝 모델링(1)-회귀모델 13\t지도학습 머신러닝 모델링(2)-회귀모델 14\t머신러닝 모델 오류 및 운영환경 적용" },
        { courseName: "머신러닝 수학(미분학)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "중급", description: "1 머신러닝과 미분 2 다변수 함수의 미분 3 경사하강법  4 다층 구조의 미분" },
        { courseName: "머신러닝 수학(선형대수, 확률통계)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "중급", description: "1 확률 2 확률변수 3 벡터공간과 부분공간 4 행렬 5 행렬의 대각화 - 고윳값, 고유벡터 6 벡터공간에서의 직교 7 직교대각화와 특이값 분해 8 이차형식과 PCA" },
        { courseName: "(e) 수학/통계 기반 머신러닝 알고리즘 이해", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "21시간", provider: "LGD", level: "중급", description: "1. 인공지능기술을 활용한 과제 수행을 위해 필요한 실무적 관점의 Fundamental 이론/스킬 : AI 기술 기초, 수학/통계, 머신러닝/딥러닝 실무기술" },
        { courseName: "(e) 인공신경망 기반 머신러닝 이해", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "20시간", provider: "LGD", level: "중급", description: "1. NN(Neural Network)의 universality/2. FNN(Fully-connected Neural Network)/3. CNN(Convolutional Neural Network)/4. LSTM(Long Short Term Memory)/5. VAE(Variational Auto Encoder)/6. GAN(Generative Adversarial Networks)" },
        { courseName: "Scikit-learn을 활용한 머신러닝 실습(기본)", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "사외", description: "1 머신러닝을 위한 파이썬 기본 2 머신러닝을 위한 파이썬 중급 3 Scikit-learn 데이터 형식인 NumPy의 이해 4 NumPy 메소드와 universal 함수의 이해 5 Scikit-learn의 기본 구조의 이해 6 회귀 모델의 이해와 성능 향상 7 분류 모델의 이해와 성능 향상 8 비지도 학습 방법" },
        { courseName: "Scikit-learn을 활용한 머신러닝 실습(심화)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "사외", description: "1 머신러닝 심화 과정의 주요 내용 2 머신러닝을 위한 NumPy Array 다루기 3 데이터 변환과 추출을 위한 Pandas의 이해 4 Scikit-learn의 다양한 데이터 변환 방법 5 모델 튜닝과 성능 향상 6 model pipeline 7 비즈니스 요구에 따른 다양한 성능 평가 방법 8 데이터와 모델의 시각화" },
        { courseName: "머신러닝을 통한 데이터 분석", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "12시간", provider: "한국기술교육대학", level: "사외", description: "2 머신러닝의 개요" },
        { courseName: "[AX] 머신러닝 이해 자율학습 컨텐츠", difficulty: 3, difficultyStars: "★★★", method: "LETO", duration: "50시간", provider: "LGD", level: "중급", description: "머신러닝 이해 자율학습 컨텐츠" },
        { courseName: "AX Level 2 과정 (AI 활용) \"엔지니어\"", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "32시간", provider: "LGD", level: "중급", description: "1. 업무자동화 2. DIDOV 방법론 3. 데이터 전처리와 시각화 4. 머신러닝 5. Case Study" },
        { courseName: "AX Level 2 과정 (AI 활용) \"비엔지니어\"", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "32시간", provider: "LGD", level: "중급", description: "1. 업무자동화 2. DIDOV 방법론 3. 데이터 전처리와 시각화 4. 머신러닝 5. Case Study" },
        { courseName: "딥러닝 Project Challenge", difficulty: 4, difficultyStars: "★★★★", method: "Virtual Class", duration: "34시간", provider: "LGD", level: "고급", description: "1.인공지능 수학기초 및 머신러너의 이해 2. 디지털 신호처리/심층신경망/CNN의 이해 3.시계열 데이터 처리/RNN/Transformer의 이해 4. 시계열 데이터 처리 기법 5.Project 수행 및 결과 발표" },
        { courseName: "AI Project Challenge", difficulty: 5, difficultyStars: "★★★★★", method: "Virtual Class", duration: "34시간", provider: "LGD", level: "고급", description: "1. VISDA, 다양한 backbone 네트워크의 이해/2. Semi-supervised learning, Domain Adaptation (DA) 의 이해/3. VISDA 기준, 네트워크 설계/평가 (비전 AI모델 사례 실습)" },
        { courseName: "(AI 연구원) AI Project Design Course", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "24시간", provider: "AI연구원", level: "중급", description: "1. AI 기술을 적용한 프로젝트 실제사례 실습을 통해 파이썬 코딩을 활용한 머신러닝/딥러닝 수행방법을 이해하고, 교육참가자는 AI를 적용할 수 있는 현업의 문제를 도출/정의하여 과제 제안서를 작성할 수 있다." },
        { courseName: "(AI 연구원) AI Expert Course", difficulty: 5, difficultyStars: "★★★★★", method: "Off-line", duration: "288시간", provider: "AI연구원", level: "고급", description: "1. AI Project 문제정의 및 AI모델 개발 및 평가/2. 현업 조직내 적용 및 활용방안 도출 (현업 AI 과제 1:1 멘토링 방식)" },
        { courseName: "AI Deep Learning 기본", difficulty: 3, difficultyStars: "★★★", method: "Virtual Class", duration: "24시간", provider: "LGD", level: "중급", description: "1. RNN 구조/LSTM/GAN 이해/GAN 구조/Advanced GAN/2. CNN 의 개념/CNN 구조 및 적용/Pooling layer/Applications" },
        { courseName: "[AX] 데이터 분석을 위한 수학/통계/머신러닝/딥러닝 이해", difficulty: 2, difficultyStars: "★★", method: "LETO", duration: "50시간", provider: "LGD", level: "사외", description: "데이터 분석을 위한 수학/통계/머신러닝/딥러닝 이해" },
        { courseName: "AI Machine Learning 기본", difficulty: 3, difficultyStars: "★★★", method: "Virtual Class", duration: "32시간", provider: "LGD", level: "중급", description: "1. 인공지능을 위한 수학기초  2. Linear/Nonlinear Model  3. Machine Learning의 이해 3. 인공 신경망 및 심층 신경망 이해" },
        { courseName: "딥러닝 심화 - CNN", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "9시간", provider: "한국기술교육대학", level: "사외", description: "1 CNN과 컴퓨터 비전 2 합성곱 연산의 이해 3 CNN의 기본 구조 4 대표적인 CNN 구조(LeNet-5, AlexNet, ZF-Net) 5 대표적인 CNN 구조(VGG, GoogLeNet, ResNet) 6 CNN의 구현 환경 7 Keras를 이용한 CNN 실습 8 Bottleneck 구조와 Compact Networks 9 다양한 Residual Block의 탐색" },
        { courseName: "딥러닝 심화 - 컴퓨터 비전", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "7시간", provider: "한국기술교육대학", level: "사외", description: "1 Localization 2 객체 검출 기본 3 슬라이딩 윈도우 방식 객체 검출 4 Proposal 기반 객체 검출 5 1단 구조 객체 검출 6 Feature Pyramid 기반 객체 검출 7 Tensorflow2를 이용한 객체 검출 실습" },
        { courseName: "CNN 기반 이미지 라벨링 실습(기본)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "중급", description: "1 딥러닝 기초 및 Back Propagation 2 딥러닝 개발 환경 구축 3 딥러닝 프로그램을 위한 Python 기초 4 TensorFlow 예제를 통한 CNN 살펴보기 5 이미지 라벨링을 위한 데이터 전처리 6 AlexNet을 활용한 이미지 라벨링 7 ResNet을 활용한 이미지 라벨링 8 MobileNet을 활용한 이미지 라벨링" },
        { courseName: "CNN 기반 이미지 라벨링 실습(심화)", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "사외", description: "1 CNN 기반 Object Detection 개요 2 Faster R-CNN을 활용한 Object Detection 및 실습 3 YOLO를 활용한 Object Detection 및 실습 4 SSD를 활용한 Object Detection 및 실습 5 CNN 기반 Semantic Segmentation 6 FCN/Deconvolutional Network를 활용한 Semantic Segmentation 및 실습 7 Dilated Convolution을 활용한 Semantic Segmentation 및 실습 8 Deeplab을 활용한 Semantic Segmentation 및 실습" },
        { courseName: "RNN을 활용한 자연어 처리 초급(스마트 번역기 만들기)", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "7시간", provider: "한국기술교육대학", level: "사외", description: "1 RNN 기반 자연어 처리 소개 2 자연어 처리 코딩 기초 3 스마트 번역기 소개 4 스마트 번역기 데이터 처리 5 스마트 번역기 RNN 구현 6 스마트 번역기 학습 및 평가 7 스마트 번역기 최적화" },
        { courseName: "RNN을 활용한 자연어 처리 고급(음성 인식하기)", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "사외", description: "1 RNN 기반 자연어 처리 소개 2 자연어 처리 코딩 기초 3 AI 음성 인식기 소개 4 음성 데이터 다운 샘플링 5 음성 데이터 사분할 및 저장 6 음성 인식기 RNN 구현 7 음성 인식기 RNN 학습 및 평가 8 음성 인식기 최적화" },
        { courseName: "RNN을 활용한 자연어 처리 중급(BBC 기사 분류하기)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "7시간", provider: "한국기술교육대학", level: "사외", description: "1 RNN 기반 자연어 처리 소개 2 자연어 처리 코딩 기초 3 AI 문서 분류기 소개 4 기사 데이터 제외어 처리 5 기사 데이터 토큰 처리 6 RNN 구현, 학습 및 평가 7 기사 분류기 최적화" },
        { courseName: "강화 학습 기초 - 기본 원리 및 이론", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "사외", description: "1 강화 학습의 기본 2 강화 학습의 절차 및 분류 3 강화 학습 실습 환경 소개 4 마르코프 결정 과정, 보상 이득 5 정책과 가치 함수 6 최적 정책과 최적 가치 함수 7 최적 가치 및 최적 정책 산출 실험 8 동적 프로그래밍 기반 정책 평가 및 정책 개선 9 동적 프로그래밍 기반 정책 반복 및 가치 반복 10 정책 반복과 가치 반복 알고리즘 구현 및 실험" },
        { courseName: "강화 학습 응용 - 학습 유형별 알고리즘 및 응용", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "12시간", provider: "한국기술교육대학", level: "사외", description: "1 몬테카를로 예측의 기본 2 몬테카를로 제어의 기본 3 몬테카를로 학습 에이전트 개발 4 시간차 예측 및 측정 5 시간차 예측을 통한 가치 추정 6 SARSA와 Q-Learning 7 시간차 학습 에이전트 개발 8 모델 기반 학습 9 모델 기반 학습 에이전트 개발 10 다양한 강화 학습 기법 11 Tic-Tac-Toe 강화 학습 환경 구축 12 Tic-Tac-Toe 강화 학습 게임 에이전트 개발 및 훈련" },
        { courseName: "시각딥러닝을 이용한 영상처리", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "18시간", provider: "한국기술교육대학", level: "사외", description: "2 영상처리 기초" },
        { courseName: "[AX] AI 딥러닝 자율 학습 컨텐츠", difficulty: 3, difficultyStars: "★★★", method: "LETO", duration: "50시간", provider: "LGD", level: "중급", description: "AI 딥러닝 자율 학습 컨텐츠" },
        { courseName: "[AX] 머신러닝/딥러닝 사례 실습 프로그램 사전학습", difficulty: 3, difficultyStars: "★★★", method: "LETO", duration: "50시간", provider: "LGD", level: "중급", description: "머신러닝/딥러닝 사례 실습 프로그램 사전학습" },
        { courseName: "(AI 연구원) LG AI 박사 과정", difficulty: 5, difficultyStars: "★★★★★", method: "Off-line", duration: "1440시간", provider: "AI연구원", level: "전문가", description: "1. 연구 세미나 1과목 완료 (세미나 최소 15회 이상)/2. 평가: 종합시험/프로젝트/인터뷰 중 택 1 (지도교수 : AI 연구원 연구위원&자문교수)" },
        { courseName: "(AI 연구원) LG AI 석사 과정", difficulty: 5, difficultyStars: "★★★★★", method: "Off-line", duration: "1440시간", provider: "AI연구원", level: "전문가", description: "1. 전공필수+전공심화+연구 세미나 각 1과목 완료 (세미나 최소 5회 이상)/2. 평가: 종합시험/프로젝트/인터뷰 중 택 1 (지도교수: AI 연구원 박사학위 보유 리더)" },
        { courseName: "(AI 연구원) AI Expert Course", difficulty: 5, difficultyStars: "★★★★★", method: "Off-line", duration: "288시간", provider: "AI연구원", level: "고급", description: "1. AI Project 문제정의 및 AI모델 개발 및 평가/2. 현업 조직내 적용 및 활용방안 도출 (현업 AI 과제 1:1 멘토링 방식)" }
    ],
    "알고리즘/코딩 적용 능력": [
        { courseName: "MATLAB 기본 및 PJT", difficulty: 1, difficultyStars: "★", method: "Virtual Class", duration: "24시간", provider: "LGD", level: "초급", description: "1. MATLAB 구조/환경, MATLAB 기초 Coding Skill/2. MATLAB 응용 Coding Skill" },
        { courseName: "이산수학", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "26시간", provider: "한국기술교육대학", level: "중급", description: "1 집합 2 수의 종류 3 수의 연산과 표현 4 모듈라 연산 5 이진법과 컴퓨터 데이터 6 명제와 논리 7 증명 8 행렬 9 행렬과 연립방정식 10 관계 11 함수 12 함수의 응용 13 그래프 14 그래프의 활용 15 트리 16 트리의 활용 17 순열과 조합 18 확률 19 확률분포 20 알고리즘 21 정렬 22 탐색 23 부울대수 24 논리게이트 25 대칭키 암호시스템 26 RSA 암호시스템과 전자서명" },
        { courseName: "영상처리 기본", difficulty: 2, difficultyStars: "★★", method: "Virtual Class", duration: "24시간", provider: "LGD", level: "사외", description: "1. 영상 처리 기초, 공간 및 주파수 영역 영상처리, 컬러 영상 처리 및 영상 분할/2. 형태론 영상처리 및 영상 압축, Display 영상처리 기법" },
        { courseName: "[AX] C++ 코딩스킬 기본", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "16시간", provider: "LGD", level: "초급", description: "1. C++ 개요 및 문법, C++ Coding  기초/2. C++ Coding 응용" },
        { courseName: "[AX] MATLAB 코딩스킬 기본", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "24시간", provider: "LGD", level: "초급", description: "1. MATLAB 구조/환경, MATLAB 기초 Coding Skill/2. MATLAB 응용 Coding Skill" },
        { courseName: "[AX] 영상처리 실무 (Python)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "16시간", provider: "LGD", level: "중급", description: "1. 과정 개요 및 실습 준비  2. 1차 과제 수행 3. 핵심 이론 및 실습 I  4. 2차 과제 수행  5. 핵심 이론 및 실습 II" },
        { courseName: "[AX] 영상처리 실무 (C++)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "16시간", provider: "LGD", level: "중급", description: "1. 과정 개요 및 실습 준비  2. 1차 과제 수행 3. 핵심 이론 및 실습 I  4. 2차 과제 수행  5. 핵심 이론 및 실습 II" },
        { courseName: "[AX] 영상처리 실무 (Matlab)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "16시간", provider: "LGD", level: "중급", description: "1. 과정 개요 및 실습 준비  2. 1차 과제 수행 3. 핵심 이론 및 실습 I  4. 2차 과제 수행  5. 핵심 이론 및 실습 II" },
        { courseName: "Python 기반 SQL 프로그래밍", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "16시간", provider: "한국기술교육대학", level: "사외", description: "1 DBMS와 데이터 모델링 3단계의 이해 2 개발환경 세팅 및 Jupyter Notebook 기초 실습 3 SQLite3 라이브러리를 활용한 SQL 명령문 실행 4 Pandas를 활용한 SQL 명령문 실행 5 CREATE 명령어를 활용한 DB 테이블의 생성 6 DDL 명령어의 이해 및 실습 7 SQL SELECT 명령어의 이해 및 실습 8 SQL INSERT, UPDATE, DELETE 명령어 실습 9 SQL SELECT 세부 명령어 실습 1 10 SQL SELECT 세부 명령어 실습 2 11 SQL INNER JOIN 실습 12 SQL LEFT JOIN 실습 13 SQL GROUP BY 실습 1 14 SQL GROUP BY 실습 2 15 SQL SubQuery 활용 실습 16 데이터셋 기반 DB 구축 & DB 활용 실습" },
        { courseName: "프로젝트 성공을 위한 SQL", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "사외", description: "2 문자 데이터 조회하기" },
        { courseName: "웹 크롤링", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "24시간", provider: "한국기술교육대학", level: "사외", description: "2 웹 스크레이핑의 개념" },
        { courseName: "데이터베이스 초보 탈출", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "4시간", provider: "한국기술교육대학", level: "사외", description: "2 SQL 언어의 이해와 쿼리(Query)의 사용" },
        { courseName: "[AX] R 프로그래밍 자율 학습 컨텐츠", difficulty: 1, difficultyStars: "★", method: "LETO", duration: "50시간", provider: "LGD", level: "초급", description: "R 프로그래밍 자율 학습 컨텐츠" },
        { courseName: "R 비즈니스 분석 기초", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "15시간", provider: "한국기술교육대학", level: "초급", description: "2 R 기본 사용 방법" },
        { courseName: "AI Deep Learning 기본", difficulty: 3, difficultyStars: "★★★", method: "Virtual Class", duration: "24시간", provider: "LGD", level: "중급", description: "1. RNN 구조/LSTM/GAN 이해/GAN 구조/Advanced GAN/2. CNN 의 개념/CNN 구조 및 적용/Pooling layer/Applications" },
        { courseName: "딥러닝 심화 - CNN", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "9시간", provider: "한국기술교육대학", level: "사외", description: "1 CNN과 컴퓨터 비전 2 합성곱 연산의 이해 3 CNN의 기본 구조 4 대표적인 CNN 구조(LeNet-5, AlexNet, ZF-Net) 5 대표적인 CNN 구조(VGG, GoogLeNet, ResNet) 6 CNN의 구현 환경 7 Keras를 이용한 CNN 실습 8 Bottleneck 구조와 Compact Networks 9 다양한 Residual Block의 탐색" },
        { courseName: "딥러닝 심화 - 컴퓨터 비전", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "7시간", provider: "한국기술교육대학", level: "사외", description: "1 Localization 2 객체 검출 기본 3 슬라이딩 윈도우 방식 객체 검출 4 Proposal 기반 객체 검출 5 1단 구조 객체 검출 6 Feature Pyramid 기반 객체 검출 7 Tensorflow2를 이용한 객체 검출 실습" },
        { courseName: "CNN 기반 이미지 라벨링 실습(기본)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "중급", description: "1 딥러닝 기초 및 Back Propagation 2 딥러닝 개발 환경 구축 3 딥러닝 프로그램을 위한 Python 기초 4 TensorFlow 예제를 통한 CNN 살펴보기 5 이미지 라벨링을 위한 데이터 전처리 6 AlexNet을 활용한 이미지 라벨링 7 ResNet을 활용한 이미지 라벨링 8 MobileNet을 활용한 이미지 라벨링" },
        { courseName: "CNN 기반 이미지 라벨링 실습(심화)", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "사외", description: "1 CNN 기반 Object Detection 개요 2 Faster R-CNN을 활용한 Object Detection 및 실습 3 YOLO를 활용한 Object Detection 및 실습 4 SSD를 활용한 Object Detection 및 실습 5 CNN 기반 Semantic Segmentation 6 FCN/Deconvolutional Network를 활용한 Semantic Segmentation 및 실습 7 Dilated Convolution을 활용한 Semantic Segmentation 및 실습 8 Deeplab을 활용한 Semantic Segmentation 및 실습" },
        { courseName: "RNN을 활용한 자연어 처리 초급(스마트 번역기 만들기)", difficulty: 2, difficultyStars: "★★", method: "e-learning", duration: "7시간", provider: "한국기술교육대학", level: "사외", description: "1 RNN 기반 자연어 처리 소개 2 자연어 처리 코딩 기초 3 스마트 번역기 소개 4 스마트 번역기 데이터 처리 5 스마트 번역기 RNN 구현 6 스마트 번역기 학습 및 평가 7 스마트 번역기 최적화" },
        { courseName: "RNN을 활용한 자연어 처리 고급(음성 인식하기)", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "8시간", provider: "한국기술교육대학", level: "사외", description: "1 RNN 기반 자연어 처리 소개 2 자연어 처리 코딩 기초 3 AI 음성 인식기 소개 4 음성 데이터 다운 샘플링 5 음성 데이터 사분할 및 저장 6 음성 인식기 RNN 구현 7 음성 인식기 RNN 학습 및 평가 8 음성 인식기 최적화" },
        { courseName: "RNN을 활용한 자연어 처리 중급(BBC 기사 분류하기)", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "7시간", provider: "한국기술교육대학", level: "사외", description: "1 RNN 기반 자연어 처리 소개 2 자연어 처리 코딩 기초 3 AI 문서 분류기 소개 4 기사 데이터 제외어 처리 5 기사 데이터 토큰 처리 6 RNN 구현, 학습 및 평가 7 기사 분류기 최적화" },
        { courseName: "강화 학습 기초 - 기본 원리 및 이론", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "10시간", provider: "한국기술교육대학", level: "사외", description: "1 강화 학습의 기본 2 강화 학습의 절차 및 분류 3 강화 학습 실습 환경 소개 4 마르코프 결정 과정, 보상 이득 5 정책과 가치 함수 6 최적 정책과 최적 가치 함수 7 최적 가치 및 최적 정책 산출 실험 8 동적 프로그래밍 기반 정책 평가 및 정책 개선 9 동적 프로그래밍 기반 정책 반복 및 가치 반복 10 정책 반복과 가치 반복 알고리즘 구현 및 실험" },
        { courseName: "강화 학습 응용 - 학습 유형별 알고리즘 및 응용", difficulty: 4, difficultyStars: "★★★★", method: "e-learning", duration: "12시간", provider: "한국기술교육대학", level: "사외", description: "1 몬테카를로 예측의 기본 2 몬테카를로 제어의 기본 3 몬테카를로 학습 에이전트 개발 4 시간차 예측 및 측정 5 시간차 예측을 통한 가치 추정 6 SARSA와 Q-Learning 7 시간차 학습 에이전트 개발 8 모델 기반 학습 9 모델 기반 학습 에이전트 개발 10 다양한 강화 학습 기법 11 Tic-Tac-Toe 강화 학습 환경 구축 12 Tic-Tac-Toe 강화 학습 게임 에이전트 개발 및 훈련" },
        { courseName: "시각딥러닝을 이용한 영상처리", difficulty: 3, difficultyStars: "★★★", method: "e-learning", duration: "18시간", provider: "한국기술교육대학", level: "사외", description: "2 영상처리 기초" },
        { courseName: "[AX] AI 딥러닝 자율 학습 컨텐츠", difficulty: 3, difficultyStars: "★★★", method: "LETO", duration: "50시간", provider: "LGD", level: "중급", description: "AI 딥러닝 자율 학습 컨텐츠" },
        { courseName: "[AX] 머신러닝/딥러닝 사례 실습 프로그램 사전학습", difficulty: 3, difficultyStars: "★★★", method: "LETO", duration: "50시간", provider: "LGD", level: "중급", description: "머신러닝/딥러닝 사례 실습 프로그램 사전학습" },
        { courseName: "(AI 연구원) LG AI 박사 과정", difficulty: 5, difficultyStars: "★★★★★", method: "Off-line", duration: "1440시간", provider: "AI연구원", level: "전문가", description: "1. 연구 세미나 1과목 완료 (세미나 최소 15회 이상)/2. 평가: 종합시험/프로젝트/인터뷰 중 택 1 (지도교수 : AI 연구원 연구위원&자문교수)" },
        { courseName: "(AI 연구원) LG AI 석사 과정", difficulty: 5, difficultyStars: "★★★★★", method: "Off-line", duration: "1440시간", provider: "AI연구원", level: "전문가", description: "1. 전공필수+전공심화+연구 세미나 각 1과목 완료 (세미나 최소 5회 이상)/2. 평가: 종합시험/프로젝트/인터뷰 중 택 1 (지도교수: AI 연구원 박사학위 보유 리더)" },
        { courseName: "(AI 연구원) AI Expert Course", difficulty: 5, difficultyStars: "★★★★★", method: "Off-line", duration: "288시간", provider: "AI연구원", level: "고급", description: "1. AI Project 문제정의 및 AI모델 개발 및 평가/2. 현업 조직내 적용 및 활용방안 도출 (현업 AI 과제 1:1 멘토링 방식)" }
    ],
    "AI 협업/의사소통 역량": [
        { courseName: "AX Level 1 과정 (문제해결방법론)", difficulty: 1, difficultyStars: "★", method: "e-learning", duration: "16시간", provider: "LGD", level: "초급", description: "1. 문제해결기초 2. 6시그마 기초" },
        { courseName: "AX Level 2 과정 (AI 활용) \"엔지니어\"", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "32시간", provider: "LGD", level: "중급", description: "1. 업무자동화 2. DIDOV 방법론 3. 데이터 전처리와 시각화 4. 머신러닝 5. Case Study" },
        { courseName: "AX Level 2 과정 (AI 활용) \"비엔지니어\"", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "32시간", provider: "LGD", level: "중급", description: "1. 업무자동화 2. DIDOV 방법론 3. 데이터 전처리와 시각화 4. 머신러닝 5. Case Study" },
        { courseName: "AX Level 3 과정 (문제해결 심화)", difficulty: 4, difficultyStars: "★★★★", method: "Off-line", duration: "16시간", provider: "LGD", level: "고급", description: "1. 실험계획법  2. 6σ Case Study" }
    ],
    "AI 전략적 사고 및 윤리 인식": [
        { courseName: "임원/담당 LGD AX Literacy 강화", difficulty: 2, difficultyStars: "★★", method: "Off-line", duration: "8시간", provider: "인화원", level: "사외", description: "AX 이해, AI 기본 원리 이해, AX 추진사례 이해" },
        { courseName: "AX Camp", difficulty: 2, difficultyStars: "★★", method: "Off-line", duration: "10시간", provider: "인화원", level: "사외", description: "LG AX 추진방향, 생성형 AI 실습, AX 기반 사업성과 창출을 위한 리더의 역할" },
        { courseName: "AX 생태계와 전략적 의사결정", difficulty: 3, difficultyStars: "★★★", method: "Off-line", duration: "8시간", provider: "인화원", level: "중급", description: "AI 전/후방 산업 생태계와 사업기회 논의, AI Agent 활용 전략적 의사결정 실습, AI 활용 조직생산성 향상 방안" }
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

