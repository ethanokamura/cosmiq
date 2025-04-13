# Networking Basics

Introduction to basic networking techniques

---

When we send data over the network it is broken down into packets.

- Packets contain binary data.

## Hardware

Ethernet allows physical connection to the network using an electrical current. Wifi allows wireless connections. Fiber Optic cables are cables using glass fibers to move data with light.

A router connects lots of different devices together and helps route network traffic.

- Uses network protocols to know where to send the packet

To send packets to a different network the router sends the packets from our network to the ISP network. Using networking protocols, it can figure out where the recipient's computer is

The Network Stack: A set of hardware or software that provides the infrastructure for a computer. Essentially the network stack is all the components that make up computer networking. To debug the stack, you'll likely work your way up from the user's to the source.

---

## TCP/IP

Network protocols are like a set of rules for how we transfer data in a network.

The rules ensure that packets are:

- routed efficiently
- aren't corrupted
- secure
- sent to the right machine
- named appropriately

Transmission Control Protocol (TCP) handles reliable delivery from one network to another.

Internet Protocol (IP) is responsible for delivering our packets to the right computers. It helps us route information

---

## The Web

URL -&gt; Uniform Resource Locator is the web address

Domain name == website name

When domain names are registered to ICANN (Internet Corporation for Assigned Names and Numbers).

DNS or Domain Name System acts like an internet directory. It maps the IP address with the domain name.

If you can access a website by IP, but not the domain name, it likely has an issue with the DNS configuration the network uses.

IPV4 consists of 32 bits separated into four groups such as 73.55.242.3

NAT: Network Address Translation lets organizations use one public IP address and many private IP addresses within the network. This lets companies use a single ip address instead of possibly hundreds.

- NAT is like the receptionist

---

## Impact

Globalization is the movement that lets governments, businesses, and organizations communicate and integrate together on an international scale.