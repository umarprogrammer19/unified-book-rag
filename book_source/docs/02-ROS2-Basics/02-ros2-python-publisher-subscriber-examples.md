# Chapter 2: ROS 2 Fundamentals - Python Publisher and Subscriber Examples

This section dives into practical examples of creating ROS 2 nodes using Python. You'll learn to implement both a publisher and a subscriber, demonstrating the fundamental publish-subscribe communication model. These hands-on examples are crucial for building your first robotic applications.

## 2. Python Publisher Example: "Hello World"

Let's create a simple ROS 2 node in Python that publishes a "Hello World" message to a topic. This example demonstrates how to set up a basic publisher node.

First, ensure you have ROS 2 Humble or Iron installed and sourced (`source /opt/ros/humble/setup.bash`).

**File:** `src/my_robot_pkg/my_robot_pkg/hello_publisher.py`

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloWorldPublisher(Node):
    def __init__(self):
        # Initialize the node with a unique name
        super().__init__('hello_world_publisher_node')
        # Create a publisher that will send String messages to 'hello_topic'
        # The queue size (10) determines how many messages to buffer if subscribers are slow
        self.publisher_ = self.create_publisher(String, 'hello_topic', 10)

        # Set a timer to call the timer_callback function every 0.5 seconds
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.message_counter = 0 # Counter for messages

    def timer_callback(self):
        # Create a new String message object
        msg = String()
        msg.data = f'Hello World from ROS 2: {self.message_counter}'
        # Publish the message to the topic
        self.publisher_.publish(msg)
        # Log the published message to the console
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.message_counter += 1

def main(args=None):
    # Initialize the ROS 2 Python client library
    rclpy.init(args=args)
    # Create an instance of our publisher node
    hello_publisher_node = HelloWorldPublisher()
    # Spin the node, allowing it to process callbacks (like our timer_callback)
    # This keeps the node alive until Ctrl+C is pressed
    rclpy.spin(hello_publisher_node)
    # Destroy the node cleanly once rclpy.spin() returns
    hello_publisher_node.destroy_node()
    # Shut down the ROS 2 Python client library
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

To run this node, you would typically place it within a ROS 2 package, configure your `setup.py` (or `CMakeLists.txt` for C++) to make it an executable, build the package, and then execute it using `ros2 run my_robot_pkg hello_publisher`. You can monitor the topic using `ros2 topic echo /hello_topic`.

## 3. Python Subscriber Example: Listening to "Hello World"

Now, let's create a corresponding subscriber node that listens to the `hello_topic` and prints the messages it receives.

**File:** `src/my_robot_pkg/my_robot_pkg/hello_subscriber.py`

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloWorldSubscriber(Node):
    def __init__(self):
        # Initialize the node with a unique name
        super().__init__('hello_world_subscriber_node')
        # Create a subscriber that will listen to String messages on 'hello_topic'
        # The callback function will be called whenever a new message arrives
        self.subscription = self.create_subscription(
            String,           # Message type
            'hello_topic',    # Topic name
            self.listener_callback, # Callback function
            10                # Queue size
        )
        self.get_logger().info('Subscriber node started, waiting for messages...')

    def listener_callback(self, msg):
        # This function is called every time a message is received on 'hello_topic'
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    hello_subscriber_node = HelloWorldSubscriber()
    rclpy.spin(hello_subscriber_node)
    # Destroy the node cleanly
    hello_subscriber_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

To run this subscriber node (after making it an executable in your ROS 2 package): `ros2 run my_robot_pkg hello_subscriber`. You should see it printing the "Hello World" messages published by the `hello_publisher`.

### Project: Simple Echo Bot

Create a new ROS 2 package. Implement a `talker` node that publishes String messages to a topic `/chatter`. Then, implement a `listener` node that subscribes to `/chatter` and prints the received messages. Finally, create a third node, an `echo_bot` that subscribes to `/chatter`, modifies the message (e.g., adds " - ECHO"), and publishes it to a new topic `/chatter_echo`. Run all three nodes simultaneously and observe the communication flow using `ros2 topic echo`.
