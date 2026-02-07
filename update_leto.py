import csv

# 변경할 과정명 리스트
leto_courses = [
    "[AX] LG AX 개념 이해",
    "AX 추진전략' 사외 전문가 특강 컨텐츠",
    "[AX] 데이터 분석을 위한 기초 통계 이해",
    "[AX] 데이터 분석을 위한 수학/통계/머신러닝/딥러닝 이해",
    "[AX] AI 기술의 작동원리 이해",
    "[AX] 머신러닝 이해 자율학습 컨텐츠",
    "[AX] AI 딥러닝 자율 학습 컨텐츠",
    "[AX] 생성형 AI 이해를 위한 자율학습 컨텐츠",
    "[AX] R 프로그래밍 자율 학습 컨텐츠",
    "[AX] ChatEXAONE 이해 및 활용 (엑사원)",
    "[AX] 머신러닝/딥러닝 사례 실습 프로그램 사전학습",
    "[AX] 인공지능기술 개론"
]

# 입력 파일 읽기
input_file = r"c:\Users\김정고\Desktop\dw_kim\My Project\AX_Competency_v2\역량별_교육과정_최종매칭.csv"
output_file = r"c:\Users\김정고\Desktop\dw_kim\My Project\AX_Competency_v2\역량별_교육과정_최종매칭_v2.csv"

updated_courses = []
rows = []

with open(input_file, 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    header = next(reader)
    rows.append(header)
    
    for row in reader:
        if len(row) >= 5:  # 최소 5개 컬럼이 있는지 확인
            course_name = row[1]  # 과정명 (두 번째 컬럼)
            
            # 과정명이 leto_courses에 있고 방식이 e-learning인 경우
            if course_name in leto_courses and row[4] == 'e-learning':
                row[4] = 'LETO'  # 방식을 LETO로 변경
                updated_courses.append(course_name)
        
        rows.append(row)

# 출력 파일 작성
with open(output_file, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(rows)

# 변경된 과정 출력
print(f"총 {len(updated_courses)}개 과정의 방식이 'e-learning'에서 'LETO'로 변경되었습니다:\n")
for i, course in enumerate(updated_courses, 1):
    print(f"{i}. {course}")
