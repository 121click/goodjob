# 📋 Daily Planner (일일 계획표)

직관적이고 동기부여가 되는 일일 계획 관리 앱입니다. 매일의 계획을 세우고, 실행 여부를 체크하며, 자신만의 평가를 통해 성장을 추적할 수 있습니다.

## ✨ 주요 기능

### 📝 계획 수립
- **시간별 계획 관리**: 하루를 시간대별로 나누어 체계적으로 관리
- **빠른 입력**: 자주 사용하는 활동들을 원클릭으로 입력
- **직관적인 UI**: 깔끔하고 사용하기 쉬운 인터페이스

### ✅ 실행 추적
- **완료 체크**: 각 계획의 실행 여부를 간단히 체크
- **실시간 진행률**: 오늘의 달성률을 한눈에 확인
- **시각적 피드백**: 완료된 항목은 시각적으로 구분

### 🎯 자기 평가
- **3단계 평가 시스템**:
  - 🟢 **이겨 되네!** (excellent): 완벽하게 수행
  - 🔵 **괜찮아요** (good): 적당히 수행
  - 🔴 **이전안되네!** (poor): 미흡하게 수행

### 📊 통계 및 분석
- **진행 현황 대시보드**: 전체/완료/대기 계획 수 표시
- **달성률 바**: 시각적 진행률 표시
- **동기부여 메시지**: 긍정적인 피드백 제공

### 💾 데이터 관리
- **로컬 저장**: 브라우저의 localStorage를 활용한 데이터 저장
- **날짜별 관리**: 각 날짜별로 독립적인 계획 관리
- **자동 저장**: 모든 변경사항 실시간 자동 저장

## 🚀 시작하기

### 설치 및 실행

```bash
# 프로젝트 클론
git clone [repository-url]
cd daily-planner

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

앱이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 사용법

1. **계획 추가**: 
   - 우측 상단의 "✏️ 편집" 버튼 클릭
   - 시간과 활동 내용을 입력하여 계획 추가
   - "✅ 편집 완료" 버튼으로 편집 모드 종료

2. **계획 실행**:
   - 각 계획 항목의 원형 버튼을 클릭하여 완료 표시
   - 완료된 항목은 초록색으로 표시되고 취소선이 그어짐

3. **자기 평가**:
   - 완료된 항목에 대해 평가 버튼을 클릭
   - 3단계 평가 중 하나를 선택

4. **진행 상황 확인**:
   - 상단의 통계 카드에서 전체 진행 상황 확인
   - 진행률 바로 시각적 달성률 확인

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Browser localStorage
- **Build Tool**: Create React App

## 📁 프로젝트 구조

```
daily-planner/
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── Header.tsx       # 헤더 컴포넌트
│   │   ├── PlanForm.tsx     # 계획 편집 폼
│   │   └── PlanView.tsx     # 계획 보기 화면
│   ├── types/               # TypeScript 타입 정의
│   │   └── index.ts         # 앱의 모든 타입 정의
│   ├── utils/               # 유틸리티 함수
│   │   └── helpers.ts       # 헬퍼 함수들
│   ├── App.tsx              # 메인 앱 컴포넌트
│   └── index.css            # 전역 스타일 및 Tailwind CSS
├── tailwind.config.js       # Tailwind CSS 설정
├── postcss.config.js        # PostCSS 설정
└── package.json             # 프로젝트 의존성
```

## 🎨 디자인 특징

- **반응형 디자인**: 모바일부터 데스크톱까지 모든 기기 지원
- **직관적인 색상 체계**: 상태별로 명확한 색상 구분
- **부드러운 애니메이션**: 사용자 경험 향상을 위한 전환 효과
- **접근성 고려**: 키보드 네비게이션 및 스크린 리더 지원

## 🌟 영감

이 프로젝트는 한국의 전통적인 결과보고서 양식에서 영감을 받았습니다. 시간별 계획 수립과 자기 평가를 통해 개인의 성장과 발전을 추적할 수 있도록 설계되었습니다.

## 📈 향후 개발 계획

- [ ] 주간/월간 통계 보기
- [ ] 목표 설정 및 추적
- [ ] 데이터 내보내기/가져오기
- [ ] 알림 기능
- [ ] 테마 커스터마이징
- [ ] 클라우드 동기화

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

**💡 팁**: 매일 조금씩이라도 계획을 세우고 실천하는 습관을 만들어보세요. 작은 성취들이 모여 큰 성장을 만들어냅니다! 🎯
