# Chapter 2: ROS 2 Fundamentals - Core Concepts

ROS 2 (Robot Operating System 2) provides a robust framework for developing robot applications. It offers a structured way for different components of a robot system to communicate and work together. This section will introduce you to the core concepts of ROS 2: Nodes, Topics, and Services, which are the fundamental building blocks of any ROS 2 application.

## 1. ROS 2 Core Concepts: Nodes, Topics, and Services

### Nodes: The Units of Computation

In ROS 2, a **Node** is the smallest unit of computation. Think of a node as an executable program designed to perform a specific task within the robot's overall system. For example, you might have:

*   One node for controlling a motor (e.g., `motor_controller_node`).
*   Another node for reading sensor data (e.g., `lidar_sensor_node`).
*   A third node for processing camera images (e.g., `image_processor_node`).

By breaking down complex robot functionalities into smaller, specialized nodes, ROS 2 promotes modularity, reusability, and easier debugging. Each node can be developed, tested, and run independently, contributing to a robust and scalable robotic system.

**Practice: Identifying Nodes in a Robot System**

Consider a mobile robot with a camera and a differential drive base. List at least five potential nodes that would be part of its ROS 2 system, and briefly describe each node's responsibility.

### Topics: Asynchronous Data Streams (Publish-Subscribe)

**Topics** are the primary mechanism for nodes to exchange data asynchronously and continuously. This is a publish-subscribe communication model, ideal for continuous data streams:

*   A node can **publish** messages to a topic (e.g., `lidar_sensor_node` publishes `sensor_msgs/LaserScan` messages to `/scan` topic).
*   Other nodes can **subscribe** to that same topic to receive those messages (e.g., a `navigation_node` subscribes to `/scan` to get laser data).

This one-to-many communication is excellent for real-time information flow, such as:

*   Sensor readings (LiDAR scans, camera feeds, IMU data).
*   Actuator commands (velocity commands to motors).
*   Robot state updates (odometry, joint states).

When a publisher sends a message to a topic, all nodes subscribed to that topic will receive a copy of the message. This decouples data producers from consumers, allowing flexible system design.

**Example: A Simple Publisher-Subscriber Flow**

1.  A `camer-node` captures an image.
2.  It publishes the image data to the `/camera/image_raw` topic.
3.  An `object_detection_node` subscribes to `/camera/image_raw` to receive the image.
4.  The `object_detection_node` processes the image and publishes detected object bounding boxes to `/object_detections` topic.

### Services: Synchronous Request-Reply Interactions (Client-Server)

**Services** provide a synchronous request-reply communication model between nodes. Unlike topics, which are continuous streams, services are used for one-time interactions where a client node sends a request and expects a response from a service server node.

*   A **client node** sends a request to a service server (e.g., a `user_interface_node` requests a specific robot action).
*   A **service server node** processes the request and sends back a response (e.g., a `manipulation_server_node` performs a grasping task and returns a success/failure status).

This one-to-one communication is suitable for tasks that require a direct action and a definitive result, such as:

*   Asking a robot to perform a specific manipulation task and waiting for confirmation.
*   Querying a parameter or a specific piece of information from another node.
*   Triggering a one-shot operation (e.g., `reset_odometry`).

**Example: Robot Gripper Service**

1.  A `high_level_planner_node` acts as a client.
2.  It calls a service on `gripper_control_node` named `/gripper_control/grasp_object` with a request message containing object details.
3.  The `gripper_control_node` (service server) executes the grasping motion.
4.  It then sends a response back to the `high_level_planner_node` indicating whether the grasp was successful.

**Project Idea: Basic Communication Design**

Imagine you are designing a ROS 2 system for a robot arm that needs to pick and place objects. Outline how you would use a combination of Nodes, Topics, and Services to achieve the following:

*   Continuously publish the current joint angles of the robot arm.
*   Send a command to the arm to move to a specific joint configuration.
*   Request the arm to grasp an object, and receive a confirmation once the grasp is complete.

Specify the node names, topic names (and message types), and service names (and request/response types) you would use.