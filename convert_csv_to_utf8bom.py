# -*- coding: utf-8 -*-
# CSV 파일을 UTF-8 BOM으로 변환하는 스크립트예요
# Excel에서 한글이 깨지지 않도록 해줍니다

import codecs
import os

# 프로젝트 폴더 경로
base_path = r"c:\Users\김정고\Desktop\dw_kim\My Project\AX_Competency_v2"

# 변환할 파일 목록
files = [
    "교육프로그램_리스트.csv",
    "설문문항_리스트.csv",
    "역량진단_설문문항_리스트.csv"
]

for filename in files:
    input_file = os.path.join(base_path, filename)
    output_file = os.path.join(base_path, filename.replace(".csv", "_UTF8BOM.csv"))
    
    try:
        # UTF-8로 읽기
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # UTF-8 BOM으로 쓰기
        with open(output_file, 'w', encoding='utf-8-sig') as f:
            f.write(content)
        
        print(f"✅ 변환 완료: {filename} -> {filename.replace('.csv', '_UTF8BOM.csv')}")
        
        # 원본 파일을 UTF-8 BOM으로 덮어쓰기
        with open(input_file, 'w', encoding='utf-8-sig') as f:
            f.write(content)
        
        print(f"✅ 원본 파일도 UTF-8 BOM으로 업데이트: {filename}")
        
    except Exception as e:
        print(f"❌ 오류 발생 ({filename}): {e}")

print("\n🎉 모든 파일 변환 완료!")
print("이제 Excel에서 CSV 파일을 열면 한글이 정상적으로 표시됩니다!")
