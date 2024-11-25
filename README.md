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
