# Free Archive File Extension Converter

<br>
<img src="https://github.com/user-attachments/assets/e80eca97-192e-44ec-9c34-9535ff3bca80" style="width: 60%;"></img>
<br>

## 🗣️ 프로젝트 소개
**간단한 압축 파일 확장자 변환 도구**  
이 프로젝트는 최대 50MB 크기의 압축 파일 확장자를 쉽게 변환할 수 있는 도구입니다. 사용자는 .zip, .7z, .tar 등 다양한 파일 형식을 간단하게 변환할 수 있습니다.

이 프로젝트는 개인 프로젝트로, 개발 진행 속도가 느릴 수 있습니다.

## 📓 참고 사항:
- 비밀번호가 설정된 파일은 완전히 변환되지 않습니다. 대신 빈 아카이브 파일만 생성됩니다.
- 이 도구는 간단함과 편리함에 중점을 둔 소형 및 중형 크기의 압축 파일 변환에 최적화되어 있습니다.
- 복잡한 도구를 사용하지 않고 빠르고 간단한 변환이 필요한 사용자에게 유용한 유틸리티가 될 수 있습니다.

프로젝트 개선을 위해 자유롭게 기여하거나 이슈를 제보해 주세요!

## 📂 주요 기능
### 백엔드
- 파일 업로드 및 저장
- CLI를 사용한 파일 압축 및 변환 처리
- BullMQ를 활용한 비동기 작업 처리
- 결과 파일 다운로드

### 프론트엔드
- 사용자가 파일을 업로드하고 변환 작업을 요청할 수 있는 인터페이스 제공
- RESTful API
- 작업 상태 표시 (예: 진행 중, 완료)
- 다운로드 링크 제공

# 🚀 BullMQ를 활용한 성능 최적화

## 📌 도전 과제
여러 개의 파일 변환 작업을 처리할 때, 파일 수에 비례하여 처리 시간이 증가하며 심각한 성능 문제가 발생했습니다. 이로 인해 확장성과 효율성을 보장하는 데 큰 어려움을 겪었습니다.

---

## ✅ 해결 방법
이 문제를 해결하기 위해 **BullMQ**를 도입하여 **비동기 작업 큐**를 관리했습니다. 주요 개선 사항은 다음과 같습니다:
- **작업 병렬 처리**를 통해 처리 시간 단축
- **리소스 활용 최적화**로 확장성 강화
- 기존 워크플로우와의 원활한 통합으로 시스템 성능 향상

---

## 📊 성능 비교

| 항목                    | BullMQ 적용 전      | BullMQ 적용 후       | 개선율       |
|-------------------------|---------------------|---------------------|-------------|
| **처리 시간**           | 3:27.262 (m:ss.mmm) | 1:25.686 (m:ss.mmm) | ~60% Faster |

### **상세 결과**

- **BullMQ 적용 전**  
   `7z 압축 완료: 3:27.262 (m:ss.mmm)`
   <br>
   ![BullMQ 적용 전](https://github.com/user-attachments/assets/f3f64602-c760-4984-9e4c-997ee0e2c750)

- **BullMQ 적용 후**  
   `작업 완료: 1:25.686 (m:ss.mmm)`
   <br>
   ![BullMQ 적용 후](https://github.com/user-attachments/assets/613644ce-c0ac-493b-ad46-5a3544551610)

---

## 🌟 결과
- **60%의 처리 시간 단축**: BullMQ를 도입하여 속도와 시스템 확장성을 크게 향상시켰습니다.
- **확장성과 효율성 강화**: 더 많은 작업 부하를 원활히 처리할 수 있어 사용자 만족도와 운영 성능이 개선되었습니다.

---

## 🛠️ 기술 스택

| **Category**   | **Technology**                                                                 |
|----------------|--------------------------------------------------------------------------------|
| **Backend**    | ![Nest.js](https://img.shields.io/badge/Nest.js-E0234E?style=flat&logo=nestjs&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![BullMQ](https://img.shields.io/badge/BullMQ-E02222?style=flat) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) ![TypeORM](https://img.shields.io/badge/TypeORM-FEFEFE?style=flat&logo=typeorm&logoColor=orange) |
| **Frontend**   | ![React.js](https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)                                           |

---

## 프로젝트 아키텍처

[아키텍처 다이어그램 또는 설명 추가 필요]

---

## 설정 및 시작 방법
```bash
# 1. 리포지토리 클론
git clone https://github.com/username/project-name.git

# 2. 의존성 설치
cd project-name
npm install

# 3. Redis 실행 (BullMQ 필요)
redis-server

# 4. 서버 실행
npm start
```



---------------



# Free Archive File Extension Converter


## 🗣️ About this project
Easy Archive File Extension Converter This project is a tool for easily converting archive file extensions, supporting archive files of up to 50MB. It allows users to change file formats such as .zip, .7z, .tar, and more with ease.

This project is a personal project, so development progress may be slow.

## 📓 Please note:
 Files with passwords will not be fully converted. Instead, only an empty archive will be produced. 
 The converter is designed for small to medium-sized archive files, with a focus on simplicity and convenience. 

 This project can be a handy utility for anyone who needs quick and simple archive conversions without diving into complex tools.

 Feel free to contribute or report any issues to help improve this tool!

## 📂 Key Feature
 ### Backend
   - File upload and storage
   - File compression and conversion processing using CLI
   - Asynchronous task processing with BullMQ
   - Result file download

 ### Frontend 
   - Interface for users to upload files and request conversion tasks
   - Restful API 
   - Display of task status (e.g., in progress, completed)
   - Download link provision

# 🚀 Performance Optimization with BullMQ

## 📌 Challenge
When handling multiple file conversions, significant performance issues arose as processing times increased proportionally with the number of files. This bottleneck became a critical challenge in ensuring scalability and efficiency.

---

## ✅ Solution
To overcome this, **BullMQ** was introduced to manage **asynchronous task queues**. Key improvements achieved:
- **Parallelized task execution** to reduce processing times.
- **Optimized resource utilization** for enhanced scalability.
- Seamless integration with existing workflows to improve overall system performance.

---

## 📊 Performance Comparison

| Metric                  | Before BullMQ       | After BullMQ        | Improvement |
|-------------------------|---------------------|---------------------|-------------|
| **Processing Time**     | 3:27.262 (m:ss.mmm) | 1:25.686 (m:ss.mmm) | ~60% Faster |

### **Detailed Results**

- **Before BullMQ**  
   `7z compression completed in 3:27.262 (m:ss.mmm)`
   <br>
   ![Before BullMQ](https://github.com/user-attachments/assets/f3f64602-c760-4984-9e4c-997ee0e2c750)

- **After BullMQ**  
   `Job completed: 1:25.686 (m:ss.mmm)`
   <br>
   ![After BullMQ](https://github.com/user-attachments/assets/613644ce-c0ac-493b-ad46-5a3544551610)

---

## 🌟 Outcome
- **60% Reduction in Processing Time**: By implementing BullMQ, we significantly improved speed and system scalability.  
- **Scalability and Efficiency**: This optimization allowed the system to handle larger workloads seamlessly, enhancing user satisfaction and operational performance.

---

## 🛠️ Skill stack

| **Category**   | **Technology**                                                                 |
|----------------|--------------------------------------------------------------------------------|
| **Backend**    | ![Nest.js](https://img.shields.io/badge/Nest.js-E0234E?style=flat&logo=nestjs&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![BullMQ](https://img.shields.io/badge/BullMQ-E02222?style=flat) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) ![TypeORM](https://img.shields.io/badge/TypeORM-FEFEFE?style=flat&logo=typeorm&logoColor=orange) |
| **Frontend**   | ![React.js](https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)                                           |


---

## Project Architecture
 


## Setup && How to start
 ```
 # 1. Repository Clone
git clone https://github.com/username/project-name.git

# 2. Dependencies Install 
cd project-name
npm install

# 3. Redis (Bullmq required)
redis-server

# 4. Server Start
npm start
```
