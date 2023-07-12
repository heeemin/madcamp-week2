![Image](https://github.com/heeemin/madcamp-week2/blob/garbage2/src/client/assets/background/square-background.png)

# Maze

※ __2023 몰입캠프 프로젝트 2__ (2023.07.06. ~ 2023.07.12.) ※

<br/>

## Team

:bust_in_silhouette: __장준하__ ( KAIST 20, CS ) : Front-end, Maze Data & Algorithm
<br/>

:bust_in_silhouette: __김민희__ ( 숙명여대 21, CS ) : Back-end

<br/>

## Components
[ [Maze Only Repo](https://github.com/Junha-Jang/madcamp-proj2) : 게임을 실행해보세요 ]

##### Sing up, Sign in

일반 회원가입, 구글 로그인을 활용하여 로그인이 가능합니다


##### Info
사용자의 정보가 저장되어 있는 페이지.
...

##### Scoreboard
매 스테이지마다의 최고 기록 및 최단 시간이 기록되어 있습니다.
...

##### Maze

상하좌우로 슬라이드하며 해당 방향으로 캐릭터를 이동시킬 수 있습니다.

화면을 두 번 탭하면, 공의 색깔이 바뀝니다.
파란색 공일 때에는, 공이 화면의 중앙에 놓이는 1인칭 시점이 되고,
빨간색 공일 때에는, 화면이 고정되는 3인칭 시점이 됩니다.
3인칭 시점인 상태에서 벽이 없는 경계를 넘어가면 반대쪽 경계로 다시 넘어오게 됩니다.

열쇠를 먹으면, 열쇠와 같은 색의 벽을 1회 뚫을 수 있습니다.
하지만, 열쇠는 최대 한 번에 1개만 소지가 가능하며, 소지 중인 열쇠의 색으로 배경이 변합니다.

최종적으로 맵에 있는 깃발을 모두 획득하면 승리합니다!
적은 조작 횟수로 클리어에 도전해보세요!

<br/>

## Tech Stacks

MongoDB, ExpressJS, React Native, Nods.js
