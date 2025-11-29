# Chapter 1: Building Your Physical AI Lab - Lab Options and Summary

Building a Physical AI lab requires a strategic choice between a physical **On-Premise Lab at Home** (High Capital Expenditure - CapEx) or a **Cloud-Native Lab** (High Operational Expenditure - OpEx). This section will help you understand the trade-offs and provide a summary of the ideal lab architecture for this course.

## 3. On-Premise vs. Cloud Labs: The "Ether" Lab Alternative

### On-Premise Lab (High CapEx: Your Digital Twin Workstation + Edge Kit)

This option involves purchasing all hardware upfront. While more expensive initially, it provides complete control, zero latency for physical robot control, and no recurring hourly costs for computation. It is ideal for those who prefer dedicated local resources and frequent physical interaction with their robots.

### The "Ether" Lab (Cloud-Native: High OpEx)

**Best for:** Rapid deployment, or students with less powerful local machines.

*   **Cloud Workstations (AWS/Azure)**
    *   Instead of buying a physical PC, you rent GPU-accelerated cloud instances.
    *   **Instance Type:** Look for instances like AWS g5.2xlarge (A10G GPU, 24GB VRAM) or g6e.xlarge. These provide the computational power needed for Isaac Sim and AI model training.
    *   **Cost Calculation (Example for AWS g5.2xlarge):**
        *   Instance Cost: ~$1.50/hour (using a mix of spot and on-demand instances).
        *   Typical Usage: 10 hours/week × 12 weeks = 120 hours.
        *   Storage (EBS volumes for saving environments): ~$25/quarter.
        *   **Total Estimated Cloud Bill: ~$205 per quarter.**

*   **Local "Bridge" Hardware (Still Required!)**
    *   You cannot entirely eliminate physical hardware for "Physical AI." Even with a cloud lab, you still need:
        *   **Edge AI Kits:** The Jetson Kit is essential for the physical deployment phase and understanding real-world resource constraints. (Approx. $700 one-time purchase).
        *   **Physical Robot (Optional, for advanced capstone):** You'll still need access to a physical robot for final demonstrations and real-world deployment. (e.g., Unitree Go2 Standard, Approx. $3,000).

*   **The Latency Trap (Hidden Cost of Cloud-Native)**
    *   Simulating in the cloud works well, but controlling a *real* robot directly from a cloud instance introduces dangerous latency.
    *   **Solution:** Students typically train their AI models in the cloud, download the trained model (weights), and then flash these weights onto their local Jetson kit for real-time physical robot control. This hybrid approach mitigates latency issues and provides a practical understanding of deployment strategies.

### Control & Decision Making: Choosing Your Lab Setup

Consider the following when deciding on your lab setup:

*   **Budget:** Upfront cost for on-premise vs. recurring costs for cloud.
*   **Accessibility:** Immediate access to hardware vs. on-demand cloud resources.
*   **Latency Requirements:** Critical for real-time robot control in physical environments.
*   **Learning Objectives:** Both setups offer valuable learning experiences, but the hybrid approach (cloud for heavy training, local edge for deployment) is often the most balanced.

## 4. Summary of Your Ideal Physical AI Lab Architecture

To successfully navigate this course, your personal Physical AI lab infrastructure will ideally combine these components, often in a hybrid fashion:

| Component       | Hardware                     | Function                                                     |
| :-------------- | :--------------------------- | :----------------------------------------------------------- |
| **Sim Rig**     | PC with RTX 4080+ & Ubuntu   | Runs Isaac Sim, Gazebo, Unity, and trains LLM/VLA models.    |
| **Edge Brain**  | Jetson Orin Nano             | Runs the AI "Inference" stack; students deploy their code here. |
| **Sensors**     | RealSense Camera + Lidar     | Connected to the Jetson to feed real-world data to the AI.   |
| **Actuator**    | Unitree Go2 or G1 (Shared)   | Receives motor commands from the Jetson (for physical robot interaction, if applicable). |

This robust and flexible setup will provide you with the environment needed to explore, simulate, and deploy Physical AI solutions effectively, empowering you to choose your path wisely based on your budget and learning preferences.