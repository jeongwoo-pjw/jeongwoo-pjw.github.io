# jeongwoo-pjw.github.io

UX/UI Designer 박정우의 소개 · 포트폴리오 사이트입니다.

- **Live**: https://jeongwoo-pjw.github.io/

## 구성

| 섹션 | 내용 |
|---|---|
| Home | 인사말, 직무 타이핑 효과, 이력서 보기 |
| About | 소개, 기본 정보, 툴 역량, Education · Experience |
| Services | UX/UI 디자인 · 브랜딩 · 바이브 코딩 · 실무 커뮤니케이션 |
| Portfolio | 분류 필터 + 프로젝트 카드 (PDF / 웹사이트 연결) |
| Contact | 연락처, 메일 문의 |

좌측 사이드바 메뉴로 섹션을 전환하며, 우측 상단에서 테마 색상과 다크모드를 바꿀 수 있습니다.

## 파일 구성

| 경로 | 내용 |
|---|---|
| `files/resume.pdf` · `career-description.pdf` · `portfolio.pdf` | 이력서 · 경력기술서 · 전체 포트폴리오 (About에서 연결) |
| `files/wepetworld.pdf` · `aesop.pdf` · `banksalad.pdf` | 프로젝트 PDF (Portfolio 카드에서 연결) |
| `images/portfolio/*.jpg` | 프로젝트 썸네일 16:9 — PDF 첫 페이지, 웹 프로젝트는 히어로 화면 |
| `images/profile.png` | Home 프로필 사진 (배경 투명 PNG) |

새 파일은 한글 · 공백 없는 영문 파일명으로 추가합니다.

## 로컬에서 보기

```bash
python -m http.server 5500 --bind 127.0.0.1
```
