# Chapter 2: ROS 2 Fundamentals - Building Blocks of Robotics

ROS 2 (Robot Operating System 2) provides a robust framework for developing robot applications. It offers a structured way for different components of a robot system to communicate and work together. This chapter will introduce you to the core concepts of ROS 2: Nodes, Topics, Services, and how to use Launch files to manage your robotic applications.

## 1. ROS 2 Core Concepts: Nodes, Topics, and Services

### Nodes: The Units of Computation

In ROS 2, a **Node** is the smallest unit of computation. Think of a node as an executable program designed to perform a specific task within the robot's overall system. For example, you might have one node for controlling a motor, another for reading sensor data, and a third for processing camera images. By breaking down complex robot functionalities into smaller, specialized nodes, ROS 2 promotes modularity, reusability, and easier debugging.

### Topics: Asynchronous Data Streams

**Topics** are the primary mechanism for nodes to exchange data asynchronously and continuously. This is a publish-subscribe communication model:

*   A node can **publish** messages to a topic.
*   Other nodes can **subscribe** to that same topic to receive those messages.

This one-to-many communication is ideal for continuous data streams, such as sensor readings (e.g., LiDAR scans, camera feeds, IMU data) or actuator commands. When a publisher sends a message to a topic, all nodes subscribed to that topic will receive a copy of the message.

### Services: Synchronous Request-Reply Interactions

**Services** provide a synchronous request-reply communication model between nodes. Unlike topics, which are continuous streams, services are used for one-time interactions where a client node sends a request and expects a response from a service server node.

*   A **client node** sends a request to a service server.
*   A **service server node** processes the request and sends back a response.

This one-to-one communication is suitable for tasks that require a direct action and a definitive result, such as asking a robot to perform a specific manipulation task and waiting for confirmation, or querying a parameter.

## 2. "Hello World" Node in Python (Publisher Example)

Let's create a simple ROS 2 node in Python that publishes a "Hello World" message to a topic. This example demonstrates how to set up a basic publisher node.

First, ensure you have ROS 2 Humble or Iron installed and sourced.

Create a new Python file, e.g., `hello_publisher.py`:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloWorldPublisher(Node):
    def __init__(self):
        # Initialize the node with the name 'hello_world_node'
        super().__init__('hello_world_node')
        # Create a publisher that will publish String messages to 'hello_topic' with a queue size of 10
        self.publisher_ = self.create_publisher(String, 'hello_topic', 10)

        # Set a timer to call the timer_callback function every 0.5 seconds
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0 # Counter for messages

    def timer_callback(self):
        # Create a String message
        msg = String()
        msg.data = f'Hello World: {self.i}'
        # Publish the message to the topic
        self.publisher_.publish(msg)
        # Log the published message to the console
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    # Initialize the ROS 2 Python client library
    rclpy.init(args=args)
    # Create an instance of our publisher node
    hello_publisher_node = HelloWorldPublisher()
    # Spin the node, allowing it to process callbacks (like our timer_callback)
    rclpy.spin(hello_publisher_node)
    # Destroy the node once rclpy.spin() returns (e.g., Ctrl+C is pressed)
    hello_publisher_node.destroy_node()
    # Shut down the ROS 2 Python client library
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

To run this node, you would typically place it within a ROS 2 package, build the package, and then execute it.

## 3. Launch Files: Orchestrating Your Robot System

As your robotic system grows, you'll have many nodes, each with specific configurations. Manually starting and configuring each node can become cumbersome and error-prone. This is where **Launch files** come in.

Launch files are scripts (often written in Python or XML) that allow you to:

*   **Start multiple nodes simultaneously:** Define a collection of nodes to run as a single system.
*   **Configure node parameters:** Pass arguments and parameters to your nodes at startup.
*   **Remap topic/service names:** Change the names of topics or services without modifying node code.
*   **Include other launch files:** Create modular launch configurations.

Launch files automate the process of bringing up a complex ROS 2 system, ensuring consistency and making development and deployment much more efficient. For example, a single launch file could start all the nodes required for a robot's navigation stack: a LiDAR driver, a mapping algorithm, and a path planner.
