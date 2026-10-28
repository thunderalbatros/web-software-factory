# 📚 Libro Completo: dokumen.pub google cloud architect handbook designing highly available and resilient architectures on google cloud

**Alcance:** Fuente bibliográfica completa sobre Web Software Factory, UI/UX, Architecture & Interactive Systems (dokumen.pub google cloud architect handbook designing highly available and resilient architectures on google cloud — Technical Author). Aplicable a la Web Software Factory. NO sustituye las reglas inmutables en `CANON_*`.

> **Autor:** Technical Author  
> **Dominio:** Web Software Factory, UI/UX, Architecture & Interactive Systems  
> **Archivo Fuente:** `dokumen.pub_google-cloud-architect-handbook-designing-highly-available-and-resilient-architectures-on-google-cloud.pdf`  
> **Páginas Originales:** 438 (100% Ingerido, Cero Truncamiento)  
> **Secciones Técnicas Extraídas:** 112 (Entropía Técnica Media: 0.466)  
> **Fecha de Ingesta:** 2026-10-27  

---

## Sección 1: Core Concepts & Foundations [Entropy: 0.25]

Google Cloud
Architect
Handbook
Designing highly available
and resilient
architectures on Google
Cloud
Ajay Kumar

www.bpbonline.com

First Edition 2025
Copyright © BPB Publications, India
ISBN: 978-93-65892-260
All Rights Reserved. No part of this publication may be reproduced,
distributed or transmitted in any form or by any means or stored in a
database or retrieval system, without the prior written permission of the
publisher with the exception to the program listings which may be entered,
stored and executed in a computer system, but they can not be reproduced
by the means of publication, photocopy, recording, or by any electronic and
mechanical means.
LIMITS OF LIABILITY AND DISCLAIMER OF WARRANTY
The information contained in this book is true to correct and the best of
author’s and publisher’s knowledge. The author has made every effort to
ensure the accuracy of these publications, but publisher cannot be held
responsible for any loss or damage arising from any information in this
book.
All trademarks referred to in the book are acknowledged as properties of
their respective owners but BPB Publications cannot guarantee the accuracy
of this information.

www.bpbonline.com

Dedicated to
My mom, wife and daughters

About the Author
Ajay Kumar is an experienced Data & AI leader with over 17 years
in the tech industry, driving innovation and business transformation
through the power of data and technology. His career has spanned
influential roles at leading companies like Google, Hortonworks,
and Cloudera, where he honed his expertise in cloud computing, big
data, and artificial intelligence.
Ajay is deeply passionate about democratizing access to technology
and fostering the next generation of innovators. This passion led
him to co-found the AI and Robotics Academy, an initiative that
empowers young children with essential STEM skills through
engaging programs in coding and robotics. He firmly believes in
equipping future generations with the tools and knowledge to thrive
in an increasingly technology-driven world.
A strong advocate for open-source technology, Ajay has made
significant contributions to projects like Hadoop(HDFS, YARN) and
Ozone, showcasing his commitment to community-driven
innovation within the big data ecosystem. His extensive experience
and deep understanding of cloud technologies make him a
recognized thought leader in the field.

About the Reviewer
Vaibhav Ambike is a certified cloud professional specializing in
Google Cloud Platform (GCP). Proven experience architecting,
deploying, and managing solutions on GCP, with additional
experience in multi-cloud environments encompassing AWS and
Azure. Currently he is working in Publicis Sapient as a Senior
DevOps Engineer. Throughout his professional journey, he worked
with large banking clients, FinTech industries for cloud migration
and setting up Infrastructure projects. He has vast experience in
DevOps Tools like Terraform(IAC), Jenkins, Docker, Kubernetes etc.
He is an active LinkedIn professional and loves to connect with like
minded people and do something for the community & help people
to grow in their career.

Acknowledgement
This book would not have been possible without the incredible
support and encouragement of many people.
First and foremost, I want to express my deepest gratitude to my
wife, Anshu. You are my pillar of strength and support, my constant
source of motivation, and the wind beneath my wings. Thank you
for believing in me, for pushing me to pursue my passions, and for
enabling me to bring this book to life.
To my amazing daughters, Ashi and Arya, thank you for being
bundles of joy and energy. You have taught me more about life,
psychology, and philosophy than any book ever could. Your love
and laughter fill my days with meaning.
To my mom, Asha, thank you for your unwavering love, care, and
support throughout my life. You instilled in me the values and
determination that have guided me to this point and to my sister,
Jyoti, thank you for always being there for me.
I am incredibly grateful to my awesome colleagues and friends,
Ryan McDowell, Nitin Bandagula, James, Pardeep and Hadrian.
Special thanks to Ryan for his constant support and encouragement.
Your belief in my abilities has been invaluable. Nitin Bandagula,
thank you for your continuous guidance, support, and enablement.
Your mentorship has been instrumental in my growth. James,
Pardeep and Hadrian, thank you for being such wonderful
companions on this journey. Your generous reviews and insightful
feedback have significantly shaped this book.
Finally, I want to thank BPB Publications for their guidance and
expertise in bringing this book to fruition. Your support and
assistance have been invaluable throughout the publishing process.
To everyone who has played a part in making this book a reality,
thank you from the bottom of my heart.

Preface
Today public cloud is everywhere. It is the invisible force powering
your favorite apps, connecting all of us with loved ones, and driving
innovation across industries. Google Cloud Platform (GCP), with its
cutting-edge technology and global reach, is among leaders of this
revolution.
Let us face it, diving into the cloud can be overwhelming. With
numerous services and acronyms, it is easy to get lost in the
complexity. That is where this book comes in.
Google Cloud Architect Handbook is your compass and map,
guiding you through the exciting world of GCP. The book is written
in simple, easy to understand language. I focused specially on
cutting through the jargon and focus on the practical skills you need
to design, build, and manage real-world cloud solutions. No more
dry lectures or abstract theories, we will dive straight into the
hands-on knowledge that empowers you to become a confident
cloud architect.
Think of this book as your trusted mentor, sharing real-world stories
and hard-won lessons from experienced cloud architects. We will
explore the core building blocks of GCP, from virtual machines and
containers to databases and networking, showing you how to
architect applications that can handle anything, from sudden spikes
in traffic to unexpected disruptions.
We will unpack complex topics like Serverless computing, Big data
analytics, and AI platforms like Vertex AI, making them accessible
and engaging. You will learn how to build solutions that are not just
powerful, but also secure, resilient, and cost-effective.
Whether you are a developer with a brilliant app idea, an IT
professional seeking to expand your horizons, or a student with
dreams of conquering the cloud, this handbook will equip you with
the knowledge and confidence to succeed. So, grab your favorite

---

## Sección 2: Chapter 1: Introduction to Google Cloud Platform- In this [Entropy: 0.265]

beverage, get comfortable, and let us embark on this cloud
adventure together!
chapter, we will provide an overview of Cloud Computing in
general. We will also cover Google Cloud Platform (GCP) and its
key features, explaining why it is a leading cloud computing
platform. We will explore the benefits of using GCP for
organizations and individuals, and discuss the role of a Google
Cloud Architect.

---

## Sección 3: Chapter 2: Getting Started with GCP- In this chapter, readers will [Entropy: 0.25]

learn the foundational aspects of GCP. It covers the process of
setting up a GCP account, navigating the GCP console, and
managing projects. Readers will also explore the essential tools and
resources available in GCP to facilitate their cloud journey.

---

## Sección 4: Chapter 3: Compute and Storage- This chapter focuses on [Entropy: 0.25]

compute and storage options available in GCP. It covers services
like GCE, GKE, Google Cloud Storage, Cloud SQL, Cloud Spanner,
Cloud Bigtable, and provides insights into choosing the right storage
solution for different use cases.

---

## Sección 5: Chapter 4: Data and Analytics- This chapter delves into GCP's [Entropy: 0.25]

data and analytics services, enabling readers to leverage data for
insights and decision-making. It covers BigQuery, Dataflow,
Dataproc, and other tools for data ingestion, processing,
transformation, and analysis.

---

## Sección 6: Chapter 5: Machine Learning and AI Services- This chapter [Entropy: 0.25]

explores GCP's machine learning and AI services, enabling readers
to leverage these tools for building intelligent applications. It covers
topics such as Cloud AI Platform, AutoML, TensorFlow, and AI
building blocks.

---

## Sección 7: Chapter 6: Networking in GCP- This chapter covers networking [Entropy: 0.25]

concepts and services in GCP. It focuses on topics such as Virtual
Private Cloud (VPC) networks, subnets, IP addressing, firewall rules,
and load balancing. It also explores advanced networking features
like Virtual Private Network (VPN) and Cloud Interconnect.

---

## Sección 8: Chapter 7: Identity and Access Management- This chapter [Entropy: 0.25]

explores the concepts of identity and access management in GCP. It
covers topics such as IAM roles, permissions, service accounts, and

best practices for managing access control and user identities.

---

## Sección 9: Chapter 8: Security and Compliance- This chapter focuses on [Entropy: 0.25]

security features and best practices in GCP. It covers topics such as
network security, data encryption, identity protection, auditing,
compliance with industry standards, and regulatory requirements.

---

## Sección 10: Chapter 9: DevOps and Site Reliability Engineering- This [Entropy: 0.25]

chapter covers techniques and tools for deploying and managing
applications in GCP. It includes topics such as IaC, Deployment
manager, Workflows, and Cloud Functions.

---

## Sección 11: Chapter 10: High Availability and Disaster Recovery- This [Entropy: 0.25]

chapter explores strategies for designing and implementing high
availability and disaster recovery solutions in GCP. It covers topics
such as regions, zones, load balancing, auto-scaling, backup
strategies, and data replication techniques.

---

## Sección 12: Chapter 11: Logging, Monitoring and Troubleshooting- This [Entropy: 0.25]

chapter covers monitoring, logging, and troubleshooting techniques
in GCP. It includes topics such as Cloud Monitoring, Cloud Logging,
Cloud Trace, and provides guidance on setting up monitoring alerts,
analyzing logs, and resolving issues.

---

## Sección 13: Chapter 12: Hybrid and Multi Cloud Strategies- This chapter [Entropy: 0.25]

explores hybrid and multi-cloud strategies using GCP. It covers
topics such as Cloud Interconnect, Anthos, and managing multicloud environments, enabling readers to integrate on-premises
infrastructure with GCP and leverage multiple cloud providers.

---

## Sección 14: Chapter 13: Exam Preparation and Tips- This chapter provides [Entropy: 0.28]

guidance and tips for preparing for the GCP Professional Cloud
Architect certification exam. It covers mock tests, exam objectives,
study resources, practice exercises, and strategies for exam success.

Code Bundle and Coloured Images
Please follow the link to download the
Code Bundle and the Coloured Images of the book:
https://rebrand.ly/7jmtacd
The code bundle for the book is also hosted on GitHub at https://
github.com/bpbpublications/Google-Cloud-Architect-
Handbook. In case there’s an update to the code, it will be updated
on the existing GitHub repository.
We have code bundles from our rich catalogue of books and videos
available at https://github.com/bpbpublications. Check them
out!
Errata
We take immense pride in our work at BPB Publications and follow
best practices to ensure the accuracy of our content to provide with
an indulging reading experience to our subscribers. Our readers are
our mirrors, and we use their inputs to reflect and improve upon
human errors, if any, that may have occurred during the publishing
processes involved. To let us maintain the quality and help us reach
out to any readers who might be having difficulties due to any
unforeseen errors, please write to us at :
errata@bpbonline.com
Your support, suggestions and feedbacks are highly appreciated by
the BPB Publications’ Family.
Did you know that BPB offers eBook versions of every book published,
with PDF and ePub files available? You can upgrade to the eBook
version at www.bpbonline.com and as a print book customer, you are
entitled to a discount on the eBook copy. Get in touch with us at :

business@bpbonline.com for more details.
At www.bpbonline.com, you can also read a collection of free
technical articles, sign up for a range of free newsletters, and receive
exclusive discounts and offers on BPB books and eBooks.
Piracy
If you come across any illegal copies of our works in any form on the
internet, we would be grateful if you would provide us with the
location address or website name. Please contact us at
business@bpbonline.com with a link to the material.
If you are interested in becoming an author
If there is a topic that you have expertise in, and you are interested in
either writing or contributing to a book, please visit
www.bpbonline.com. We have worked with thousands of developers
and tech professionals, just like you, to help them share their insights
with the global tech community. You can make a general application,
apply for a specific hot topic that we are recruiting an author for, or
submit your own idea.
Reviews
Please leave a review. Once you have read and used this book, why not
leave a review on the site that you purchased it from? Potential readers
can then see and use your unbiased opinion to make purchase
decisions. We at BPB can understand what you think about our
products, and our authors can see your feedback on their book. Thank
you!
For more information about BPB, please visit www.bpbonline.com.
Join our book’s Discord space
Join the book’s Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

Table of Contents
1. Introduction to Google Cloud Platform
Introduction
Structure
Objectives
Rise of cloud computing
Deployment models of cloud computing
Cloud computing offerings
Benefits of cloud computing
Google Cloud Platform
Key concepts and terminology
Core services
Compute services
Google Compute Engine
Google Kubernetes Engine
Google App Engine
Storage
Google Cloud Storage
Persistent Disks
Google Cloud Bigtable
Cloud SQL
Cloud Spanner
Networking Services
Identity and Access Management on Google Cloud Platform
Zero Trust security
Resource management and monitoring
Resource management
Data and analytics

Machine learning and artificial learning
Global infrastructure and region management
Importance of regions and zones
Making optimal use of regions and zones
Conclusion
Multiple choice questions
Answer key
Case studies
2. Getting Started with GCP
Introduction
Structure
Objectives
Account creation and setup
GCP Console
Quotas in GCP
Folders and projects
Significance of folders & projects
Related quotas
gCloud command line interface
Resources and tools
Conclusion
Multiple choice questions
Answer key
Case studies
3. Compute and Storage
Introduction
Structure
Objectives
Google Compute Engine
Key concepts
Different types of virtual machines

Google Kubernetes Engine
Key concepts
Example with code snippet
Anthos
Key concepts for Anthos
Examples with code snippets
Key use-cases of Anthos
Cloud Storage
Key concepts
Examples with code snippet
Databases
Cloud SQL
AlloyDB
NoSQL databases
BigTable
Spanner
Datastore
Data Transfer Service
Choosing the right database
Conclusion
Multiple choice questions
Case studies
Answer key
Case studies
4. Data and Analytics
Introduction
Structure
Objectives
BigQuery
Key concepts of BigQuery
BigQuery ML
Public datasets

Translation service
Data Transfer Service
BI Engine
Key features of BigQuery
Related quotas
Best practices of BigQuery
Dataproc
Key concepts of Dataproc
Key features of Dataproc
Code snippet of Dataproc
Pricing structure
Best practices of Dataproc
Dataflow
Key concepts of Dataflow
Key features of Dataflow
Code snippet of Dataflow
Pricing structure
Related quotas
Best practices of Dataflow jobs
Dataplex
Key concepts of Dataplex
Key features of Dataplex
Pricing structure
Best practices
Related quotas
Data fusion
Key features of Data fusion
Key concepts of Data fusion
Code snippet of Data Fusion
Pricing structure
Best practices of Data fusion
Related quotas
Looker
Key concepts in Lockers

Key features of Looker
Pricing structure
Best practices of Looker
Related quotas
Multiple choice questions
Case studies
Answer key
Case studies
5. Machine Learning and AI Services
Introduction
Structure
Objectives
Vertex AI
Key concepts of Vertex AI
Key features of Vertex AI
Generative AI
Vertex AI Studio
Model garden
Popular models
Training models with your own data
Pricing structure
Best practices of Vertex AI
Summary
Document AI
Key concepts of Document AI
Key features of Document AI
Pricing structure
Related quotas
Agent Builder
Key features of Agent Builder
Conclusion
Multiple choice questions

---

## Sección 15: Chapter 13: Exam Preparation and Tips- This chapter provides [Entropy: 0.25]

Case studies
Answer key
Case studies
6. Networking in GCP
Introduction
Structure
Objectives
Key concepts of GCP
VPC networks
Introducing VPC
Importance of VPC networks
VPC peering
VPC controls
Shared VPC
Serverless VPC access
Packet mirroring
IP addresses
IPv4
IPv6
Bring Your Own IP
Firewall
Best practices of firewalls on GCP
Routes
Network services
Load balancer
Cloud load balancing
DNS
Working of Cloud DNS
Cloud CDN
Working of Cloud CDN
Cloud NAT
Working of Cloud NAT
Traffic director

Service directory
Private Service Connect
Working of a Private Service Connect
Hybrid connectivity
VPN
Interconnect
Cloud Routers
Network security
Cloud Armor
Cloud IDS
Cloud Firewall
Multiple choice questions
Case studies
Answer key
Case studies
7. Identity and Access Management
Introduction
Structure
Objectives
Introduction to Identity and Access Management
Core components
Importance of IAM
Roles and permissions
Primitive roles
Predefined roles
Custom roles
Identity and Access Management policies
Policy inheritance
Policy evaluation
IAM policy implementation
Service accounts and authentication
Introducing service accounts

Organization policies
Workload Identity Federation
Labels and tags
Best practices of GCP
Conclusion
Multiple choice questions
Case studies
Answer key
Case studies
8. Security and Compliance
Introduction
Structure
Objectives
Security in GCP
Core principles of GCP security
Network security
Virtual Private Cloud
Use case
Cloud Firewalls
Identity-Aware Proxy
Implementation and code snippets
Cloud VPN and Cloud Interconnect
Cloud VPN
Cloud interconnect
Private Google Access in GCP
Application Layer Security
Cloud Armor
Data security
Data encryption
Access control and identity management
Data resilience
Data lifecycle management

Compliance and data governance
General Data Protection Regulation
Health Insurance Portability and Accountability Act
California Consumer Privacy Act
Digital Markets Act
GCP compliance philosophy
Security monitoring and logging
Setup and configuration
Incident response and forensics
Forensic analysis in GCP
Best practices
Conclusion
Multiple choice questions
Case studies
Answer key
Case studies
9. DevOps and Site Reliability Engineering
Introduction
Structure
Objectives
DevOps
Background
Cloud Source Repositories
Continuous Integration and Delivery
Cloud Build
Setting up a basic CI/CD pipeline
Containerization
Container Registry and Artifact Registry
Deployment methods
DevOps operations leveraging GCP
Site Reliability Engineering
Role of SRE

SRE practices
SRE operations on GCP
Blameless postmortems
Fostering culture of Continuous Improvement
Conclusion
Multiple choice questions
Case studies
Answer key
Case studies
10. High Availability and Disaster Recovery
Introduction
Structure
Objectives
GCP regions and zones
Applying concepts
Implementing resilient infrastructure
Redundancy
Fault tolerance
Dependency management
Security
Monitoring and alerting
Testing and disaster recovery planning
Load balancing and autoscaling for high availability
Load balancer
Auto scaling
Maintaining peak performance
Exploring the different types of load balancers in GCP
Choosing right load balancer
Data replication and synchronization techniques
Replication for high availability and durability
Synchronization techniques
Real-time synchronization

Asynchronous replication
Tools and services for efficient data replication
Backup and disaster recovery
Backup
Creating copies for restoration
Data redundancy
OnVault backups
Disaster recovery
Cold DR
Warm DR
Hot DR
Deployment manager for DR automation
Designing a comprehensive DR strategy
Testing and validation
Simulating disaster scenarios
Designing resilient architectures in GCP
Core principles of resilient design in GCP
Redundancy and replication
Scalability and flexibility
Fault isolation and containment
Best practices for building resilient architectures in GCP
Conclusion
Multiple choice questions
Case studies
Answer key
Case studies
11. Logging, Monitoring and Troubleshooting
Introduction
Structure
Objectives
Cloud Logging
Logs like Sherlock Holmes

Log sinks
Benefits of Cloud Logging
Aggregated Logging
Key takeaways
Cloud Monitoring
Understanding Cloud Monitoring
Alerts
Uptime checks
Understanding uptime checks
Service Monitoring
Benefits of Cloud Monitoring
Cloud Tracing
Case study on Optimizing an e-commerce platform
Best practices
Conclusion
Multiple choice questions
Case studies
Answer key
Case studies
12. Hybrid and Multi Cloud Strategies
Introduction
Structure
Objectives
Introduction to hybrid and multi-cloud
Hybrid cloud
Multi-cloud
Designing hybrid and multi-cloud architectures
Case study 1: ABC Corp Healthcare's hybrid healing journey
Case study 2: XYZ Corp multi-cloud shopping spree
Security in hybrid and multi-cloud environments
Common security challenges
Automation and orchestration

Best practices
Conclusion
Multiple choice questions
Answer key
13. Exam Preparation and Tips
Introduction
Structure
Objectives
Understanding Professional Cloud Architect certification
Certification objectives
Expanding on Exam Preparation: Deepen your knowledge and
hone your skills
Study resources and material
Official resources and hands-on practice
Books, online resources, and community support
Mock tests and practice exercises
From feedback to action
Exam day strategies
Post-exam steps
Conclusion
Appendix
Multiple choice questions
Answer key
Index

---

## Sección 16: CHAPTER 1 [Entropy: 0.37]

Introduction to
Google Cloud Platform
Introduction
In this chapter, we will take a deep dive into the world of what if
you could access virtually limitless computing power, storage, and
software, all without the hassle of managing physical infrastructure.
This chapter unlocks the core concepts and transformative benefits
of this revolutionary technology. Get ready to discover how public
cloud can empower your business with increased agility, scalability,
and innovation, all while reducing costs and streamlining
operations. We will primarily focus on the Google Cloud Platform
(GCP), one of the leading cloud providers in this flourishing market,
discussing its unique features, functionality, and the value
proposition it offers to businesses globally.
Structure
Following is the structure of the chapter:
• Rise of cloud computing
• Benefits of cloud computing
• Google Cloud Platform

Objectives
By the end of this chapter, readers will have the knowledge and
understanding, to equip with the tools you need to leverage the
power of GCP, and to inspire you to harness its potential to drive
innovation and growth in your own endeavors. Stay with us as we
uncover the intricacies and advantages of public cloud computing
and the GCP.
Rise of cloud computing
We are living in the midst of a monumental technological
revolution, accelerating at a pace never witnessed before. Cuttingedge technologies are no longer a thing of the future; they have
become an integral part of our present. Among these
transformations, the rise of cloud computing marks a significant
leap forward, reshaping the way we approach IT and conduct
business. This is having a profound impact on the IT landscape, as
businesses are increasingly looking to the cloud to help them keep
up with the latest trends.
Around the late 2000s, public cloud services emerged, offering
scalable and on-demand computing resources over the internet. Fast
forward to today, they have grown into an indispensable component
of the IT landscape, bolstering businesses of all sizes and across
diverse industries.
There are a number of reasons for the growing popularity of the
cloud. First, the cloud offers businesses a high degree of flexibility.
Businesses can easily scale their cloud resources up or down as
needed, which is important for businesses that experience
fluctuations in demand.
Second, the cloud offers businesses a number of cost savings.
Businesses can avoid the upfront costs of hardware and software,
and they only pay for the resources they use. This can lead to
significant cost savings, especially for businesses that are growing
rapidly.
Third, the cloud offers businesses a high level of security. Cloud
providers have invested heavily in security, and they offer a number
of features to help businesses protect their data and other digital
assets.

According to analysis by the esteemed research firm Gartner, global
end-user expenditure on public cloud services is projected to soar to
an astounding $600 billion in 2023. This represents a remarkable
21.7% increase from the figures recorded in 2022. Even more
striking is the prediction that by 2025, approximately 85% of
organizations will have implemented a "cloud-first" approach in
their operational strategies. Looking further ahead, it is anticipated
that the worldwide expenditure on cloud services will surpass the
monumental milestone of 1 trillion USD by 2028. This trend
underscores a significant paradigm shift in business operations,
highlighting a growing dependence on cloud technologies to
enhance operational efficiency and drive innovative practices.
Among others, the primary benefit of cloud computing is that it
allows companies to avoid or minimize upfront IT infrastructure
costs. Additionally, it enables organizations to focus on their core
businesses instead of expending resources on computer
infrastructure and maintenance. Moreover, it offers the benefits of
increased efficiency, flexibility, and strategic value gain.
There are various forms of cloud computing that organizations can
choose from, including public clouds, private clouds, and hybrid
clouds. These options provide different levels of control, flexibility,
and management for organizations, making it crucial to understand
the differences and potential benefits each can offer.
Deployment models of cloud computing
Following are the deployment models of cloud computing:
• Public cloud: In a public cloud, cloud services are offered
over the internet to multiple users, and the underlying
infrastructure is owned and operated by a third-party cloud
service provider (for example, GCP, AWS, Microsoft Azure).
Public clouds are cost-effective and scalable, making them
suitable for various applications and organizations.
• Private cloud: Unlike public clouds, which are shared by
multiple organizations, a private cloud is dedicated to a single
organization and is hosted either on-premises or off-premises,
but in both cases, it is maintained for the use of one
organization. Private clouds offer enhanced security, control,
and customization, but they require more significant upfront
investment and maintenance.

• Hybrid cloud: Hybrid clouds combine elements of both public
and private clouds, allowing data and applications to be
shared between them. This approach provides the flexibility to
take advantage of the benefits of public cloud scalability while
keeping sensitive data and critical workloads within a private
environment.
Cloud computing offerings
To meet the diverse needs of businesses today, cloud computing
offers a variety of service models. The fundamental pillars of these
models are Infrastructure as a Service (IaaS), Software as a
Service (SaaS), Platform as a Service (PaaS), and the more recent
advent, serverless computing. Each has a unique role in the broader
cloud ecosystem, offering its own set of benefits and use cases. The
following is an introductory overview of each:
• Infrastructure as a Service (IaaS): IaaS is like renting a highend computer. The provider offers computing resources such
as servers, storage, networks, and operating systems. Users get
access to these resources as per their needs and pay as per
their usage. It provides a high level of flexibility and
scalability to businesses.
For example, Google Compute Engine, GCP’s IaaS offering
allows businesses to run their workloads on Google's multiregional, highly secure, and fast network. This way, even
smaller businesses can leverage Google's cutting-edge
infrastructure.
• Software as a Service (SaaS): SaaS model is like an all-youcan-eat buffet of software applications, served over the
internet. The cloud service provider hosts, manages, and
updates the software, and customers can access it from
anywhere, anytime. Whether it is an email client, a word
processor, or an analytics tool, the chances are high that there
is a SaaS offering for it.
An outstanding example of a SaaS offering is Google Workspace, a
productivity and collaboration suite that brings together
applications like Gmail, Docs, Sheets, and Slides under one
umbrella. With a SaaS model, businesses can offload software
maintenance and upgrade responsibilities to the provider, focusing
more on their core functions, as

---

## Sección 17: CHAPTER 1 [Entropy: 0.475]

follows:
• Platform as a Service (PaaS): The PaaS model offers a
holistic platform in the cloud, enabling developers to create,
test, and deploy applications without the burdensome
complexities of infrastructure management. PaaS offerings
provide an environment where the tedious aspects of software
development-setting 
up 
servers, 
configuring 
networks,
managing storage-are handled by the provider.
Google's PaaS offering, the Google App Engine, allows
developers to build and deploy applications using popular
languages like Java, Python, and Go. The highlight is that
developers can focus on writing great code, while the
underlying infrastructure and server management are taken
care of by Google.
• Serverless computing: The newest addition to the cloud
service model repertoire is serverless computing. In a
serverless model, the cloud provider manages the servers and
infrastructure, and users only need to focus on writing and
deploying the code. The beauty of serverless computing is that
it scales automatically with the application demand.
Google Cloud Run and Cloud Functions is GCP’s serverless
computing service, where developers can write single-purpose
functions that respond to cloud events without the need to manage
a server or runtime environment.
The different types of cloud offerings offer different benefits and
drawbacks. SaaS is the easiest to use, but it gives customers the
least amount of control. PaaS offers more control, but it is more
complex to use. IaaS offers the most control, but it is also the most
complex to use. Serverless computing is a good option for
developers who want to focus on their code and not on managing
servers.
The best type of cloud offering for a particular business will depend
on its specific needs. Businesses that need a simple and easy-to-use
solution should consider SaaS. Businesses that need more control
over their infrastructure should consider PaaS or IaaS. Businesses
that want to focus on their code and not on managing servers
should consider serverless computing.
Table 1.1 summarizes the different types of cloud offerings:

Type
Advantage
Considerat
IaaS
Most control over infrastructure
Most complex to use
PaaS
More control over infrastructure than
SaaS, but still easy to use
More complex to use 
SaaS
Easy to use, scalable, and cost-effective
Less control over infr
Serverless
computing
No need to manage servers, scalable,
and cost-effective
Less control over infr
than IaaS
Table 1.1: Different types of cloud offerings
Benefits of cloud computing
Cloud computing offers numerous benefits that have revolutionized
the way businesses operate and utilize IT resources. Following are
some of the key advantages of cloud computing:
• Scalability and flexibility: Cloud services provide on-demand
scalability, allowing businesses to quickly adjust resources to
meet changing demands. Whether it is handling increased
website traffic during peak periods or accommodating data
storage needs as the business expands, cloud computing
enables seamless scalability.
• Accessibility and remote work: Cloud services are accessible
from anywhere with an internet connection, enabling remote
work and collaboration. This flexibility is especially crucial
during times of travel, remote work policies, or in distributed
teams.
• Global reach: Cloud providers operate data centers in
multiple locations worldwide. This global reach allows
businesses to deploy applications and services closer to their
target audience, reducing latency and improving the user
experience.
• Reliability and high availability: Reputable cloud providers
offer robust Service Level Agreements (SLAs) that ensure
high availability and uptime for critical applications and
services. Cloud data centers are equipped with redundant
systems, backup mechanisms, and disaster recovery measures,
reducing the risk of data loss or service disruption.

• Cost efficiency: Cloud computing follows a pay-as-you-go
model, where users only pay for the resources they consume.
This eliminates the need for significant upfront capital
expenditure on hardware and infrastructure. Businesses can
scale resources up or down as needed, optimizing costs based
on actual usage.
• Security: Leading cloud providers invest heavily in security
measures and protocols to safeguard data and infrastructure.
They employ advanced encryption techniques, multi-factor
authentication, and regular security audits to protect against
cyber threats.
• Automatic updates and maintenance: Cloud providers
handle routine maintenance tasks and software updates. This
ensures that businesses are always using the latest software
versions and security patches without needing to manage
these processes themselves.
• Environmental impact: Cloud computing is generally more
energy-efficient compared to traditional on-premises data
centers. Cloud providers can optimize their data centers for
energy efficiency, reducing the overall carbon footprint
associated with IT operations.
• Disaster recovery and backup: Cloud services offer built-in
backup and disaster recovery solutions, allowing businesses to
restore data and applications quickly in case of data loss or
system failures.
• Innovation and time-to-market: With cloud computing,
businesses can experiment and innovate faster, as they have
access to a wide range of services and development tools
readily available. This shortens the time-to-market for new
products and services.
• Big data and analytics: Cloud platforms provide robust big
data and analytics services, allowing businesses to process and
analyze large volumes of data efficiently. This enables datadriven decision-making and insights extraction.
• Integration and ecosystem: Cloud providers offer extensive
integration 
capabilities, 
enabling 
seamless 
connectivity
between various cloud services. This allows businesses to
build comprehensive and interconnected solutions using
multiple cloud services.
Overall, cloud computing empowers businesses with the flexibility,

---

## Sección 18: CHAPTER 1 [Entropy: 0.475]

agility, and cost savings required to stay competitive in the digital
era. It has become a fundamental technology that enables
organizations of all sizes to leverage advanced computing resources
without the burden of managing complex infrastructure in-house.
Fun facts
• Cloud computing's roots lie in the 1960s with the idea of an
"intergalactic computer network", proposed by J.C.R. Licklider,
who was responsible for enabling the development of
Advanced Research Projects Agency Network (ARPANET) in
1969.
• Google's first public cloud offering was not GCP; it was Google
App Engine, a platform for developing and hosting web
applications in Google-managed data centers, launched in
2008.
Trivia
In the context of cloud computing, what does the "pay-as-you-go"
model refer to?
a. Paying for software licenses
b. Paying for cloud services as per usage
c. Paying for hardware and infras
d. Structure costs
e. Paying for installation and setup
Answer: b. Paying for cloud services as per usage
Google Cloud Platform
The journey of GCP began in April 2008 with the announcement of
Google App Engine, marking Google's debut in the domain of cloud
computing. It was the first cloud computing service from the
company that allowed developers to create and host web
applications in Google-managed data centers. This service became
generally available in November 2011. Since then, Google has
persistently expanded its cloud services, continually enhancing its
platform to meet the evolving needs of businesses across the globe.
Running on the same powerful infrastructure that Google uses to

drive its globally popular services such as, Google Search, Gmail,
Google Drive, and YouTube, to name a few. GCP is a veritable
powerhouse, offering a broad spectrum of capabilities. It is a
platform designed to provide businesses with the tools needed to
innovate, scale, and navigate the complexities of the digital world.
At its most fundamental, GCP offers a broad set of modular services
spanning computing, data storage, data analytics, and machine
learning. The platform is bolstered with a rich array of management
tools, ensuring seamless operations and meticulous control.
GCP's cloud service offerings can be categorized into four main
types, as follows:
• Infrastructure as a Service: IaaS allows businesses to
leverage Google's robust infrastructure resources as per their
requirements. An excellent example is Google Compute
Engine, which provides scalable virtual machines running on
Google's infrastructure.
• Platform as a Service: PaaS offerings like Google App Engine
offer a managed platform for application development and
hosting. It takes away the need for managing the underlying
infrastructure, allowing developers to focus their efforts on
writing and deploying application code.
• Software as a Service: In addition to IaaS, PaaS, and
Serverless, Google also offers SaaS applications such as Google
Workspace (formerly G Suite). These are ready-to-use
applications that run over the internet and serve various
business needs, like communication (Gmail, Google Meet),
collaboration (Docs, Sheets, Slides), and storage (Drive).
• Serverless computing: Serverless services like Dataflow,
Cloud Run & Cloud Functions offer a compute environment
where infrastructure management is entirely abstracted away.
This approach enables developers to simply write and deploy
code that responds to events, without concerning themselves
with the underlying system.
Fun fact
Google's commitment to sustainability is impressive. The company
has been carbon-neutral since 2007, and its goal is to power its data
centers with 24/7 carbon-free energy by 2030.

Trivia
Can you guess the first major product that GCP launched?
Answer: It was Google App Engine in 2008, making it one of the
first-ever Platform-as-a-Service offerings in the cloud market.
Key concepts and terminology
As we delve deeper into the realm of GCP, we must become wellacquainted with its specialized terminology and pivotal concepts.
These form the bedrock of our GCP knowledge, empowering us to
effectively harness the platform's vast potential. This chapter aims
to unravel these terms, setting the stage for your foray into the
extensive services GCP offers. Following are some key terms you be
aware of while working on GCP:
• Folder: As an aid to effective project management, GCP offers
'folders.' These enable you to organize projects and other
folders into a logical and hierarchical structure, akin to a
digital filing system. Folders offer refined access control and
settings management at various levels, greatly simplifying
administrative tasks and governance. Each folder can act as a
parent to other folders or projects, enabling a cascading
structure that may mirrors your organization's operational
hierarchy or departmental layout.
• Project: At the heart of GCP’s organizational structure lies the
'project.' Projects are central units where your cloud resources
and services are housed and managed. They are the primary
mechanism for managing access controls, billing, and
configurations, each distinctly identified by a unique ID and
name that you define. By creating multiple projects, you can
segregate and organize your cloud resources in a manner that
aligns with different facets of your business, such as by
function, team, or project phase. This organization not only
brings clarity and structure to your cloud environment but
also enhances operational efficiency and resource tracking.
• Pantheon: Google's console interface of GCP is internally
named 'Pantheon.' It's a web-based, intuitive console that
allows you to manage and monitor your GCP resources and
services seamlessly. Figure 1.1 shows Google’s pantheon UI:

Figure 1.1: GCP pantheon home page
• Resources: Resources in GCP refer to the tangible entities
spawned and managed via Google Cloud Services. Whether it's
a Compute Engine instance, a Cloud Storage bucket, a Pub/
Sub-topic, 
or 
another 
service-specific 
entity, 
each 
is
considered a resource in GCP.
• GCloud: GCloud, or the Google Cloud SDK, comprises a
powerful set of tools that enable you to interact with and
manage resources and applications hosted on Google Cloud.
GCloud lets you leverage Google Cloud services from the
comfort of your command line, enabling efficient resource
manipulation and automation of tasks.
• Cloud Shell: The Google Cloud Shell is an online development
and operations environment available anywhere with an
internet connection. It brings you a command-line interface
for managing your GCP resources without the need for local
installation of the Google Cloud SDK or other software. Figure
1.2 shows cloud shell in GCP UI:

---

## Sección 19: CHAPTER 1 [Entropy: 0.385]

Figure 1.2: Cloud shell terminal in UI
• Identity and Access Management (IAM): IAM is a robust
framework designed to ensure the proper individuals have the
appropriate access to the necessary resources in GCP. It
enables you to control 'who' (identity) has 'what' access (roles)
to 'which' resources, maintaining a secure and controlled cloud
environment.
• Regions and zones: In GCP, your resources exist in
geographically distributed locations called regions and zones.
A region is a specific geographic area where you can deploy
your resources, and each region is further split into isolated
areas known as zones.
Fun fact
Google's choice of the name 'Pantheon' for its console interface is
quite interesting. In classical architecture, a pantheon is a
monument to all the gods. Google's Pantheon, housing all its cloud
services, is indeed a kind of monument to the 'gods of cloud
computing.'
Trivia
How many regions and zones GCP has?
Answer: As of Nov 2023, GCP was spread across 39 regions and
118 zones globally. (https://cloud.google.com/about/locations)
Core services
The GCP is home to a broad array of core services, each designed to
serve a distinct purpose within this multifaceted cloud ecosystem.
As key building blocks, they enable businesses worldwide to
construct, deploy, and magnify applications, websites, and services
using the very infrastructure that empowers Google's ubiquitous
digital presence. This chapter intends to provide an introductory
exploration of these vital services and illuminate their pivotal role
in today's businesses. In the following chapters we will take a deep
dive into these services.
To thrive in today's fast-paced digital world, businesses need to be
agile, scalable, data-driven, and cost-efficient. GCP's core services
deliver on all fronts. For example, its compute engine allows

businesses to quickly adjust their computing resources to meet
changing demands, while its BigQuery service enables powerful
data analysis for informed decision-making. By offloading
infrastructure management to Google, businesses free up valuable
time and resources to focus on what matters most: delivering
exceptional value for their customers. These services also scale
effortlessly, ensuring that businesses can smoothly handle
fluctuating loads without fretting over capacity planning and
related costs.
From fledgling startups crafting their first application to large
enterprises managing intricate systems, GCP's core services furnish
the necessary tools and infrastructure to develop, deploy, and scale
applications that reach millions of users.
Trivia
1. Which service would you use if you wanted to quickly
develop and deploy an application on GCP without worrying
about managing the underlying infrastructure?
2. If your organization has decided to move towards a
microservices architecture, which GCP service would be the
most suitable to use if you want to use serverless offering?
3. If your company had to handle vast amounts of unstructured
data, which GCP service would you utilize?
4. Which GCP service would you recommend for a business that
needs to run super-fast SQL queries and perform interactive
analysis on large datasets?
Answers:
1. PaaS offerings like Google App Engine
2. Cloud run
3. GCS
4. BigQuery!
In the next section, we will discuss each of these services,
empowering you to grasp their functionalities and understand how
to effectively wield them to propel your business needs.

Compute services
GCP's compute services provide the foundation for building and
deploying a wide range of applications, websites, and services.
These offerings give developers and businesses the computing
power they need to run complex simulations, host high-traffic
websites, and power data-intensive applications. Whether your
needs are best met by Infrastructure as a Service (IaaS), like
Compute Engine for virtual machines, Platform as a Service (PaaS),
like App Engine for application deployment, or Software as a
Service (SaaS), GCP offers a comprehensive suite of solutions.
Compute services are used when an organization needs to create,
deploy, run, and scale applications. The use of these services
depends largely on the needs of the organization. Some use cases
include application hosting, data processing, data analytics,
artificial intelligence, and machine learning workloads.
Google Compute Engine
Compute Engine is an Infrastructure as a Service (IaaS) offering.
Compute Engine provides highly customizable and scalable virtual
machines. Users have a wide range of options for tailoring their
virtual machines, including choosing from various operating
systems, machine types, and networking configurations. This
scalability allows businesses to easily adjust their computing
resources to handle peak traffic, accommodate rapid growth, or
support resource-intensive applications. For example, a growing ecommerce company could use Compute Engine to host its website
and handle online transactions, ensuring a smooth customer
experience even during peak shopping seasons.
Unlike traditional virtual machine packages, this service allows
users to have complete control over the underlying resources,
enabling them to adjust every aspect of their computational
environment. Compute Engine's unique features make it well-suited
for workloads that require customization and granular resource
management.
Whether you are running complex data analytics, conducting
machine learning experiments, deploying advanced applications, or
executing resource-intensive workloads, Compute Engine provides
the flexibility and agility to optimize your compute infrastructure

according to your precise specifications.
This service is most suitable for running workloads that need full
control over the underlying resources.
Factors to be considered are as follows:
• Full control over your virtual machines.
• High performance computing on Google's infrastructure.
• Per-second billing for instances.
• Variety of machine types for specific requirements.
• It requires more management than other services.
You may have to deal with the underlying operating system and
software stack.
Fun fact
Did you know that Google's data centers use around 50% less
energy than typical data centers? Plus, GCE's live migration feature
lets Google perform maintenance without any downtime. Your
applications keep running even if there are underlying hardware or
software updates!
Trivia
Can you guess the name of the disk type that Compute Engine
offers, which is backed by hard disk drives (HDDs)?
Answer: Standard persistent disks
Google Kubernetes Engine
Google Kubernetes Engine (GKE) is Google's managed,
production-ready environment for running containerized
applications. This service is used when an organization wants to
deploy, manage, and scale containerized applications using
Kubernetes, an open-source platform. GKE is best suited for
organizations that have containerized their applications and are
looking for an easy way to manage and scale them. For instance,
companies that rely heavily on microservices architectures often use
GKE because it simplifies the deployment and scaling process.
Factors to consider are as follows:

---

## Sección 20: CHAPTER 1 [Entropy: 0.515]

• Containerization: Ideal if your application is containerized or
you're planning to containerize it.
• Scalability: Beneficial for applications that require the ability
to scale resources up or down efficiently.
• Microservices Architecture: Well-suited for managing and
deploying applications built using microservices.
• Load balancing and self-healing: Offers built-in load
balancing and self-healing capabilities for robust application
performance.
• Rapid deployment: Facilitates quick development and
deployment cycles, supporting CI/CD practices.
• Multi-cloud or hybrid cloud: Compatible with multi-cloud
and hybrid environments.
• Resource 
optimization: 
Efficiently 
manages 
resource
allocation, reducing waste.
• Security and compliance: Provides robust security features
for applications with stringent security and compliance
requirements.
• Cost considerations: Evaluate the cost against your project's
budget and requirements.
• DevOps compatibility: Supports DevOps practices with tools
for monitoring and proactive management.
• Community and ecosystem: Access to a wide range of
community-driven innovations and integrations.
Fun fact
Kubernetes was originally developed by Google, based on their
experience of running services at massive scale, and was
contributed to the open-source community in 2014. Therefore, GKE
has first-class support for Kubernetes!
Trivia
GKE's logo has seven sides. Can you guess why?
Answer: It is a hint to the name Kubernetes, which is Greek for
"helmsman" or "pilot", and seven is a homage to the seven-spoked
wheel that steers a ship.)

Google App Engine
App Engine is a Platform as a Service (PaaS) offering. It empowers
developers to build and deploy a wide range of scalable web
applications and mobile backends, including interactive websites,
RESTful APIs, and real-time chat applications. App Engine supports
popular programming languages like Python, Java, Node.js, and
PHP, allowing developers to use their preferred tools. With
automatic scaling and built-in security features, App Engine takes
care of infrastructure management, freeing developers to focus on
writing code and bringing their innovative ideas to life. It's perfect
for startups because it can start small but scale rapidly as the
application gains more users.
Factors to consider are as follows:
• There is no need to manage the underlying infrastructure.
• Offers a variety of runtimes including Node.js, Java, Ruby,
C#, Go, Python, and PHP.
• Automatic in-place updates and ability to split traffic for A/B
testing.
• It automatically scales depending on your app traffic.
• Less flexibility as it restricts access to the underlying
infrastructure.
• Limited language support compared to other services like
Compute Engine or GKE.
• App Engine Standard environment has specific quotas and
limitations.
Fun fact
When Google App Engine was first launched in 2008, it only
supported Python. Now, it supports several other programming
languages including Java, PHP, Node.js, C#, and Go.
Trivia
Do you know the maximum number of instances that the App
Engine standard environment automatically scales up to for each
version of your app?
Answer: 20,000 instances

Storage
GCP offers a rich array of storage options designed to meet a variety
of needs, from serving website content to analyzing massive
datasets. Each storage option is tailored for specific use cases,
ensuring that users can store and access their data efficiently,
securely, and economically. An an overview of GCP's primary
storage solutions. Is discussed in this section.
Google Cloud Storage
GCS offers developers and IT organizations durable and highly
available object storage. Google created four types of storage
buckets, as follows:
• Multi-regional storage is ideal for data that is frequently
accessed around the world, such as serving website content,
streaming videos, executing interactive workloads, and
distributing content to end users.
• Regional storage is apt for storing data in specific geographic
locations, with protection against local hardware failures. This
is excellent for high availability compute workloads.
• Nearline storage is a low-cost, highly durable storage service
for storing infrequently accessed data, like backups and longtail multimedia content.
• Coldline storage, similar to Nearline, offers slightly lower
availability and has costs associated with data access. It is
ideal for disaster recovery and long-term archiving.
Factors to be considered are as follows:
• Highly scalable and durable.
• Multiple storage classes for cost optimization.
• Strong consistency guarantees.
• More expensive for small, frequently accessed objects
compared to a block storage.
• Does not support traditional file protocols.
Fun fact
Did you know Google Cloud Storage provides worldwide storage
and retrieval of any amount of data at any time? You can use it for
a range of scenarios including serving website content, storing data

for archival and disaster recovery, or distributing large data objects
to users via direct download.
Trivia
Can you name the four storage classes Google Cloud Storage offers?
Answer: Standard, Nearline, Coldline, and Archive
Persistent Disks
Persistent Disks (PD) are block storage for Google Compute Engine
Virtual Machines (VMs). The data on each persistent disk is
distributed across several physical disks. PDs can be attached or
detached to/from VMs and are independent of the life cycle of VMs.
They offer built-in redundancy, ensuring that your data is safe even
in the event of unexpected hardware failure.
Factors to be considered are as follows:
• Suitable for applications requiring high IOPS.
• Automatically encrypted, replicated and comes with built-in
redundancy for reliability.
• Provides SSD and HDD variants.
Things to weigh in are as follows:
• More expensive compared to object storage.
• Size of a disk needs to be specified at the time of creation.
Fun fact
Persistent Disks can be up to 64 TB in size, and you do not need to
run a VM instance to hold them!
Google Cloud Bigtable
Cloud Bigtable is Google's NoSQL Big Data database service. It is the
same database that powers many core Google services, including
Search, Analytics, Maps, and Gmail. Bigtable is designed to handle
massive workloads across distributed clusters, providing a great
deal of flexibility to accommodate large-scale, storage-intensive
workloads. It is ideal for storing very large amounts of single-keyed
data with very low latency.
Factors to be considered are as follows:

---

## Sección 21: CHAPTER 1 [Entropy: 0.5]

• Excellent 
choice 
for 
both 
operational 
and 
analytical
applications, including IoT, user analytics, and financial data
analysis.
• Seamlessly scales to millions of reads/writes per second.
• Can be an overkill for small datasets.
• No support for SQL queries.
Fun fact
Google Cloud Bigtable is based on Google’s own NoSQL database
system used in various Google services like Search, Analytics, Maps,
and Gmail.
Trivia
What is the minimum storage amount you pay for in Cloud
Bigtable, regardless of the amount of data you store in the table?
Answer: 1 TB
Cloud SQL
Cloud SQL is a fully-managed database service that makes it easy to
set up, manage, and administer your relational MySQL, PostgreSQL,
and SQL Server databases in the cloud. Cloud SQL offers high
performance, scalability, and convenience. Hosted on GCP, Cloud
SQL provides a database infrastructure for applications running
anywhere.
Factors to be considered are as follows:
• Relational database requirement: Ideal if your application
needs a fully-managed relational database like MySQL,
PostgreSQL, or SQL Server.
• Scalability: Cloud SQL scales vertically, assess if this aligns
with your application's scaling needs.
• Maintenance and management: Useful if you prefer a
managed service that handles database maintenance tasks like
updates, patching, and backups.
• Performance and reliability: Cloud SQL offers high
performance and reliability with options for high availability
configurations and read replicas.
• Security and compliance: Assess if Cloud SQL’s built-in

security features like data encryption, IAM, and compliance
certifications meet your requirements.
• Data migration: If you need to migrate an existing database
to GCP, Cloud SQL provides tools and services to facilitate this
process.
• Connection limits and performance requirements: Check if
Cloud SQL meets your specific connection limits and
performance benchmarks.
You generally interact with Cloud SQL instances via standard SQL
client libraries in Python, Java or Cloud SDK.
Trivia
What are the different synchronization techniques used by
Cloud SQL?
a. Synchronous replication
b. Asynchronous replication
c. Multi-master replication
d. All of the above
Answer: b. Asynchronous replication
Cloud Spanner
Cloud Spanner is the only enterprise-grade, globally distributed, and
strongly consistent database service built for the cloud specifically
to combine the benefits of relational database structure with nonrelational horizontal scale. This combination delivers highperformance transactions and strong consistency across rows,
regions, and continents. Cloud Spanner is designed to support global
online transaction processing deployments, SQL semantics,
horizontal scaling and transactional consistency.
Factors to consider are as follows:
• Global transaction consistency: One of Cloud Spanner's key
advantages is its ability to maintain transaction consistency
across global deployments, thanks to Google's TrueTime API.
• Horizontal scalability: Spanner provides seamless and almost
infinite scaling. The distributed nature of Spanner allows for
database scaling without compromising on performance.

• Strong SQL support: Cloud Spanner supports standard SQL
queries, making it accessible and familiar to a large base of
developers.
• Managed service: Being a fully managed service, Spanner
takes 
away 
the 
burden 
of 
managing 
the 
database
infrastructure, ensuring automatic sharding and replication.
• Cost: For smaller applications that don't require global
consistency and extensive horizontal scaling, the cost of using
Spanner could be higher compared to other services.
• Complexity: While Spanner provides many advanced features,
utilizing them effectively requires a good understanding of the
system. Misconfigurations can lead to less than optimal
performance.
• Limited language support: Spanner's client libraries are
available in a limited number of languages.
Fun facts
• Spanner was born out of the necessity to handle Google's own
global services. Google needed a highly reliable, globally
distributed database, so they built Spanner. Now, it powers
multiple billion-user services like Gmail and YouTube.
• Cloud Spanner is the only relational database service that
offers both strong consistency and horizontal scaling!
Trivia
What technology does Google Cloud Spanner use to maintain
consistent, global transactions in a distributed database system?
a. Time API
b. TrueTime API
c. AccurateTime API
d. RightTime API
Answer: b. TrueTime API
Networking Services
The GCP networking suite provides a robust and secure
environment to connect, scale, and manage applications and
services. Leveraging Google's private fiber optic network, the

services offered under networking in GCP facilitate high-speed, lowlatency, and secure interconnections for your cloud-based
applications. These services, ranging from Virtual Private
Networks (VPN) to Content Delivery Networks (CDN), are
designed to ensure your services are highly available and accessible
globally.
Some of the key networking services on GCP are as follows:
• Virtual Private Cloud (VPC): GCP's VPC provides an isolated
and secure environment for your resources and services. In a
VPC, you can define your IP address range, create subnets,
configure routing, and control the network firewall. It offers
global scope, meaning a VPC can span multiple regions
without communicating across the public internet.
• Cloud load balancing: Google's load balancing distributes
traffic among your instances in different regions to ensure
they get optimal utilization. Not only does it improve
application responsiveness, but it also protects from single
point of failure. It's fully integrated with Cloud CDN for
optimal content delivery and with Cloud armor for robust
security.
• Cloud armor: Cloud armor works in synergy with Cloud load
balancing to provide defense against multiple types of attacks
including DDoS attacks. It is capable of blacklisting/
whitelisting based on IP addresses, geography and other
parameters, enabling robust application-level protection.
• Cloud CDN: Leveraging Google's edge networking, Cloud CDN
uses point of presence locations all over the globe to cache
and serve application content closer to users, reducing latency
and improving response times.
• Cloud DNS: Cloud DNS is a high-performance, resilient, global
Domain Name System (DNS) service that publishes your
domain names to the global DNS in a cost-effective manner. It
provides reliable and low-latency name lookups and supports
a variety of DNS record types.
• Cloud Interconnect: Cloud Interconnect provides options to
connect your infrastructure to Google Cloud, via Dedicated
(physical) or Partner (over an existing service provider)
Interconnect. It provides private connectivity between your
on-premise and VPC networks, enhancing security and
network performance.

---

## Sección 22: CHAPTER 1 [Entropy: 0.46]

Fun facts
• Google's global network consists of thousands of miles of fiber
optic cable, including two of the longest trans-Pacific undersea
cables. It allows Google Cloud to serve users with 100,000
miles closer to the user as compared to other cloud providers.
• Google was the first non-telecom company to build a private
trans-Atlantic cable called "Dunant.”
• Google's Jupiter cable, spanning the Pacific Ocean, has a
bandwidth of 60 Terabits per second, enough to send the
entire contents of the Library of Congress in less than two
minutes!
Trivia
1. Can you name the undersea cable project funded by Google to
improve network infrastructure across the Pacific Ocean?
Hint: It is named after a renowned scientist and developer of
a significant physical law regarding electromagnetism.
Answer: The Curie project, named after Marie Curie.
2. Google's Dunant cable is a noteworthy feat of engineering.
What makes it unique in comparison to traditional undersea
cables?
Answer: Unlike traditional cables, Dunant cable uses 12
fiber pairs, enhancing the capacity of the cable and ensuring
efficient service (https://cloud.google.com/blog/
products/infrastructure/googles-dunant-subsea-cable-isnow-ready-for-service ).
In the upcoming chapters, we will see code examples and use cases
of how these services can be implemented effectively, thereby
optimizing the networking aspect of your GCP infrastructure.
Identity and Access Management on Google Cloud
Platform
IAM is a critical part of GCP. IAM allows you to control who
(identity) has what access (role) to which resource.
IAM offers a unified view into security policy across an
organization, with built-in auditing to ease compliance processes.
IAM ensures that only authorized and authenticated users can

access your resources, thereby enforcing the principle of least
privilege.
IAM policies are set at different levels of the resource hierarchy: the
organization level, the folder level, the project level, and the
resource level. A policy applied to a parent resource is inherited by
all the child resources. For instance, a policy applied at the
organization level is inherited by all its projects and their
corresponding resources.
The following are some key IAM concepts:
• Members: Members can be a Google Account (for end-users),
a service account (for apps and virtual machines), a Google
group, a G Suite domain, or a Cloud Identity domain.
• Roles: A role is a collection of permissions. Permissions
determine what operations are allowed on a resource. A role
can be granted to a member for a particular resource. GCP has
three types of roles: Primitive (owner, editor, viewer),
Predefined (more granular than primitive roles and are
resource-specific), and Custom (created by users).
• Policies: A policy binds one or more members to roles. It is
set on a resource and is used to enforce what roles are
assigned to what members.
Zero Trust security
Zero Trust is a security model that mandates no trust for any entity
outside or inside the perimeter. Access to systems and data must be
granted on a need-to-know basis, is least privilege, and is contingent
on the user’s identity and the context of the request.
With IAM, GCP implements a Zero Trust security model where
every request for access to a resource is authenticated and
authorized. Regardless of the network from which the request
originates, or what resource it accesses, every request carries
identity context, and access levels are carefully controlled.
Fun fact
Google Cloud IAM allows you to use predefined roles (like viewer,
editor, owner) and also allows you to create custom roles to provide
granular access to your GCP resources.

Trivia
In the context of GCP IAM, what does the principle of least privilege
refer to?
Answer: The principle of least privilege (PoLP) is a computer
security concept in which a user is given the minimum levels of
access necessary to complete his/her job functions. In the case of
GCP IAM, this means giving a user only those permissions that they
need to perform their work, nothing more.
In the following sections, we will dive deeper into how to
effectively use IAM, its practical implications, and provide code
examples to guide your IAM strategies.
Resource management and monitoring
Effective management of resources is crucial in cloud computing.
GCP offers a range of resource management and monitoring tools,
helping businesses gain deep insights into their cloud usage and
expenditures. These tools make it easier to manage resources, create
budgets, set alerts, and gain visibility into how resources are
consumed.
Resource management
On Google Cloud, a resource refers to a service-provided entity or
an object that you interact with. Examples include compute
instances, storage buckets, and BigQuery datasets.
GCP's resource hierarchy is an important concept. At the top of the
hierarchy is the Organization, under which there are Folders. Each
Folder can have multiple Projects, and each Project can contain
various resources.
Resource Manager is the service you would use to create, manage,
and delete projects programmatically. It is a crucial component
when dealing with multi-project deployments and automation.
Some key concepts are as follows:
• Projects: The basic organizing entity for creating, enabling,
and using all GCP services.
• Resources: They are the fundamental components that make
up all Google Cloud services, such as Compute Engine

instances, Pub/Sub topics, Cloud Storage buckets, and so on.
• Resource Hierarchy: It is a hierarchical structure for the
organization of resources which includes the Organization,
Folders, Projects, and Resources themselves.
• Monitoring: Monitoring your GCP resources and services is
crucial 
for 
maintaining 
application 
performance 
and
reliability. Google Cloud Monitoring allows you to understand
your application's behavior, track metrics, create dashboards,
and set up alerts.
Cloud Monitoring collects metrics, events, and metadata, and writes
them into time-series databases. You can then use the Cloud
Monitoring API to read these time-series data.
Google Cloud Operations suite (formerly Stackdriver) is designed to
monitor, troubleshoot, and improve cloud infrastructure, software,
and application performance. It comprises Cloud Logging, Cloud
Monitoring, Cloud Trace, Cloud Debugger, and Cloud Profiler.
In the real world, you'll likely want to integrate Cloud Monitoring
directly into your application or infrastructure setup scripts to
ensure consistent coverage.
Remember, both resource management and monitoring are vast
topics. The provided examples are quite basic, and real-world usage
often involves more complex configurations and code. Always
consult the official GCP documentation for more detailed
information.
Fun facts
• Cloud Monitoring was earlier known as Stackdriver, before
being fully incorporated into Google Cloud in November 2019.
• With GCP, you can attach labels to your resources, which is
essentially a way to add metadata to them. These labels can
help you break down your cloud bill by, for instance, a
specific department or a specific project. This makes it easier
to understand and manage costs.
• 80% of data breaches are caused by human error.
• The cost of a data breach can be as high as $3.86 million.
Trivia

---

## Sección 23: CHAPTER 1 [Entropy: 0.355]

What service would you use in GCP to monitor the performance of
your cloud resources?
Answer: You would use Google Cloud's operations suite (https://
cloud.google.com/products/operations ), formerly Stackdriver,
for real-time monitoring of your cloud resources. It provides you
with visibility into the performance, uptime, and overall health of
your applications.
Data and analytics
In the era of Big Data, effective data management and analytics are
crucial for any business. GCP offers a comprehensive suite of data
analytics services that enable businesses to gain meaningful insights
from their data, improve decision-making, and create predictive
models for future trends.
Google Cloud's Data and analytics services provide a wide range of
tools for ingesting, transforming, and visualizing data, along with
machine learning capabilities to uncover insights. GCP's data
analytics tools are designed to be easy to use, highly scalable, and
cost-effective, catering to both large enterprises and startups alike.
Some key services are as follows:
• Bigquery: BigQuery is Google's fully-managed, PetaByte scale
serverless data warehouse that enables super-fast SQL queries
using the processing power of Google's infrastructure. It has a
host of other features which are not seen in traditional
warehouse products. For example, BigQuery allows you to
ingest data in real-time with its high-speed streaming insertion
API. You can quickly build, train and deploy machine learning
models using BQML. We will explore these topics in more
details in Chapter 4, Data and Analysis.
• Dataproc: Dataproc is a managed Spark and Hadoop service
that lets you take advantage of open-source data tools for
batch processing, querying, streaming, and machine learning.
Dataproc automation helps you create clusters quickly,
manage them easily, and save money by turning clusters off
when you don't need them.
• Dataflow: Dataflow is a unified programming model and a
managed service for developing and executing a wide range of
data processing patterns. Dataflow pipelines simplify the
mechanics of large-scale batch and streaming data processing

and can run on a number of runtimes like Apache Flink and
Apache Beam.
• Data Fusion: Data Fusion is a fully managed, cloud-native,
data integration service that helps users efficiently build and
manage ETL/ELT data pipelines. It provides a graphical
interface to increase ease of use and productivity, reducing the
time required to design and operate data pipelines.
Fun fact
Did you know that Spotify uses BigQuery to analyze its data? With
over 200 million users, Spotify uses BigQuery to quickly analyze
massive datasets to understand listener preferences and make datadriven decisions.
Trivia
Which Google Cloud service is a fully-managed, serverless data
warehouse that enables super-fast SQL queries using the processing
power of Google's infrastructure?
Answer: The Google Cloud service that is a fully-managed,
serverless data warehouse is BigQuery. (https://
cloud.google.com/bigquery)
In Chapter 4, Data and Analytics, we will dive deeper into these
services, discussing when and how to use them, and providing
practical examples.
Machine learning and artificial learning
GCP offers a comprehensive suite of Machine Learning (ML) and
Artificial Intelligence (AI) services that harness Google's cuttingedge AI and ML technologies. These services allow businesses to
build models, make predictions, and automate decisions without
needing deep expertise in machine learning or data science. They
also enable developers to incorporate Google’s AI capabilities into
their applications, products, and services.
The rapid advances in ML and AI have been transformative across
all sectors, helping companies leverage data to drive innovation,
make informed decisions, and create a competitive edge. GCP, with
its suite of ML and AI services, stands at the forefront of this
revolution.

GCP's ML and AI services are rooted in Google's own experience of
powering world-class applications like Google Search, Google
Photos, and Google Assistant. They leverage the same deep learning
models and robust algorithms that have been honed over years of
research and refinement.
From pre-trained models that require no machine learning
expertise, such as Vision AI for image analysis, Video AI for video
content analysis, and Speech-to-Text for audio transcription, to
powerful machine learning platforms like Vertex AI for custom
model development and deployment, GCP provides a spectrum of
tools that cater to both novices and experts in the field.
These services are bolstered by Google's advanced AI Hub, a onestop repository of plug-and-play AI components, and TensorFlow,
Google's open-source machine learning framework, enabling data
scientists to design and deploy complex models with ease.
GCP's commitment to democratizing AI is also evident in its
educational initiatives like AI Hub and Crash Course in ML,
providing resources and learning materials to help users understand
and effectively utilize AI and ML technologies.
Furthermore, all of GCP's ML and AI services are designed to work
seamlessly with its data analytics, storage, and compute offerings,
providing a fully integrated, robust, and scalable environment for
end-to-end AI and ML workflows.
With its state-of-the-art tools and services, GCP is empowering
businesses to harness the full potential of AI and ML, leading to
innovative products, more efficient processes, and impactful
insights. As we navigate through this exciting era of AI and ML,
GCP continues to evolve, continuously improving its offerings and
setting new benchmarks in the field.
Some of the key services are as follows:
• Cloud AutoML: Cloud AutoML is a suite of machine learning
products tailored for developers with limited machine learning
expertise. It enables businesses to build high-quality, custom
models that are tailored to their specific needs. Leveraging
Google's advanced technologies such as transfer learning and
neural architecture search, AutoML automates the model
training process, reducing the need for extensive machine
learning 
knowledge 
while 
delivering 
top-tier 
model

---

## Sección 24: CHAPTER 1 [Entropy: 0.5]

performance.
• Cloud ML Engine: Also known as Vertex AI, it is Google
Cloud's comprehensive, unified platform for the entire
machine learning workflow, offering tools for training,
validation, deployment, prediction, and management of
machine learning models. With its wide support for popular
ML frameworks such as TensorFlow, PyTorch, and Scikitlearn, Vertex AI allows data scientists to create, deploy, and
scale high-quality models with efficiency and ease.
• Cloud Vision API: The Cloud Vision API is a powerful pretrained machine learning service that offers a multitude of
image understanding capabilities. From detecting common
objects and faces, to reading printed and handwritten text,
Cloud Vision API can analyze and derive insights from your
images. It can recognize millions of popular landmarks, logos
and more, all using a simple REST API.
• Cloud Natural Language API: The Cloud Natural Language
API offers a comprehensive set of text analysis technologies
that can extract information about people, places, events and
a lot more from your text data. It can understand sentiment,
analyze syntax, and even extract entities and the relationships
between them. It's a powerful tool for understanding and
deriving insights from unstructured text data.
• Cloud Speech-to-Text API: This API enables developers to
convert audio to text by applying powerful neural network
models. It's capable of transcribing a wide variety of languages
and dialects, and can be used for multiple applications such as
voice commands, transcription of voice clips, and more.
• Vertex AI: Vertex AI is a managed machine learning platform
that enables developers and data scientists to build, deploy,
and maintain AI models. Whether you're just getting started
with machine learning or you’re a seasoned expert, Vertex AI
provides a suite of tools to help you take your ML projects
from ideation to deployment, quickly and cost-effectively.
Each of these services has unique capabilities and features that cater
to a wide array of business needs. In subsequent chapters, we will
delve deeper into each of these services, discussing their use cases,
providing walk-throughs on how to use them, and exploring ways to
leverage them to derive maximum value.

Fun fact
Did you know that the Cloud Vision API can detect a wide variety of
entities within images, including millions of popular landmarks?
You could upload a picture of the Eiffel Tower, and the API would
be able to recognize it!
Trivia
You have a pre-trained model that you want to customize for your
specific needs. Which GCP service should you use?
a. Vertex AI Model Registry
b. Vertex AI Custom Training
c. Vertex AI Pipelines
d. Cloud AutoML
Answer: a.
Explanation: Vertex AI Custom Training is the right GCP service for
customizing already built models. It allows you to train your model
on your own data and customize the model's parameters. The other
three services are not designed for customizing already built
models.
In the upcoming sections, we will delve into each of these services,
providing a detailed walkthrough on how to leverage these
technologies to power your applications with machine learning and
artificial intelligence.
Global infrastructure and region management
Google's cloud infrastructure is a vast ensemble of physical assets,
including computers, hard drives, network links, and a variety of
supporting hardware. It spans across the globe and is linked through
Google's private global fiber optic network.
GCP has a unique approach to global infrastructure, delivering
robust and reliable services across the globe via its cutting-edge
network. GCP's infrastructure is designed to offer high speed,
redundancy, and scalability, making it capable of serving millions of
users worldwide.
Some of the key concepts are as follows:

• Regions: In GCP, a region is a specific geographical location
where you can host your resources. Each region has one or
more zones, and the regions are independent of each other. By
strategically choosing a region, you can optimize latency, cost,
and regulatory requirements.
• Zones: A zone is a deployment area within a region. It's
essentially an isolated location within a region that should be
unaffected by failures in other zones. To build highly available
applications, it is recommended to deploy applications across
multiple zones in a region.
• Edge locations: These are locations where GCP's edge Points
of Presence (POP) are situated. Edge locations serve Google
Cloud CDN and load balancing customers. They are the points
where customers' traffic enters Google's network.
Importance of regions and zones
Regions and zones in GCP are not just for data organization. They
play a critical role in building resilient and efficient applications, as
follows:
• High availability: Using multiple zones within a region or
across regions, you can ensure your application remains
available even if a zone or a region fails.
• Disaster recovery: By creating backups or replicas of your
data in different regions, you can mitigate the impact of
regional disasters.
• Low latency: You can reduce network latency by placing
resources closer to the users who will be accessing them.
Making optimal use of regions and zones
Selecting regions and zones is a vital step while planning and
deploying services on GCP. Following are some guidelines:
• User proximity: The closer your resources are to the users,
the lower the network latency. Analyze your user base and
choose the regions that serve them best.
• Service availability: While most services are available
globally, some GCP services may not be available in all
regions or zones. Review the service availability before
making your selection.
• Legal and regulatory compliance: Depending on the

industry or the nature of the data you handle, you may have
to comply with certain laws and regulations about where data
can reside or be processed.
• Cost differences: Prices for some services can vary by region.
Consider this while choosing regions.
In this example, the application is spread across multiple zones
within the `us-central1` region. This setup ensures that if one zone
goes down, the application remains available.
Understanding and strategically utilizing GCP's global infrastructure
can significantly improve your application's resilience, performance,
and user experience.
Fun facts
• Google's global network is one of the biggest in the world,
boasting thousands of miles of fiber optic cable. This vast
infrastructure is what powers Google's search engine and other
services, such as YouTube and Gmail.
• GCP's network is the first major public cloud to have
eliminated the need for a hypervisor, offering direct access to
server hardware for maximum performance.
Trivia
1. Can you name the GCP region that is situated closest to the
North Pole?
2. Which GCP service would you use to balance incoming
internet traffic for your application across various regions and
zones?
Answers:
1. London (as of September 2023)
2. Load balancer
These elements come together to create a reliable, high-speed, and
secure infrastructure that GCP customers can use to deploy their
applications globally, with minimal latency and maximum uptime.
Conclusion

---

## Sección 25: CHAPTER 1 [Entropy: 0.295]

In this chapter, we have introduced GCP and explored its key
features and advantages. As a leading cloud computing provider,
GCP offers a comprehensive suite of services that cater to the
diverse needs of businesses and developers. From scalability and
global reach to cutting-edge technologies and robust security, GCP
provides a powerful platform for organizations to build, deploy, and
scale their applications and services in the cloud.
In the upcoming chapters, we will delve deeper into GCP's core
services, exploring real-life use cases, and providing in-depth
insights for aspiring Google Cloud Architects. Let us continue this
journey to master the art of cloud architecture with GCP.
Multiple choice questions
1. Which of the following is NOT a factor driving the
adoption of cloud computing?
a. Cost savings
b. Scalability
c. Infrastructure maintenance
d. Reduced security
2. Which cloud computing offering provides a platform for
customers to develop, run, and manage applications
without building and maintaining the infrastructure?
a. SaaS
b. PaaS
c. IaaS
d. FaaS
3. What was the first cloud computing service offered by
Google?
a. Google Compute Engine
b. Google App Engine

c. Google Kubernetes Engine
d. Google BigQuery
4. In GCP, what is a 'Region'?
a. A series of network routes
b. A specific geographic location where resources can be
hosted
c. A group of data centers
d. A database management system
5. Which of these is NOT a core service offered by Google
Cloud Platform?
a. Google Cloud Storage
b. Google Search Engine
c. Google Compute Engine
d. Google Kubernetes Engine
6. Google Compute Engine allows you to launch virtual
machines on demand. What type of cloud computing is
this an example of?
a. SaaS
b. PaaS
c. IaaS
d. FaaS
7. What is the primary use of Google Compute Engine in
GCP?
a. Database management
b. Running Kubernetes Clusters
c. Running virtual machines
d. Storing data

8. What does Google Kubernetes Engine (GKE) primarily
manage?
a. Databases
b. Containers
c. Virtual machines
d. Serverless applications
9. What type of cloud computing model does Google App
Engine (GAE) fall under?
a. SaaS
b. PaaS
c. IaaS
d. FaaS
10. What type of data is Google Cloud Bigtable MOST suitable
for?
a. Large amounts of single-keyed data
b. Small amounts of multi-keyed data
c. Large amounts of relational data
d. Small amounts of non-relational data
11. What service would you use in Google Cloud Platform for
distributing network traffic across various regions and
zones?
a. Google VPC
b. Google Cloud Load Balancing
c. Google Cloud DNS
d. Google Cloud VPN
12. What does the principle of "least privilege" mean in the
context of Google Cloud IAM?

a. Users should be given only the privileges they need to
perform their tasks
b. All users should have equal access to resources
c. Admin users should have all the privileges
d. Non-admin users should have no privileges
13. Which service in GCP would you use for tracking your
applications' performance?
a. Google Cloud Storage
b. Google Cloud Logging
c. Google Compute Engine
d. Google Kubernetes Engine
14. Which GCP service is a fully-managed, serverless data
warehouse that enables super-fast SQL queries?
a. BigQuery
b. DataProc
c. DataFlow
d. Cloud Spanner
15. Which Google Cloud Platform service provides a suite of
machine learning products?
a. Google Compute Engine
b. Google Cloud Storage
c. Google Cloud Machine Learning Engine
d. Google Kubernetes Engine
16. What is the purpose of 'Zones' in the Google Cloud
Platform?
a. They help in distributing network traffic
b. They serve as deployment areas within a region

c. They store data for the Google Cloud Platform
d. They monitor resource usage in the Google Cloud
Platform
Answer key
1. d. Reduced security
2. b. PaaS
3. b. Google App Engine
4. b. A specific geographic location where resources can be
hosted
5. b. Google Search Engine
6. c. IaaS
7. c. Running virtual machines
8. b. Containers
9. b. PaaS
10. a. Large amounts of single-keyed data
11. b. Google Cloud Load Balancing
12. a. Users should be given only the privileges they need to
perform their tasks
13. b. Google Cloud Logging
14. a. BigQuery
15. c. Google Cloud Machine Learning Engine
16. b. They serve as deployment areas within a region
Case studies
1. Discuss the transformation of a traditional business, like a
bookstore or a record store, when they moved their
infrastructure to the cloud. Highlight the challenges they
faced, how they overcame them, and what benefits they
experienced.
2. Choose a tech startup that uses a combination of SaaS, PaaS,

and IaaS. Describe how the use of each of these service
models benefits the company's operations, scalability, and
cost-efficiency.
3. Discuss a case study where a company transitioned from an
on-premises or another cloud provider to GCP. Highlight the
reasons for the transition, the steps involved, and the
subsequent 
improvements 
in 
their 
workflows 
and
performance.
4. Discuss a real-life scenario of a company building a complex
application on GCP. Outline how they used different core
services such as compute, storage, networking, and others to
architect the application.
5. Describe a scenario where a company successfully leveraged
GCP's data and analytics tools to gain insights and drive
business decisions.
6. Provide a case study of a company that used GCP's ML & AI
services to implement machine learning models in their
products or services. Discuss the impact it had on their
business.

---

## Sección 26: CHAPTER 2 [Entropy: 0.53]

Getting Started with
GCP
Introduction
The cloud has become essential for businesses of all sizes, and
Google Cloud Platform (GCP) offers a comprehensive suite of tools
and services to meet diverse business needs. From powerful data
analytics solutions like BigQuery, which can analyze terabytes of
data in seconds, to cutting-edge machine learning platforms like
Vertex AI, which enables the development of sophisticated AI
models, GCP provides the building blocks for innovation. This
chapter introduces the foundational aspects of GCP, empowering
you to navigate the platform with confidence and begin building
your own cloud solutions.
Structure
 Following is the structure of the chapter:
• Account creation and setup
• GCP Console
• Quotas in GCP
• gcloud command line interface
• Resources and tools

Objectives
By the end of this chapter, readers will learn the foundational
aspects of GCP. It covers the process of setting up a GCP account,
navigating the GCP console, and managing projects. Readers will
also explore the essential tools and resources available in GCP to
facilitate their cloud journey. By the end of this chapter, one should
be well-equipped to comfortably initiate their endeavors within the
GCP, setting the stage for more advanced topics in subsequent
chapters.
Account creation and setup
Ready to start building on GCP? First, you'll need to set up your
account. This section delineates the procedural steps for both new
and experienced users to set up their GCP accounts. It ensures that
users, irrespective of their prior experience with cloud platforms,
are equipped with clear instructions to access GCP's resources.
Following are steps to set up your trial account on GCP: 
1. Visit the GCP Console: Begin by navigating to the [Google
Cloud 
Platform 
Console] 
(https://cloud.google.com/
free). 
2. Click Get Started for Free: This will prompt you to log in
using your Google account. If you do not have one, you will
need to create it. 
3. Agree to the Terms of Service: After reading, accept the
terms to move forward. Figure 2.1 shows the account signup
page for Google Cloud:

Figure 2.1: Google Cloud Sign-up page
4. Set up billing: While GCP does offer a free tier, they still
require you to set up billing (you will not be charged until
you use services outside the free tier). During signup, you will
typically need to provide credit card or other payment details,
as shown in Figure 2.2:
Figure 2.2: Payment info page
5. Get your $300 credit: If you are new to GCP, you will be
eligible for a $300 free credit to spend on Google Cloud
services during your initial 90 days (as of 2023). This allows

you to try out different GCP products without financial
commitments, as shown in Figure 2.3:
Figure 2.3: Google console home page.
6. Project creation: Every resource within GCP belongs to a
project. Click on the dropdown in the top right corner, then
select New Project. Name your project and assign it to a
parent organization or folder if you have one, as shown in the
Figure 2.4:
Figure 2.4: Creating a new project via GCP console.
7. Dashboard navigation: Once inside the dashboard, you will
see a plethora of options. This is where you can manage and
monitor every service, resource, and solution you deploy on
GCP.
8. Initialize the SDK (Optional): If you plan to interact with
GCP using the command line, download and initialize the

Google Cloud SDK (https://cloud.google.com/sdk). This
will allow you to manage your GCP resources directly from
your terminal.
Fun facts
• Google’s data centers use around 50% less energy than typical
data centers, which means even when you're using their cloud
services, you're being environmentally conscious!
• GCP's network backbone is one of the biggest in the world,
ensuring high-speed connectivity and low latency for users, no
matter where they are.
Trivia
Which of the following is not a part of Google Cloud’s services?
a. Google Compute Engine
b. Google Cloud Storage
c. Google Cloud Speech API
d. Google Home Mini
Answer: d. Google Home Mini
GCP Console
The GCP Console is a web-based graphical interface that allows
users to manage and interact with resources and services offered by
GCP. It serves as the primary point of entry for many users, from
developers to system administrators, who wish to harness the power
of Google's cloud offerings. Following are the main features of the
GCP Console:
• Navigation Menu: Located on the left-hand side, this is your
primary tool for accessing all of GCP's services, from Compute
Engine to BigQuery. Each section is organized based on the
service category, as shown in Figure 2.5: 

Figure 2.5: GCP console with Navigation menu in left.
• Active Project Selector: At the top, you can easily switch
between GCP projects. This dropdown displays the currently
active project, and clicking on it lets you search for and switch
to another project.
• Cloud Shell and Code Editor: At the top right, there is an
activation button for Cloud Shell, a command-line resource
that lets you manage your GCP resources directly from the
browser. Next to it is the Cloud code editor, where you can
develop applications right in the console. Figure 2.6 shows
Cloud shell in GCP console:
Figure 2.6: Cloud shell in Pantheon
• IAM & Admin: This section is critical for managing user
permissions, roles, and other security features in GCP. It

allows admins to determine who can access what within their
projects.
• Marketplace: Accessible from the navigation menu, the GCP
marketplace allows users to deploy ready-to-go development
stacks, solutions, and services.
Following are the tips for efficient navigation:
• Customize the dashboard: Pin frequently used services to the
top of the dashboard for quicker access.
• Use the search bar: Instead of scrolling through the
navigation menu, use the search bar at the top to quickly find
the service you need.
• Keyboard shortcuts: GCP Console supports several keyboard
shortcuts. For example, press `/` to focus on the search bar.
• Bookmark projects: If you’re working on multiple projects,
bookmark them for faster access.
• API library: Directly navigate to the API library from the
dashboard to enable or manage APIs quickly.
Fun fact
The GCP Console, formerly Pantheon, has undergone several
iterations to enhance user experience and efficiency.
Trivia
What is the Cloud Shell in GCP Console used for?
a. Browsing the internet
b. Command-line access to resources
c. Video conferencing
d. Graphic designing
Answer: b. Command-line access to resources
Quotas in GCP
In cloud computing, resources may seem limitless, but they are not.
That's where quotas come in. Quotas are essential for ensuring fair
access, predictable costs, and overall platform stability. They
prevent any single user from consuming excessive resources, which

---

## Sección 27: CHAPTER 2 [Entropy: 0.5]

could impact the performance of the platform for others. Quotas
also help you manage your cloud spending by setting limits on
resource usage. Whether you're new to GCP or a seasoned pro,
understanding quotas is crucial for effectively managing your cloud
resources. Quotas act as the guardian of the cloud, ensuring
equitable distribution, cost predictability, and the overarching
stability of the platform.
Following is an explanation of Quotas:
In the simplest terms, quotas represent the set limits on resource
consumption or API requests. These limits can span a spectrum of
aspects, from computational entities and storage capacities to the
frequency of specific operations over a delineated period. While
working with GCP, you will encounter the following two types of
quotas, as follows:
• Soft quotas: Initial quotas, often conservative, provided to
users. These are flexible and can typically be increased upon
request, giving users the elbow room to adapt and grow as
their project evolves.
• Hard quotas: These are the maximum limits set by GCP, often
rooted in technical constraints or best-practice thresholds.
Transcending these can necessitate structural changes or
migration to a different service or tier.
The rationale behind quotas is as follows:
• Equitable resource allocation: With a multitude of users,
from startups to tech giants, tapping into GCP's infrastructure,
quotas ensure that resources remain available for all,
preventing any monopolistic tendencies.
• Financial prudence: By delineating quotas, businesses and
individual users can forecast expenses, thereby averting
unexpected budgetary surges.
• Guarding against over-utilization: Whether unintentional or
orchestrated, excessive use of services can trigger system
strains. Quotas act as a deterrent to such scenarios.
• Ensuring systematic operation: Quotas play a paramount
role in upholding the stability of GCP, guaranteeing that
resources 
are 
always 
available 
and 
services 
remain
uninterrupted. They are the very scaffolding ensuring the
reliability, performance, and integrity of GCP. They serve both

as a guide to users and as a checkpoint for system health.
The imperatives of being quota-aware are as follows:
• Strategic planning: Understanding quotas aids users in
sculpting applications that are both efficient and compliant
with cloud boundaries.
• Continuity of services: Foreknowledge of quota limits means
users can anticipate and avert sudden service halts.
• Budgetary oversight: Being aware of quotas facilitates better
financial planning, allowing users to leverage the cloud's
potential without unintended financial ramifications.
Some examples are as follows:
• Cloud storage
○ Maximum number of principals that can be granted IAM
roles per bucket is 1500.
○ Maximum bucket name size is 63 characters.
○ Maximum object size is 5 TiB
○ Maximum bandwidth for each region or dual-region that
has data egress from Cloud Storage to Google services is
200 Gbps per project, per region
• Network bandwidth: The hard limit for network bandwidth is
100 Gbps per project. If you exceed this limit, your requests to
transfer data in and out of your project will be rejected.
• BigQuery
○ Maximum number of queued interactive queries is 1000
queries.
○ Query/multi-statement query execution-time limit is 6
hours.
Folders and projects
In the world of GCP, every resource and service, whether a virtual
machine or a database, is a part of a structure called 'projects'.
These projects, along with folders, are pivotal for organizational,
operational, and billing purposes. Navigating this hierarchy
efficiently is key to optimizing both costs and operations within
GCP.

Significance of folders & projects
The significance of both folders and projects are discussed as
follows:
Projects:
• Isolation: Projects ensure that resources are kept separate and
distinct, thereby streamlining cost tracking, enhancing
security, and facilitating better resource managemt.
• Permissions: At the project level, granular IAM policies can
be applied, enabling specific role-based access to different
resources.
• Billing: GCP tracks costs at the project level, allowing
organizations to easily oversee and designate expenses. 
Folders:
• Organization: Especially beneficial for large-scale enterprises,
folders can mirror an organization's structure, reflecting
operational segments or business units.
• Policy inheritance: A key feature, any IAM policy
implemented on a folder is automatically passed down to
every subfolder and project underneath it.
• Structuring: Based on their specific needs, organizations
might choose a different structure using a more layered
approach incorporating folders.
Related quotas
Following are some quotas related to folders and projects, two
fundamental organizational units in GCP:
Folders:
• Folders per organization: The default quota for folders per
organization is 100 folders. You can request a higher quota if
you need more folders.
• Projects per folder: The default quota for projects per folder
is 100 projects. You can request a higher quota if you need
more projects.
• Tag keys: The default quota for tag keys is 100 tag keys per
organization or project. You can request a higher quota if you
need more tag keys.

• Tag values: The default quota for tag values is 1000 tag
values per tag key. You can request a higher quota if you need
more tag values.
Projects:
• Compute Engine instances: The default quota for Compute
Engine instances is 100 instances per project. You can request
a higher quota if you need more instances.
• Cloud Storage buckets: The default quota for Cloud Storage
buckets is 100 buckets per project. You can request a higher
quota if you need more buckets.
• BigQuery datasets: The default quota for BigQuery datasets is
10 datasets per project. You can request a higher quota if you
need more datasets.
Fun facts
A deleted project in GCP is not instantly obliterated. Instead, it
lingers in a deactivated state for 30 days, during which it can be
resurrected.
GCP does not immediately slap you with a charge when you exceed
a quota. Instead, the system prevents further resource creation until
you are back within limits or the quotas are increased.
Trivia
1. In GCP's hierarchical structure, which entity acts as the
primary container for resources?
a. Organizations
b. Folders
c. Projects
d. Zones
2. If an IAM policy is imposed on a GCP folder, what's the
subsequent action?
a. The folder exclusively adopts the policy.
b. Every project and sub-folder within inherits the policy.

---

## Sección 28: CHAPTER 2 [Entropy: 0.505]

c. The system flags an error.
d. Every project inside must manually activate the policy.
Answers:
1.  c. Projects
2.  b. Every project and sub-folder within inherits the policy.
gCloud command line interface
GCP's user-friendly interface makes it easy to navigate and manage
your cloud resources. But for those who prefer the flexibility and
control of the command line, GCP offers a powerful solution: the
gcloud command-line tool. Designed for managing GCP resources,
the gcloud tool makes automating tasks, bulk operations, and
scripting straightforward and efficient.
The gcloud command-line tool is a part of the Google Cloud SDK. It
provides the primary command-line interface for GCP.
Following are the installation steps:
1. Download the appropriate version of the SDK for your OS
from the official GCP website.
2. Extract the archive and run the google-cloud-sdk/install.sh
script.
3. Initialize the SDK using gcloud init to configure and
authenticate.
Following are the commonly used commands:
• Authentication:  Log in to your GCP account:
gcloud auth login
• List authenticated accounts:
gcloud auth list
• Projects: Set the active project:
gcloud config set project PROJECT_ID
• List all projects:
gcloud projects list
• Compute Engine: Start an instance: 

gcloud compute instances start INSTANCE_NAME
• Stop an instance:
gcloud compute instances stop INSTANCE_NAME
• Kubernetes Engine: Get cluster credentials:
gcloud container clusters get-credentials CLUSTER_NAME
• Info & Configuration: Get active configuration details:
gcloud config list
• Set default region and zone:
gcloud config set compute/zone ZONE_NAME
     gcloud config set compute/region REGION_NAME
Related quotas
Be mindful of the following when working with the gcloud tool:
1. API rate limits: The gcloud tool leverages GCP's APIs, which
come with rate limits. If you're issuing a large number of
commands in rapid succession, be wary of these limits.
2. Authentication token expiry: Auth tokens have an expiry. If
you face authentication errors, you might need to reauthenticate.
Trivia
1. What does the gcloud config set project PROJECT_ID
command do?
a. Creates a new GCP project.
b. Deletes an existing GCP project.
c. Sets the active GCP project.
d. Lists all GCP projects.
2. If you want to get details about your active gcloud
configuration, which command would you use?
a. gcloud get-config
b. gcloud details

c. gcloud config list
d. gcloud show config
Answers:
1. c. Sets the active GCP project.
2. c. gcloud config list
Resources and tools
Navigating GCP can be daunting, especially for newcomers.
However, GCP offers a plethora of resources, tools, and
documentation designed to assist users at every stage of their cloud
journey. Following are some of the fundamental tools and resources
available:
• Google Cloud documentation [https://cloud.google.com/
docs]: Comprehensive documentation covering every aspect
of GCP. Provides tutorials, how-to guides, references, and best
practices.
• Qwiklabs [https://googlecloud.qwiklabs.com]: A hands-on
learning environment for GCP. Qwiklabs offers labs and quests
based on real-world scenarios to help users get practical
experience.
• Cloud 
Marketplace 
[https://cloud.google.com/
marketplace]: A marketplace for ready-to-go development
stacks, solutions, and services. Helps users quickly deploy
software solutions, thus speeding up development.
• GitHub repositories:
○ GoogleCloudPlatform 
[https://github.com/
GoogleCloudPlatform]: This is the main organization on
GitHub for official GCP
¡ python-docs-samples [https://github.com/
GoogleCloudPlatform/python-docs-samples]:
Python samples for GCP.
¡ Java & Kotlin samples [https://github.com/
GoogleCloudPlatform/java-docs-samples]: Java
samples for GCP.
¡ nodejs-docs-samples [https://github.com/

GoogleCloudPlatform/nodejs-docs-samples]:
Node.js samples for GCP.
○ GoogleCloudDataproc 
[https://github.com/
GoogleCloudDataproc]: Repositories related to Google
Cloud Dataproc, an Apache Spark and Apache Hadoop
service.
○ Terraform-google-modules 
[https://github.com/
terraform-google-modules]: A collection of Terraform
modules tailored for GCP.
○ Googleapis 
[https://github.com/googleapis]: 
The
central hub for all Google Cloud API client libraries.
○ Kubeflow [https://github.com/kubeflow]: A machine
learning toolkit for Kubernetes, primarily hosted on GCP
but can be used on other platforms as well.
○ Dataflowtemplates 
[https://github.com/
GoogleCloudPlatform/DataflowTemplates]: A collection
of pre-implemented Apache Beam pipelines that can be
used to solve a variety of simple but large, in-Cloud data
tasks. The templates are written in Java & Python and can
be used with the Google Cloud Dataflow service. Dataflow
is a managed service that provides a unified platform for
running Apache Beam pipelines.
○ Dataproctemplates 
[https://github.com/
GoogleCloudPlatform/dataproc-templates]: 
Preimplemented Apache Spark pipelines and notebooks in Java
& Python for large-scale cloud tasks like data handling and
machine learning. These templates are designed for Google
Cloud Dataproc, a service for running Spark and Hadoop
workloads.
Conclusion
In this chapter, we started with steps for initial account setup. Then
we explored the role of projects as organizational units. We covered
gcloud command-line, a tool that offers a different dimension of
interaction for those versed in terminal use. Resources and tool’s
section in the end, listed some additional resources to help guide
users towards maximizing their GCP experience.
With this foundational knowledge of GCP's core concepts, including
projects, services, and tools, you're well-prepared to explore more

advanced topics. In the upcoming chapters, we'll delve into specific
GCP services, such as compute, storage, and networking, and learn
how to leverage them to build and deploy your own cloud solutions.
Get ready to dive deeper and unlock the full potential of GCP! In
next chapter we will take a deep dive into storage and compute
options available in GCP.
Multiple choice questions
1. Why are quotas significant in the context of GCP?
a. They determine the user interface's appearance.
b. They set restrictions and limits to ensure fair resource
usage and system stability.
c. They decide the pricing for GCP services.
d. They influence the choice of programming languages
supported.
2. What are 'projects' within GCP primarily used for?
a. Budgeting and Billing
b. Organizational units for organizing resources and
services
c. UI Customization
d. Data Analysis
3. If a user wants to manage multiple GCP resources
cohesively, which entity should they consider setting up
first?
a. A Dataset
b. A VM Instance
c. A Project
d. A Storage Bucket
4. In GCP's resource hierarchy, which comes first: 'folders' or

---

## Sección 29: CHAPTER 2 [Entropy: 0.25]

'projects'?
a. They can be set up simultaneously.
b. Folders, as they can contain multiple projects.
c. Projects, since folders are optional.
d. Neither, as both are independent entities.
5. Why are users advised to monitor their quotas in GCP?
a. To optimize the performance of the applications.
b. To ensure they are not billed for extra services.
c. To avoid service disruptions due to reaching or exceeding
set limits.
d. Both a and c.
6. Which statement is true regarding 'soft' and 'hard' limits
in GCP quotas?
a. Both can be changed by the user at any time.
b. Soft limits are adjustable, while hard limits are nonnegotiable maximums set by GCP.
c. Hard limits can be increased with payment, while soft
limits are static.
d. Soft limits refer to storage, and hard limits refer to
compute resources.
7. If a user exceeds a quota, what immediate action does
GCP typically take?
a. The user's account is suspended.
b. Additional charges are applied to the user's bill.
c. The resource associated with the exceeded quota is
temporarily halted or throttled.
d. The user receives a warning but can continue using the
resource.

Answer key
1. b. They set restrictions and limits to ensure fair resource
usage and system stability.
2. b. Organizational units for organizing resources and
services
3. c. A Project
4. b. Folders, as they can contain multiple projects
5. d. Both a and c
6. b. Soft limits are adjustable, while hard limits are nonnegotiable maximums set by GCP
7. c. The resource associated with the exceeded quota is
temporarily halted or throttled.
Case studies
1. Projects are the organizational units for resources and services
in GCP. Can you explain the benefits of using projects and
how to create and manage them?
2. A healthcare company is using GCP to develop a new machine
learning application. The application is using a lot of
Compute Engine instances, and the company is concerned
about exceeding its quotas. What steps should this company
adopt to handle quota issues proactively?
3. A fintech startup, decided to migrate their infrastructure to
GCP. Initially, the resources they used were minimal.
However, as their customer base grew, so did their
computational needs.
4. One day, a critical data processing job that usually took a few
hours was still running even after 12 hours. On investigating,
the TechOps team realized they had hit their GCP quota limits
for some compute resources. Due to a lack of monitoring and
understanding of quota limits, they were caught unaware,
leading to this service degradation. What steps should be
taken to avoid this issue again?

Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 30: CHAPTER 3 [Entropy: 0.628]

Compute and Storage
Introduction
Need to run a high-traffic website, analyze massive datasets, or
build cutting-edge AI applications? In the dynamic world of cloud
computing, your computing and storage needs can change
dramatically from one project to the next. Storage capabilities can
vary widely across different projects and applications. This chapter
aims to provide an in-depth exploration of the various computing
and storage options available within Google Cloud Platform
(GCP). From scalable virtual machines in Google Compute Engine
(GCE) to container orchestration in Google Kubernetes Engine
(GKE) and from versatile Google Clouds Storage options to
specialized databases like Cloud SQL, Cloud Spanner, and Cloud
Bigtable, this chapter will dissect the features, advantages, and usecases for each service.
Structure
Following is the structure of the chapter:
• Google Compute Engine
• Google Kubernetes Engine
• Anthos
• Cloud storage
• Databases

Objectives
By the end of this chapter, the reader will gain a comprehensive
understanding of the array of computing and storage services
offered by GCP. This includes understanding the specific features,
limitations, and ideal application scenarios for services like GCE,
GKE, and various storage solutions. The chapter aims to equip
readers with the knowledge to make informed decisions when
selecting computing and storage services for their projects, thereby
maximizing efficiency, performance, and cost-effectiveness.
Google Compute Engine
GCE acts as the backbone of GCP's Infrastructure as a Service
(IaaS) offerings. Designed to meet the demands of both small
startups and large enterprises, GCE provides a highly reliable,
scalable, and flexible environment for running virtual machines.
Following is what makes GCE stand out:
The true strength of GCE lies in its scalability and flexibility. Built
on Google's hyper-scale infrastructure, it offers a virtually limitless
environment for your computational tasks. Unlike traditional
physical servers, which can be resource-restrictive and require
significant overhead for maintenance, GCE's virtual machines can be
spun up or down almost instantly to meet the dynamic requirements
of your applications.
Following is the pricing structure
GCE takes a customer-friendly approach to pricing. With its persecond billing and sustained use discounts, it aims to deliver costefficiency and performance. This pricing model is especially
beneficial for enterprises with fluctuating computational needs, as
they are not locked into any long-term contracts and can adapt their
usage based on real-time demands.
Following is why it is reliable and secure:
GCP has been built with security as a foundational principle, and
GCE is no exception. It offers a layered security model, covering
everything from the physical security of the data centers to access
controls for your VMs. Furthermore, GCE boasts of a highavailability Service Level Agreement (SLA), ensuring that your

applications are up and running when you need them the most.
Following is the compatibility and integration:
One of the most understated features of GCE is its ability to
integrate seamlessly with other Google Cloud services, such as
Google Cloud Storage, BigQuery, and GKE. This ecosystem ensures
that you have all the tools you need to build, deploy, and scale
applications in a single, cohesive environment.
Following is why it is quick and easy to manage:
GCE also offers multiple ways to manage your VMs, from a simple
and intuitive console interface to robust command-line tools and
APIs. Whether you are a GUI-oriented user or a developer who
prefers scriptable interfaces, GCE has got you covered.
In summary, GCE offers an environment that is not just powerful
and scalable but also secure, cost-effective, and easy to manage.
Whether you are launching a simple web application or deploying a
complex machine learning model, GCE provides a set of versatile
solutions tailored to meet your specific needs. Figure 3.1 shows UI
for managing VM instances:
Figure 3.1: GCE Home page in pantheon
Key concepts
Following is a brief bulleted list of key concepts in GCE and their
definitions:

• Virtual machines (VMs): The basic units of computing
resources in GCE, containing both hardware and software
components.
• Machine types: Various configurations of CPU, memory, and
storage to cater to different computing needs.
• Zones and regions: Geographical locations where your VMs
run. Regions contain multiple zones for fault tolerance.
• Disk storage options: Various storage solutions like persistent
disks, local SSDs, and RAM disks for diverse application needs.
• Preemptible or Spot VM instances: Short-lived, costeffective VMs that can be terminated by Google at any time.
• Networking: Features such as Virtual Private Cloud (VPC),
load balancing, and CDN to handle network architecture and
traffic.
• Autoscaling: Dynamic adjustment of VM instances based on
workload for optimized resource utilization.
• Snapshots and images: Methods for backing up or
duplicating VM instances for quick deployment.
• Identity and Access Management (IAM): Controls who can
access specific GCE resources and what actions they can take.
• API 
and 
SDK 
support: 
Programmable 
interfaces 
for
automated management and scaling of resources.
• Monitoring and logging: Integrated tools for tracking
performance metrics and logs for debugging and optimization.
Different types of virtual machines
GCE offers different types of VMs, as follows:
General-purpose VMs (N1, N2, N2D, E2, C3):
When it comes to versatility, general-purpose VMs like N1, N2,
N2D, C3 or E2 are often the go-to choice. These VMs are engineered
for a broad spectrum of applications, offering a balanced ratio of
computing power to memory. Ideal for web servers, small
databases, and development environments, these VMs can
effectively serve a multitude of your cloud needs.
Java snippet:
1. Compute compute =

ComputeOptions.getDefaultInstance().getService();
2. MachineType machineType = MachineType.of("zones/your-zone",
"n1-standard-1");
Python snippet:
1. from google.cloud import compute_v1
2. instances_client = compute_v1.InstancesClient()
3. machine_type = "zones/your-zone/machineTypes/n1-standard-1"
Compute-Optimized VMs (C2, H3):
For compute-heavy applications, like scientific simulations and
financial modeling, Compute-Optimized VMs (C2, H3, and more)
are the most suitable. They offer the highest performance per core,
optimized for scenarios where computing capability is the most
critical factor.
Java snippet:
1. MachineType machineType = MachineType.of("zones/your-zone",
"c2-standard-4");
Python snippet:
1. machine_type = "zones/your-zone/machineTypes/c2-standard-4"
Memory-Optimized VMs (M1, M2, M3):
Memory-Optimized VMs such as M1 and M2 excel at memoryintensive workloads like large-scale, in-memory databases and
analytics. These VMs provide a high ratio of memory to vCPUs,
offering excellent performance for applications that require
substantial memory resources.
High-Performance VMs (A2):
Optimized for machine learning and GPU-intensive tasks, High-
Performance VMs like A2 offer a range of options with up to 16
GPUs. These VMs are engineered for applications where parallel
processing and machine learning tasks are predominant.
Shared-Core VMs (e2-micro, e2-small, e2-medium):
If your application has lightweight, non-resource-intensive tasks,
then Shared-Core VMs such as e2-micro, e2-small or e2-medium
offer an extremely cost-effective solution. These VMs share a single
vCPU among multiple instances and are perfect for low-traffic web

---

## Sección 31: CHAPTER 3 [Entropy: 0.59]

servers or small databases.
Preemptible VMs:
These are short-lived instances that are highly cost-effective,
making them perfect for workloads that are transient and
parallelizable. Preemptible VMs are typically utilized for batch
processing and fault-tolerant workloads.
Custom VMs:
For those with specific needs that cannot be met with predefined
VM types, GCP offers the ability to create Custom VMs. You can
specify the exact number of vCPUs and the amount of memory,
offering unparalleled flexibility to meet your exact requirements.
Selecting the Ideal VM type:
Selecting the optimal VM type is imperative to ensure efficiency,
performance, and cost-effectiveness. While GCE offers a multitude
of VM configurations, pinpointing the right fit requires a clear
understanding of your workload characteristics. Following are the
nuanced considerations to guide your selection:
• Nature of your workload:
○ Volume: Quantify the scale of your workload. The sheer
volume will directly correlate with the required number of
vCPUs and the essential memory.
○ Workload 
type: 
Different 
workloads 
have 
varying
demands. For instance, while a basic web server might
operate efficiently with minimal CPU and memory, dataintensive tasks like machine learning or large-scale
simulations would mandate robust configurations.
• Performance specifications:
○ Criticality and demand: Gauge the critical nature of your
applications. Workloads that are performance-sensitive
requiring rapid data processing or high availability, will
necessitate machine types equipped with a larger number of
vCPUs and amplified memory.
• Budgetary constraints: VM costs are influenced by their
configurations. While more vCPUs and greater memory
generally translate to higher prices, it is essential to strike a
balance between performance and expenditure. Additionally,
consider other factors like sustained use discounts or

committed use contracts that can influence the total cost.
• Regional considerations:
○ Pricing variability: VM pricing is not universally standard
across GCE. The region where you deploy your VM can
affect the price due to factors like local demand,
infrastructure, and even data sovereignty regulations.
○ Availability: Not all VM types are available in every region
or zone. When architecting for high availability or catering
to a specific user base, ensure that your desired VM type is
accessible in the targeted region or zone.
• Future-proofing:
○ Scalability & flexibility: Anticipate future growth. While
you might commence with certain VM configurations,
consider how easy it will be to scale or switch VM types as
your needs evolve.
• Complementary resources:
○ Associated storage and networking: Beyond just the CPU
and memory, think about the storage type (such as SSD
versus HDD) and network capabilities (such as standard
versus premium) that might be integral to your workload's
performance.
By methodically evaluating these facets and juxtaposing them
against GCE's vast VM offerings, you can ensure a tailored
infrastructure that aligns seamlessly with your project's
requirements, allowing for both optimal performance and judicious
resource utilization.
By understanding the different VM types and their unique
attributes, you are well-equipped to make educated decisions on
resource allocation tailored to your specific application needs.
Figure 3.2 shows VM options available in different categories:

Figure 3.2: Creating a new VM instance in GCP console
Fun facts
• GCE’s internal architecture was influenced by Google’s Borg,
an internal cluster manager.
• GCE was one of the first to offer per-second billing, shaking up
the cloud pricing models.
Trivia
1. What type of VM instances are available at much lower price,
compared to the price of standard VMs. Compute Engine
might stop (preempt) these instances if it needs to reclaim the
compute capacity for allocation at any time?
Answer: Preemptible VM instances. (also known as Spot VMs)
Google Kubernetes Engine
GKE is Google Cloud's fully managed Kubernetes service, designed
to automate the deployment, scaling, and operations of application
containers. As part of GCP, GKE offers an optimized and seamless
way to build and manage containerized applications.
Following are some key facets:
• Fully managed service: The fully managed attribute means
that Google handles the underlying infrastructure tasks such
as server provisioning, updates, and scaling. This allows you

to focus primarily on your application logic rather than
operational logistics.
• Security and compliance: GKE includes several built-in
security features, ranging from automated updates to
vulnerability scanning, that adhere to industry best practices.
• Scalability and performance: One of the defining attributes
of GKE is its ability to scale applications seamlessly. With
features like cluster autoscaler and Horizontal Pod Autoscaler,
GKE can dynamically adjust resources based on workload
demands.
• Integration with Google Cloud Services: Being a native GCP
service, GKE offers tight integration with other GCP offerings
like Google Cloud Storage, BigQuery, and Cloud Monitoring,
allowing for a more cohesive and streamlined cloud
development experience.
• Open and community-driven: Kubernetes, the engine behind
GKE, is an open-source project. This means GKE benefits from
both Google's innovation and a global community of
contributors, making it a continually evolving platform.
Key concepts
Following are some key concepts regarding GKE:
• Pods: In a Kubernetes environment like GKE, a Pod is the
smallest deployable unit. It can contain one or multiple
containers and manages the shared storage and network
resources for those containers.
• Nodes: These are the worker machines, VMs or physical
servers, in a Kubernetes cluster. Each node runs at least one
Pod.
• Clusters: A Cluster comprises one or more Nodes managed by
a control plane. It is the fundamental operational unit in GKE;
you deploy and manage your containers within a cluster.
• Control plane: This is the management layer of a Kubernetes
cluster. In GKE, the control plane is fully managed by Google,
taking care of orchestration, scaling, and other operational
tasks.
• Kubectl: This is a command-line tool for interacting with a
Kubernetes cluster. It's essential for deploying and managing
applications on GKE.

---

## Sección 32: CHAPTER 3 [Entropy: 0.728]

• Service: In Kubernetes terminology, a Service is an
abstraction that defines a logical set of Pods and enables
external traffic exposure, load balancing, and service
discovery.
• Namespaces: These are virtual clusters within a physical
cluster, used for organizing resources and creating multitenancy environments.
• ConfigMaps and secrets: These are used to manage
configuration data and sensitive information, separating them
from container images to keep the application secure.
• Ingress and Egress: These terms refer to the rules and
policies that govern inbound and outbound network traffic to
and from Pods.
Understanding these key concepts is vital for anyone looking to
master GKE. They form the building blocks of any Kubernetes-based
environment and are integral to application deployment and
management in GKE.
Example with code snippet
The code show some key operations to get you started with GKE,
but the possibilities are vast, from auto-scaling to CI/CD
integrations and more. Following are some examples:
• Creating a Cluster: To create a GKE cluster, you can use the
Google Cloud Console or the gcloud command-line interface.
Following is how you can create a GKE cluster using the
gcloud CLI:
 1. gcloud container clusters create [CLUSTER_NAME] --zone
[ZONE_NAME]
In Python, using Google Cloud Client Libraries is as follows:
 1. from google.cloud import container_v1
 2.  
 3. client = container_v1.ClusterManagerClient()
 4. project_id = 'your_project_id'
 5. zone = 'your_zone'
 6.  
 7. cluster = {
 8. 'name': 'cluster_name',

 9. 'initial_node_count': 3,
10. # ... other cluster settings
11. }
12.  
13. response = client.create_cluster(project_id, zone, cluster)
• Deploying an application: After creating a cluster, you can
deploy applications using Kubernetes manifests. Following is a
simple YAML file for a basic nginx deployment:
 1. apiVersion: apps/v1
 2. kind: Deployment
 3. metadata:
 4.  name: nginx-deployment
 5. spec:
 6.  replicas: 3
 7.  selector:
 8.  matchLabels:
 9.  app: nginx
10.  template:
11.  metadata:
12.  labels:
13.  app: nginx
14.  spec:
15.  containers:
16.  - name: nginx
17.  image: nginx:1.14.2
You deploy this manifest using kubectl:
 1. kubectl apply -f nginx-deployment.yaml
In Java, using Kubernetes Java Client:
1. ApiClient client = Config.defaultClient();
2. Configuration.setDefaultApiClient(client);
3.  
4. V1Deployment body = new V1Deployment(); // define the
deployment specs here

5. String namespace = "default";
6. AppsV1Api api = new AppsV1Api();
7. 
V1Deployment 
result 
=
api.createNamespacedDeployment(namespace, body, null, null,
null);
Scaling: To scale your deployment, you can use the kubectl scale
command, as follows:
 1. kubectl scale deployment nginx-deployment --replicas=5
Fun facts
• GKE Autoscaler: The cluster autoscaler in GKE automatically
resizes the number of nodes in a given node pool, freeing
developers from the task of manual scaling.
• Multi-Cluster Ingress: With GKE, you can manage ingress
(incoming 
traffic 
rules) 
across 
multiple 
clusters
simultaneously, simplifying global deployments.
Trivia
1. What does GKE stand for?
a. Google Kubernetes Explorer
b. Google Kubernetes Engine
c. Google Kernel Environment
d. Google Kubernetes Environment
2. What is the role of a 'node' in GKE?
a. Acts as a gateway for API calls
b. Serves as a worker machine in a cluster
c. Manages the orchestration of containers
d. Provides data storage services
Answers:
1. b. Google Kubernetes Engine
2. b. Serves as a worker machine in a cluster

Anthos
Anthos was introduced by Google to answer the rising demand for a
platform that could unify application deployment and management
across multiple environments—be it Google Cloud, other cloud
providers like AWS and Azure, or even on-premises data centers. Its
hybrid and multi-cloud capabilities promise seamless portability
and consistent management features, allowing organizations to
diversify their cloud strategy without the operational overhead
typically associated with such endeavors.
Following are some pivotal features of Anthos:
• Emphasis on Kubernetes: Built on GKE, Anthos takes
advantage of Kubernetes' extensibility and robustness.
Kubernetes serves as the orchestration layer, enabling
containerized applications to be easily deployed, managed,
and scaled. The Kubernetes-native approach ensures that you
can use the same set of APIs and have a consistent set of
features, irrespective of the underlying infrastructure.
• Security and compliance: Security is a cornerstone feature of
Anthos. It offers integrated security that covers the application
lifecycle from development to runtime. Anthos provides
automated policies and security profiles that adhere to best
practices, making it easier for organizations to meet
compliance requirements. This is crucial for businesses in
regulated industries like healthcare, finance, and government,
where data security and compliance can't be compromised.
• Streamlined operations and cost efficiency: Operational
agility is another compelling feature of Anthos. It streamlines
various DevOps tasks, from CI/CD pipeline integration to
automated monitoring and logging. Its capability to abstract
the underlying infrastructure means less time and effort are
spent on manual configuration and management, translating
to cost savings and faster time-to-market for applications.
• Vendor-agnostic flexibility: One of Anthos' most defining
features is its vendor-agnostic approach. Unlike other cloud
services that may lock you into their ecosystem, Anthos lets
you freely move your workloads across different cloud
providers. This promotes not just flexibility but also resilience,
as it mitigates the risks associated with being tied to a single
cloud provider.

Key concepts for Anthos
Following are some key concepts for Anthos:
• Anthos Config Management: A centralized management
feature that allows you to define, automate, and enforce
policies across your Kubernetes clusters. With Anthos Config
Management, you can manage configurations across multiple
clusters and keep them in sync, ensuring a uniform
environment.
• Anthos Service Mesh: This is an integrated software layer
providing a way to connect, secure, monitor, and manage
microservices. Built on Istio, Anthos Service Mesh adds more
operational functionality, enabling you to understand your
network's behavior, thereby enhancing security and reliability.
• Anthos GKE autopilot: This fully managed Kubernetes
service automatically adjusts and manages your cluster,
including resource allocation and health monitoring. It offers
optimized operations, allowing you to focus more on
development and less on cluster management.
• Binary authorization: A deploy-time security control that
ensures only signed and authorized images are deployed in
your Kubernetes environment. This is particularly useful in
meeting strict compliance requirements.
• Migrate for Anthos: This tool facilitates the migration of VMbased workloads to containerized formats that can be run in
Anthos. It helps streamline the modernization of legacy
applications, saving both time and effort in the long run.
• Cloud run for Anthos: It enables you to be more flexible in
running your serverless applications. You can run them onpremises, on Google Cloud, or even on other cloud providers,
offering a level of portability rarely seen in serverless
architectures.
• Continuous 
monitoring 
and 
logging: 
Anthos 
offers
integrated 
solutions 
like 
Stackdriver 
for 
continuous
monitoring, logging, and debugging, giving you a centralized
platform for managing the health and performance of your
applications.

---

## Sección 33: CHAPTER 3 [Entropy: 0.526]

• Hybrid and multi-cloud API: Anthos exposes a consistent set
of APIs that operate across different cloud providers and onpremises environments, giving you a uniform way to interact

with resources, irrespective of where they are hosted.
By understanding these key concepts, you equip yourself with the
knowledge needed to navigate Anthos’ diverse and flexible
offerings. These building blocks will serve as the basis for our more
in-depth exploration in the subsequent sections of this chapter.
Examples with code snippets
Anthos offers a range of capabilities to streamline Kubernetes
operations across different environments. Two of its standout
features are Anthos Config Management and Anthos Service Mesh.
Following snippet will provide you with a better understanding of
how to manage your clusters and services within Anthos:
• Anthos Config Management: You can apply a centralized
configuration across multiple Kubernetes clusters using Anthos
Config Management. Following is a YAML configuration
example for enabling a NetworkPolicy:
 1. apiVersion: networking.k8s.io/v1
 2. kind: NetworkPolicy
 3. metadata:
 4. name: allow-same-namespace
 5. spec:
 6. podSelector:
 7. matchLabels:
 8. role: frontend
 9. policyTypes:
10. - Ingress
11. ingress:
12. - from:
13. - podSelector:
14. matchLabels:
15. role: frontend
To apply this policy, you could use the following command:
 1. kubectl apply -f network-policy.yaml
• Anthos Service Mesh: To implement Anthos Service Mesh,
you would need to install Istio. Following is how you can

install Istio using the istioctl command:
 1. istioctl install --set profile=demo
After installing Istio, you can deploy a sample application to see the
Service Mesh in action, as follows:
1. kubectl create namespace sample-app
2. kubectl label namespace sample-app istio-injection=enabled
3. kubectl apply -f sample-app.yaml -n sample-app
Key use-cases of Anthos
Following are some key use cases where Anthos service is used:
• Modernizing applications: Anthos can be used to modernize
applications by migrating them to a cloud-native environment.
This can help you improve the performance, scalability, and
security of your applications.
• Deploying microservices: Anthos can be used to deploy
microservices-based applications. This can help you improve
the agility and scalability of your applications.
• Running hybrid and multi-cloud applications: Anthos can
be used to run applications on a hybrid or multi-cloud
environment. This can help you improve the flexibility and
resilience of your applications.
• Managing Kubernetes clusters: Anthos can be used to
manage Kubernetes clusters across multiple clouds. This can
help you simplify the management of your Kubernetes
clusters.
• Securing applications: Anthos can be used to secure
applications by providing a unified security policy across all
your clusters. This can help you improve the security of your
applications.
• Monitoring and troubleshooting applications: Anthos can
be used to monitor and troubleshoot applications across
multiple clouds. This can help you improve the performance
and availability of your applications.
Fun fact
Anthos originated as GKE on-prem and was formally announced at
Google Cloud Next ’19.

Trivia
1. What underlying technology does Anthos Service Mesh
use?
a. Bash
b. Istio
c. Envoy
d. Nginx
2. What is the purpose of Anthos Config Management?
a. Load balancing
b. Centralized configuration management
c. Database replication
d. Content caching
Answers:
1. b. Istio
2. b. Centralized configuration management
Cloud Storage
Google Cloud Storage is more than just a place to store your data;
it's an integrated storage solution within the GCP ecosystem. This
means that GCS seamlessly connects with other GCP services, such
as Compute Engine, BigQuery, and Dataproc, enabling you to build
powerful data pipelines and applications. Designed for developers,
enterprises, and data analysts, GCS excels in scalability, durability,
and versatility. You can store petabytes of data and access it quickly
and reliably, with options for different storage classes to meet your
specific needs and budget. Whether you're storing website content,
backups, or massive datasets for analysis, GCS provides a secure and
cost-effective solution for all your data storage needs.
GCS is an object storage service that can store any type of data,
including images, videos, audio, and documents. It is designed to be

scalable, durable, and highly available.
It is built on top of Google's infrastructure, which is designed to
handle even the most demanding workloads. Your data is stored in
multiple locations, so it is always available, even if one location
experiences a failure. GCS is also highly available, with a 99.9%
uptime SLA.
GCS offers a variety of storage classes to meet different needs. These
classes offer different levels of performance, durability, and cost.
For example, standard storage is a good choice for general-purpose
workloads, while nearline storage is a good choice for less
frequently accessed data.
Following are some key characteristics of GCS:
• Scalability: One of the most striking features of Google Cloud
Storage is its ability to scale automatically. You do not need to
provision storage or worry about architecture changes as your
data grows. This is particularly beneficial for businesses that
experience seasonal fluctuations or are in a growth phase.
• Durability: GCS boasts an impressive 11 9's of durability,
meaning the likelihood of losing your data is extremely low.
This level of durability is made possible through Google's
state-of-the-art infrastructure that replicates data over
multiple locations, ensuring its safety and accessibility.
• Versatility: The service is versatile enough to handle a variety
of data types and use cases. Whether you are serving
multimedia content, storing backups, or collecting vast
amounts of sensor data, GCS has you covered. Its
compatibility with multiple storage classes allows you to
optimize cost and performance based on your specific needs.
• Global reach: GCS is part of Google's globally distributed data
center network, enabling low-latency and high-throughput
performance. You can choose the location of your storage
based on your customer demographics, regulatory needs, or
other business-specific criteria.
• Integration: GCS integrates seamlessly with other Google
Cloud services. From running big data analytics through
BigQuery to building machine learning use cases in Vertex AI,
the possibilities are numerous.
• API access: A variety of APIs, including XML and JSON APIs,

---

## Sección 34: CHAPTER 3 [Entropy: 0.838]

are supported to interact programmatically with GCS. This
allows for easy migration from other cloud storage providers
and gives you the flexibility to manage, analyze, and
manipulate your data programmatically.
Google Cloud Storage is not just a place to dump your data. It's a
comprehensive, robust solution designed to solve a myriad of data
storage and management challenges. Whether you are a large
enterprise or a single developer, the versatility, durability, and
scalability of GCS are designed to meet your needs. Table 3.1
highlights the main characteristics of different storage classes in
GCP:
Storage
class
Data
availability
Retrieval
SLA
Data durability
Geographic
location
Standard
99.999999999
10 ms
99.999999999%
Multi-
Regional,
Regional
Fr
ac
st
an
Nearline
99.9
30 mins
99.999999999%
Single Region
D
le
b
ra
w
Coldline
99.9
4 hours
99.999999999%
Single Region
D
le
an
sl
av
Archive
99.9
12 hours
99.999999999%
Single Region
Lo
ar
ac
Table 3.1: Different storage classes offered by Google Cloud Storage
Key Criteria for storage selection is as follows:
• Data availability: How readily the data is available for
access.
• Data durability: Likelihood that your data will not be lost.

• Geographic location: Indicates where data is stored.
• Use case: Suitable scenarios for using the specific storage
class.
• Cost: Relative costs, with '$$$$' being the most expensive and
'$' is the least.Top of Form
Key concepts
This section encapsulates the key concepts you will need to
understand as you delve into the world of Google Cloud Storage.
These foundational principles provide the basis for more advanced
features and functionalities that GCS offers.
Following are the key concepts you need to know while working
with GCS:
• Buckets: In Google Cloud Storage, a "bucket" is the
fundamental container for data storage. Think of it as a
directory where you can organize your files, except it resides
in the cloud. Buckets are globally unique and offer
configurable geographic locations and storage classes.
• Objects: Objects are the individual files you store in buckets.
An object is composed of the data itself, metadata, and an
object ID unique to the bucket it resides in. Objects are
immutable, meaning once they are created, they cannot be
changed, only overwritten or deleted.
• Storage classes: GCS offers different storage classes to
optimize cost and performance, including Standard, Nearline,
Coldline, and Archive. These classes differ in terms of
availability, minimum storage duration, and cost, allowing
you to tailor your storage solution to your specific needs.
• Data lifecycle: Google Cloud Storage provides lifecycle
management policies that you can configure to automatically
transition or delete data based on certain criteria such as age
or storage class. This automates the process of data
management and can help optimize costs.
• Identity and Access Management: Control who has access to
your buckets and objects with Google Cloud's IAM. You can
set granular permissions and roles, from read-only to full
administrative access, both at the bucket and object levels.
• Encryption: GCS offers several options for data encryption,

both at rest and in transit. By default, data is encrypted before
it is written to disk. Additionally, you can opt for customermanaged keys for enhanced security.
• Versioning: Object versioning is a feature that keeps a history
of all changes made to an object. This is useful for backup and
disaster recovery scenarios.
• Consistency: GCS provides strong consistency, meaning once
a write is acknowledged, the object is immediately accessible,
and any subsequent reads will reflect that write.
Examples with code snippet
Diving into the practical side of Google Cloud Storage, Following
are a few hands-on examples that illustrate common operations:
• Creating a bucket: Creating a bucket is a foundational step in
Google Cloud Storage. Following is a Python code snippet
using the Google Cloud Python SDK to create a bucket.
These are some basic operations you can perform with
Google Cloud Storage. Each of these operations can be
customized further based on your specific requirements.
1. from google.cloud import storage
2. def create_bucket(bucket_name):
3. storage_client = storage.Client()
4. bucket = storage_client.create_bucket(bucket_name)
5. print(f'Bucket {bucket.name} created.')
6.  
7. bucket_name = "my-new-bucket"
8. create_bucket(bucket_name)
Following is the equivalent operation using gsutil from the
command line:
 1. gsutil mb gs://my-new-bucket
• Uploading an object: To upload a file to your bucket, you
can use the following Python code:
 
1. 
def 
upload_blob(bucket_name, 
source_file_name,
destination_blob_name):
 2. storage_client = storage.Client()
 3. bucket = storage_client.bucket(bucket_name)

 4. blob = bucket.blob(destination_blob_name)
 5. blob.upload_from_filename(source_file_name)
 6. print(f'File {source_file_name} uploaded to
{destination_blob_name}.')
 7.  
 8. source_file_name = "local/path/to/file"
 9. destination_blob_name = "storage-object-name"
10. 
upload_blob(bucket_name, 
source_file_name,
destination_blob_name)
In Java, the code will be as follows:
 1. import com.google.cloud.storage.Blob;
 2. import com.google.cloud.storage.BlobId;
 3. import com.google.cloud.storage.BlobInfo;
 4. import com.google.cloud.storage.Storage;
 5. import com.google.cloud.storage.StorageOptions;
 6.  
 7. public class UploadObject {
 8. public static void uploadObject(
 9. String projectId, String bucketName, String
objectName, String filePath) {
10. // Initialize client that will be used to send requests.
11. 
 
 
 
 
 
 
Storage 
storage 
=
StorageOptions.newBuilder().setProjectId(projectId).build().getService()
12. BlobId blobId = BlobId.of(bucketName, objectName);
13. 
 
 
 
 
 
 
BlobInfo 
blobInfo 
=
BlobInfo.newBuilder(blobId).build();
14. 
 
 
 
 
 
 
storage.create(blobInfo,
Files.readAllBytes(Paths.get(filePath)));
15.  
16. System.out.println(
17. "File " + filePath + " uploaded to bucket " +
bucketName + " as " + objectName);
18. }
19. }
• Listing objects in a bucket: You can list all objects in a

---

## Sección 35: CHAPTER 3 [Entropy: 0.788]

bucket using the following Python code snippet:
 1. def list_blobs(bucket_name):
 2. storage_client = storage.Client()
 3. bucket = storage_client.bucket(bucket_name)
 4. blobs = bucket.list_blobs()
 5. 
 6. for blob in blobs:
 7. print(blob.name)
 8.  
 9. list_blobs(bucket_name)
Fun facts
• Multi-regional buckets: GCS allows you to host your data in
multi-regional buckets for higher availability, which ensures
your data is stored in at least two separate geographic
locations separated by at least 100 miles.
• Customer-supplied encryption keys: You can provide your
encryption keys if you do not want Google to manage them for
you.
Trivia
1. What are the storage classes offered by Google Cloud
Storage?
a. Multi-Regional, Regional, Nearline, Coldline
b. SSD, HDD, Nearline, Coldline
c. Standard, Durable, Nearline, Coldline
d. Local, Regional, Global, Nearline
2. Which feature allows you to restore previous versions of
an object?
a. Strong Consistency
b. Multi-Regional Buckets
c. Object Versioning
d. Customer-Supplied Encryption Keys
Answers
1. a. Multi-Regional, Regional, Nearline, Coldline

2. c. Object Versioning
Databases
A database is a collection of data that is organized in a way that
makes it easy to access and use. Databases are used to store all sorts
of data, from customer records to product inventory to financial
information.
There are many different types of databases, each with its own
strengths and weaknesses. Some of the most common types of
databases are as follows:
• Relational databases: Relational databases are the most
common type of database. They store data in tables, which are
made up of rows and columns. Relational databases are good
for storing structured data, such as customer records or
product inventory.
• NoSQL databases: NoSQL databases are a newer type of
database that is not based on the relational model. NoSQL
databases are good for storing unstructured data, such as
social media or sensor data.
• In-memory databases: In-memory databases store data in
memory rather than on disk. This makes them fast, but they
can only store a limited amount of data.
When it comes to databases, GCP offers a wide range of database
options to meet the needs of businesses of all sizes. These options
are as follows:
• Cloud SQL: Cloud SQL is a fully managed database service
that makes it easy to set up, maintain, manage, and administer
your relational databases on the GCP. It supports a variety of
database engines, including MySQL, PostgreSQL, and SQL
Server.
• Cloud Spanner: Cloud Spanner is a relational database service
that offers strong consistency at a global scale. It is a good
choice for businesses that need a highly reliable and consistent
database for mission-critical applications. Cloud Spanner is
available in multiple regions and zones, so your data is always
available.
• Cloud Bigtable: Cloud Bigtable is a NoSQL wide-column
database that is designed for large-scale data sets. It is a good

choice for businesses that need to store and analyze large
amounts of data, such as real-time analytics and machine
learning applications. Cloud Bigtable is highly scalable and
can handle petabytes of data.
• Cloud Datastore: Cloud Datastore is a NoSQL document
database designed for mobile and web applications. It is a
good choice for businesses that need a scalable and flexible
database for storing and accessing data. Cloud Datastore is
easy to use and can be integrated with other GCP services.
• Cloud Memorystore for Redis: Cloud Memorystore for Redis
is a fully managed Redis service that makes it easy to set up,
maintain, manage, and administer your Redis instances on
GCP. Redis is an in-memory data structure store often used for
caching and session management. Cloud Memorystore for
Redis is a good choice for businesses that need a highperformance and scalable Redis solution.
This section will delve into these offerings, highlighting their key
features, advantages, and ideal use cases.
Cloud SQL
Cloud SQL is a fully managed relational database service offered by
GCP. Designed to provide a hassle-free setup, maintenance, and
administration of relational databases, it supports various database
engines, including MySQL, PostgreSQL, and SQL Server.
Following is a summary of it is main features:
• Managed service: Cloud SQL abstracts away most of the
operational 
challenges. 
Google 
Cloud 
ensures 
the
infrastructure 
provisioning, 
database 
setup, 
patch
management, and backups are handled automatically.
• High availability: With built-in failover capabilities, Cloud
SQL offers up to 99.995% availability. It's designed with
redundancy in mind and offers automated backups, allowing
for point-in-time recovery.
• Scalability: You can scale your database instance vertically
and horizontally based on your needs. Vertical scaling is as
simple as choosing a larger machine type.
• Security: Cloud SQL offers built-in security features like data
encryption and Identity and Access Management roles,
ensuring that your data is protected.

• Engine support: MySQL, PostgreSQL, and SQL Server are all
supported, giving you the flexibility to use your preferred
database engine.
• Data migration: The service comes equipped with features to
help you move your existing databases to the cloud, including
data import/export and database replication features.
Examples with code snippets
Following is how to create a new Cloud SQL instance using gcloud:
1. gcloud sql instances create [INSTANCE_NAME] \
2. --database-version=POSTGRES_9_6 \
3. --tier=db-f1-micro \
4. --region=[REGION] 
For connecting to it using Python, is as follows:
1. import psycopg2
2.  
3. conn = psycopg2.connect(
4. host="[CLOUD_SQL_HOST]",
5. dbname="[DB_NAME]",
6. user="[DB_USER]",
7. password="[DB_PASSWORD]"
8. )
AlloyDB
AlloyDB is a relatively new addition to Google's suite of database
solutions. It is designed to provide automated, real-time business
insights by acting as a 'smart' database. This cloud-native database
automates a lot of tasks that would traditionally require manual
intervention, thereby optimizing operational efficiency.
Following are some main highlights of this service:
• Real-time insights: AlloyDB is engineered for real-time
analytics, providing actionable insights almost immediately.
• Automated management: AlloyDB comes with automated
features for backups, scaling, and other database management
tasks, reducing the operational burden on your team.
• Data intelligence: With its built-in data analytics capabilities,

---

## Sección 36: CHAPTER 3 [Entropy: 0.671]

AlloyDB can help businesses make more informed decisions
based on data.
NoSQL databases
NoSQL databases are designed to provide flexible schemas, scale
horizontally, and enable quick iterations. They are ideal for largescale applications that require the storing of semi-structured data.
Google Cloud offers several NoSQL database options, each with its
unique set of capabilities: Cloud Bigtable, Cloud Spanner, and Cloud
Datastore.
BigTable
Cloud Bigtable is Google's NoSQL Big Data database service. It is a
fully managed NoSQL wide-column database service that is
designed for large-scale data sets. It is a good choice for businesses
that need to store and analyze large amounts of data, such as realtime analytics and machine learning applications. Cloud Bigtable is
highly scalable and can handle petabytes of data.
Cloud Bigtable has a number of key features that make it a good
choice for storing and analyzing large amounts of data as follows:
• Scalability: Cloud Bigtable is highly scalable and can handle
petabytes of data.
• Performance: Cloud 
Bigtable 
is 
designed 
for 
high
performance and can handle high-volume reads and writes.
• Durability: Cloud Bigtable is designed to be highly durable
and can withstand even the most demanding workloads.
• Security: Cloud Bigtable is secure and offers a variety of
features to protect your data.
• Availability: Cloud Bigtable is highly available and can be
accessed from anywhere in the world.
• Open-source interface: Supports popular open-source APIs
like HBase.
• Real-time analytics: Designed for both operational and
analytical applications.
Bigtable is a good choice for a wide variety of use cases, as follows:
• Real-time analytics: Cloud Bigtable can be used to store and
analyze large amounts of data in real time. This can be used

for applications such as fraud detection, anomaly detection,
and customer behavior analysis.
• Machine learning: Cloud Bigtable can be used to store and
train machine learning models. This can be used for
applications such as image recognition, natural language
processing, and speech recognition.
• IoT: Cloud Bigtable can be used to store and analyze data
from IoT devices. This can be used for applications such as
asset tracking, predictive maintenance, and customer behavior
analysis.
• Log analytics: Cloud Bigtable can be used to store and
analyze logs from applications and systems. This can be used
for applications such as troubleshooting, security auditing,
and compliance reporting.
Creating a BigTable instance using `gcloud`:
1. 
gcloud 
bigtable 
instances 
create 
[INSTANCE_ID] 
--
cluster=[CLUSTER_ID] 
--cluster-zone=[CLUSTER_ZONE] 
--displayname=[DISPLAY_NAME]
Spanner
Cloud Spanner combines the best of relational database structures
with NoSQL horizontal scaling. It is a fully managed relational
database service that offers strong consistency at a global scale. It is
a good choice for businesses that need a highly reliable and
consistent database for mission-critical applications. It offers high
availability and strong consistency across a globally distributed data
architecture.
Cloud Spanner has a number of key features that make it a good
choice for mission-critical applications, as follows:
• Strong consistency: Cloud Spanner offers strong consistency,
which means that all reads and writes are guaranteed to be
visible to all users at the same time. This is important for
applications that require accurate and up-to-date data.
• Global scale: Cloud Spanner is available in multiple regions
and zones, so your data is always available, even if one region
or zone experiences a failure.
• High availability: Cloud Spanner is highly available and can
be accessed from anywhere in the world.

• Durability: Cloud Spanner is designed to be highly durable
and can withstand even the most demanding workloads.
• Security: Cloud Spanner is secure and offers a variety of
features to protect your data.
• SQL Queries: Spanner supports ANSI 2011 SQL queries with
extensions.
Java code to insert data into a Spanner table:
1. Mutation mutation = Mutation.newInsertBuilder("MyTable")
2. .set("Id").to(1)
3. .set("Name").to("Item1")
4. .build();
5. databaseClient.write(Arrays.asList(mutation));
Cloud Spanner is a good choice for a wide variety of mission-critical
applications, as follows:
• Financial services: Cloud Spanner can store and manage
financial data, such as customer accounts, trading, and market
data.
• Healthcare: Cloud Spanner can store and manage patient
data, such as medical records, test results, and billing
information.
• Retail: Cloud Spanner can store and manage product data,
such as inventory levels, pricing information, and customer
orders.
• Logistics: Cloud Spanner can store and manage shipping data,
such as tracking information, delivery schedules, and
inventory levels.
• Manufacturing: Cloud Spanner can store and manage
production data, such as machine data, quality control data,
and inventory levels.
Datastore
Cloud Datastore is a fully managed NoSQL document database
service that is designed for mobile and web applications. It is a good
choice for businesses that need a scalable and flexible database for
storing and accessing data. Cloud Datastore is easy to use and can
be integrated with other GCP services.
Cloud Datastore has a number of key features that make it a good

choice for mobile and web applications, as follows:
• Scalability: Cloud Datastore is highly scalable and can handle
the needs of even the most demanding applications.
• Flexibility: Cloud Datastore is a NoSQL database, which
means that it is schemaless and can be used to store any type
of data.
• Performance: Cloud 
Datastore 
is 
designed 
for 
high
performance and can handle high-volume reads and writes.
• Durability: Cloud Datastore is designed to be highly durable
and can withstand even the most demanding workloads.
• Security: Cloud Datastore is secure and offers a variety of
features to protect your data.
Python code to insert data into a datastore table, as follows:
 1. from google.cloud import datastore
 2.  
 3. client = datastore.Client()
 4. entity = datastore.Entity(key=client.key('MyEntity'))
 5. entity.update({
 6. 'foo': 'bar',
 7. 'baz': 1337
 8. })
 9. client.put(entity);
Cloud Datastore is a good choice for a wide variety of mobile and
web applications, as follows:
• Ecommerce: Cloud Datastore can be used to store and
manage product data, such as inventory levels, pricing
information, and customer orders.
• Social networking: Cloud Datastore can be used to store and
manage user data, such as profiles, friends, and posts.
• Games: Cloud Datastore can be used to store and manage
game data, such as levels, characters, and items.
• Log analytics: Cloud Datastore can be used to store and
analyze logs from applications and systems.
• Content management systems: Cloud Datastore can be used
to store and manage content, such as blog posts, articles, and

---

## Sección 37: CHAPTER 3 [Entropy: 0.475]

images.
Data Transfer Service
Cloud Data Transfer Service is a fully managed service that helps
you automate the transfer of data between cloud storage providers,
on-premises data sources, and GCP services. It can be used to
transfer data from a variety of sources, including Amazon S3, Azure
Blob Storage, FTP servers, and Google Cloud Storage. It ensures that
data migration is secure, quick, and cost-effective.
Cloud Data Transfer Service has a number of key features that make
it a good choice for automating data transfers, as follows:
• Automated: Cloud Data Transfer Service can be used to
automate the transfer of data on a schedule, so you don't have
to worry about it manually.
• Scalable: Cloud Data Transfer Service can be scaled to
transfer large amounts of data quickly and efficiently.
• Secure: Cloud Data Transfer Service uses secure protocols to
transfer data, so you can be confident that your data is safe.
• Reliable: Cloud Data Transfer Service is a reliable service that
is backed by Google's infrastructure.
To initiate a transfer operation using the gsutil command line is as
follows:
gsutil -m cp -r [SOURCE_DIRECTORY] gs://[DESTINATION_BUCKET]
Cloud Data Transfer Service can be used for a wide variety of use
cases, as follows:
• Migrating data to GCP: Cloud Data Transfer Service can be
used to migrate data from other cloud storage providers to
GCP.
• Backing up data: Cloud Data Transfer Service can be used to
back up data from on-premises data sources to GCP.
• Ingesting data into analytics pipelines: Cloud Data Transfer
Service can be used to ingest data into analytics pipelines for
analysis.
• Synchronizing 
data 
between 
cloud 
storage
providers: Cloud Data Transfer Service can be used to
synchronize data between cloud storage providers.

• Replicating data for disaster recovery: Cloud Data Transfer
Service can be used to replicate data for disaster recovery
purposes.
Choosing the right database
Selecting the most appropriate database on the GCP is vital for
ensuring optimal performance, scalability, and cost-effectiveness.
The best choice hinges on various considerations, and
understanding them is the key to making an informed decision.
Following are the factors influencing your choice:
• Nature of data (structured vs semi-structured vs.
unstructured): Your data could be neatly categorized in
tables (like user information) or be varied and unstructured
(like social media posts). While Cloud SQL is tailor-made for
structured, relational data, databases like Cloud Bigtable shine
when dealing with NoSQL, unstructured data.
• Volume of data (data size): Databases vary in their capacity
to handle data volumes. For colossal datasets running into
petabytes, Cloud Bigtable stands out. On the other hand,
Cloud Datastore is more apt for applications with moderate
data sizes, providing efficient operations without overprovisioning.
• Performance expectations (consistency and scale): The
expected user load and the geographic distribution of your
user base will influence your database pick. For applications
that demand strong consistency on a global scale, Cloud
Spanner is unparalleled. However, for tasks where high-speed
data reads are more frequent than writes, Cloud Bigtable
might offer superior performance.
• Economic considerations (budgeting and cost): Database
costs are not just about storage; they encompass factors like
read-write operations, backup, and network costs. Weighing
these components against your budget can influence your
decision. For example, while Cloud Spanner provides robust
global consistency, its cost might be higher compared to other
solutions for specific use-cases.
• Operational flexibility (ease of management & scaling):
Some databases offer automated backups, scaling, and
maintenance, reducing operational overhead. Depending on
your team's expertise and the time you wish to invest in

database management, services like Cloud SQL might be
preferred due to their managed nature.
• Integration 
and 
compatibility 
(ecosystem 
synergy):
Consider how your chosen database aligns with other GCP
services and your tech stack. Some databases offer smoother
integrations, ensuring a cohesive and streamlined operational
experience.
In sum, GCP offers a plethora of robust database solutions, each
designed with specific use cases in mind. Analyzing the unique
requirements of your application and mapping them to the strengths
of each database will pave the way for a seamless, efficient, and
cost-effective digital ecosystem.
Conclusion
The database is an essential part of any modern application. The
right database can help you store and manage your data efficiently
and effectively. GCP offers a wide range of database options to meet
the needs of businesses of all sizes. By choosing the right database
for your needs, you can ensure that your data is secure, reliable,
and accessible. As we transition from the foundational layers of
storage and databases, the next logical step is to delve into the tools
and services that help us derive meaningful insights from this data.
In next chapter we will delve into data and analytics offerings that
empower organizations to analyze, interpret, and capitalize on their
vast data reservoirs.
Multiple choice questions
1. Which of the following is a managed, relational database
service on GCP?
a. Google Cloud Storage
b. Cloud Bigtable
c. Cloud Datastore
d. Cloud SQL
2. GKE stands for

a. Google Kubernetes Environment
b. Google Kernel Engine
c. Google Kubernetes Engine
d. Google Keynote Environment
3. If you need a NoSQL database for large analytical and
operational workloads, which GCP service would be most
suitable?
a. Cloud SQL
b. Spanner
c. Cloud Bigtable
d. Google Cloud Storage
4. Which 
GCP 
service 
provides 
globally 
distributed,
horizontally scalable, multi-versioned NoSQL database
with SQL support?
a. Cloud Datastore
b. Cloud Spanner
c. Google Cloud Storage
d. Cloud SQL
5. For storing unstructured data like videos or images,
which GCP service would be ideal?
a. Cloud SQL
b. Google Compute Engine
c. Google Kubernetes Engine
d. Google Cloud Storage
6. Which GCP service is primarily designed for computeintensive 
tasks, 
allowing 
users 
to 
launch 
virtual
machines?

---

## Sección 38: CHAPTER 3 [Entropy: 0.25]

a. Google Compute Engine (GCE)
b. Google Cloud Storage (GCS)
c. Google Cloud Functions
d. Google Cloud Dataflow
7. Spanner combines features of both traditional RDBMS
and NoSQL databases. This feature is described as:
a. Global Distribution
b. Hybrid Database Model
c. Object-Oriented Structure
d. Modular Database System
8. Which GCP service provides a managed Kubernetes
environment for deploying, managing, and scaling
containerized applications using Google's infrastructure?
a. Google Compute Engine
b. Google Cloud Storage
c. Google Cloud Functions
d. Google Kubernetes Engine
Case studies
1. Global e-commerce expansion
Background: A leading e-commerce platform, ABC Corp,
with major operations in Europe, wants to expand its
footprint globally. As they tap into the Asian and North
American markets, the platform anticipates a 5-fold increase
in user traffic and a massive influx of product images and
reviews.
Challenge: ABC Corp existing infrastructure, hosted in
European data centers, isn't designed to handle such scale and
lacks the latency needed for a seamless user experience in
Asia and North America.

2. Gaming analytics
Background: XYZ Games, a gaming company, recently
launched an online game that quickly garnered a million daily
active users. They wanted insights into user behavior, level
difficulty, and in-app purchases to refine and monetize their
game better.
Challenge: The volume of data generated was colossal.
Traditional RDBMS could not offer real-time insights due to
the magnitude and nature of the gaming data.
3. Media house archive revamp
Background: A global media house, possesses 50 years of
video archives. They decided to digitize and monetize this
content through an online streaming platform.
Challenge: Storing, categorizing, and rapidly accessing
petabytes of video content were daunting. Their legacy
storage solution was expensive and not cut out for streaming
needs.
Answer key
1. d. Cloud SQL
2. c. Google Kubernetes Engine
3. c. Cloud Bigtable
4. b. Cloud Spanner
5. d. Google Cloud Storage
6. a. Google Compute Engine (GCE)
7. b. Hybrid Database Model
8. d. Google Kubernetes Engine
Case studies
1. Migrate their website's backend to GKE, leveraging its
scalable containerized infrastructure. This will enable
seamless auto-scaling of resources based on traffic demands.
To cater to the global audience, utilized Google Cloud Storage
multi-region buckets, ensuring quick access to product images

and data with low latency. For their relational database
needs, adopt Cloud SQL, leveraging its global replicas feature
to distribute data across continents, ensuring high availability
and regional data accessibility.
2. Adopt a hybrid database model. Store user-profiles and
transaction data in Cloud SQL for its ACID properties. For
gaming analytics, utilize Bigtable, capturing billions of daily
events in real time. For global game state management and
consistency, chose Spanner, preventing any game data
discrepancies for users across the world.
3. Opt for Google Cloud Storage for its durability, low cost, and
easy integration with streaming tools. Utilize the Nearline and
Coldline storage classes to archive older, less-accessed content
cost-effectively. Employ GCE or similar other compute
services for processing and categorizing videos, extracting
metadata, and encoding them into various formats.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 39: CHAPTER 4 [Entropy: 0.64]

Data and Analytics
Introduction
Want to unlock the power of your data to gain valuable insights and
drive better business decisions? With the rise of cloud computing,
data analytics has been revolutionized, and Google Cloud Platform
(GCP) is leading the charge. This chapter is dedicated to
understanding the suite of GCP's Data and Analytics services. These
services and tools are designed to empower businesses by
harnessing the full potential of data—right from its ingestion to
actionable insights. This chapter provides an in-depth look into
BigQuery for data querying, Dataproc for running Apache Spark and
Hadoop workflows/clusters, Dataflow for real-time and batch data
processing, DataFusion for data integration, and several other GCP
services that revolutionize data analytics.
Structure
Following is the structure of the chapter:
• BigQuery
• Dataproc
• Dataflow
• Dataplex
• DataFusion

• Looker
Objectives
By the end of this chapter, you'll be able to navigate GCP's data and
analytics services with confidence. The chapter aims to equip you
with the knowledge and practical skills needed to select the right
tools for your data analytics needs. Whether you are dealing with
real-time analytics, large-scale data processing, or simply looking to
integrate multiple data sources for comprehensive insights, this
chapter serves as a definitive guide to making informed decisions
and effectively utilizing GCP's data and analytics offerings.
BigQuery
BigQuery is Google Cloud's fully managed, serverless data
warehouse that enables super-fast SQL queries using the processing
power of Google's infrastructure. By allowing users to analyze data
across billions of rows in seconds, BigQuery represents a paradigm
shift in the way businesses think about data analytics. Its serverless
architecture means there is no need for database administrators to
manage any infrastructure, thereby making it an ideal choice for
businesses that want to focus more on analytics and less on
managing servers.
Key concepts of BigQuery
Ready to analyze terabytes of data in seconds? This section aims to
equip you with a solid understanding of BigQuery's key concepts,
providing the foundation you need to understand its powerful data
analytics capabilities effectively.
Following are some key concepts:
• Serverless: BigQuery is serverless, allowing businesses to
focus on data analysis rather than managing infrastructure.
Unlike traditional databases, where you would need to
consider factors like server size, storage limits, and software
updates, BigQuery takes care of all these aspects for you. In a
serverless architecture, you are billed only for the queries you
run.
Real-time analytics is a key selling point for BigQuery. It offers

streaming data ingestion, meaning you can stream your data
and see your analytics reports updated almost in real time.
This feature is essential for businesses that require timely
insights for decision-making. BigQuery can handle ingestion
rates of up to millions of rows per second.
Example: For streaming data into BigQuery:
from google.cloud import bigquery
# Initialize the BigQuery client
client = bigquery.Client()
 
# Define table
table = client.dataset('my_dataset').table('my_table')
 
# Define data to stream
rows_to_insert = [
 {u"full_name": u"John Doe", u"age": 30},
 {u"full_name": u"Jane Doe", u"age": 40},
]
 
# Stream data
errors = client.insert_rows_json(table, rows_to_insert)
• Standard SQL: BigQuery uses a dialect of SQL compliant with
ANSI: 2011 standards, making it easier for those familiar with
SQL to use the service. This also allows for easier migration
from traditional Relational database management systems
(RDBMS) to BigQuery. It supports most of the standard SQL
data types, operators, and functions.
Example: Using JOIN operation in BigQuery SQL:
SELECT a.name, b.salary FROM employee_data a JOIN
salary_data b ON a.emp_id = b.emp_id; 
• Partitioned 
and 
clustered 
tables: 
BigQuery 
offers
partitioning and clustering as powerful tools to optimize query
performance and reduce costs.
Partitioning divides a large table into smaller, manageable
subsets called partitions based on a specific column (e.g., date,
country). This organization allows BigQuery to scan only

relevant partitions when querying data, significantly
improving query performance and reducing costs. For
example, if you have a table containing sales data partitioned
by date, querying sales for a specific month only requires
scanning the corresponding partitions, rather than the entire
table.
Clustering further enhances query performance by sorting data
within partitions based on one or more columns. This
organization enables BigQuery to efficiently locate and
retrieve data, especially for range-based queries. Imagine a
table of product sales data clustered by product category.
When querying sales for a specific product category, BigQuery
can quickly access the relevant data within the corresponding
partitions.
By effectively combining partitioning and clustering, you can
create highly optimized BigQuery tables that deliver
exceptional query performance and cost savings.
Creating a partitioned table as follows:
CREATE TABLE `your_project.your_dataset.ecommerce_data` (
 order_id INT64,
 product_id STRING,
 customer_id INT64,
 order_date DATE,
 total_amount FLOAT64
)
PARTITION BY DATE(order_date);
OR
CREATE TABLE my_dataset.newtable PARTITION BY
DATE(timestamp_column) AS SELECT * FROM
my_dataset.oldtable; 
Creating a clustered table as follows:
CREATE TABLE `your_project.your_dataset.ecommerce_data` (
 order_id INT64,
 product_id STRING,

 customer_id INT64,
 order_date DATE,
 total_amount FLOAT64
)
CLUSTER BY product_id;
OR
CREATE TABLE your_project.my_dataset.newtable CLUSTER BY
column1, column2 AS SELECT * FROM my_dataset.oldtable; 
Creating a clustered and partitioned table as follows:
CREATE TABLE `your_project.your_dataset.ecommerce_data` (
 order_id INT64,
 product_id STRING,
 customer_id INT64,
 order_date DATE,
 total_amount FLOAT64
)
PARTITION BY DATE(order_date)
CLUSTER BY product_id;
OR
CREATE OR REPLACE TABLE `my_dataset.your_table`
PARTITION BY DATE(timestamp_column)
CLUSTER BY customer_id
AS
SELECT * FROM `your_dataset.your_source_table`
By deepening your understanding of these key concepts, you will be
better equipped to utilize the powerful features BigQuery has to
offer in performant and cost-effective way.
BigQuery ML
BigQuery ML (BQML) allows users to create and execute machine

---

## Sección 40: CHAPTER 4 [Entropy: 0.556]

learning models within BigQuery itself. This means you can go from
data analysis to predictive modeling without ever leaving the
BigQuery environment, making the process of data science more
streamlined.
Public datasets
BigQuery hosts a variety of public datasets that are available for
analysis. These datasets range from weather data to cryptocurrency
transaction logs, providing a rich playground for data enthusiasts to
practice their SQL skills and analyze real-world data.
Figure 4.1 shows a sample public dataset in GCP UI:
Figure 4.1: Public dataset with Covid data in BigQuery
Translation service
This service allows for real-time translation of text within BigQuery.
It utilizes Google Cloud's translation API and integrates seamlessly
with SQL queries, enabling multinational analytics at scale.
Data Transfer Service
BigQuery Data Transfer Service (BQ DTS) automates the
movement of data into BigQuery. Whether it is from different
Google services like AdWords and YouTube or third-party platforms
like Amazon S3, BQ DTS makes data ingestion hassle-free.
BI Engine

BigQuery BI Engine is an in-memory analysis platform designed to
turbocharge your SQL queries within BigQuery. By leveraging
advanced caching algorithms, it autonomously identifies and stores
your most frequently queried data. This smart caching is not just
limited to SQL queries originating from BigQuery but extends to any
source, including specialized data visualization tools. As a result, BI
Engine consistently delivers swift, sub-second query responses.
BI Engine continuously manages and optimizes its cache tables. This
ensures ongoing improvements in your query performance without
necessitating manual adjustments or the complexities of data
tiering. In essence, BI Engine automates the intricacies of query
optimization, allowing you to focus on deriving actionable insights
rather than fiddling with performance settings.
Key features of BigQuery
Following are some key features of BigQuery:
• Scalability: One of the most defining features of BigQuery is
its scalability. BigQuery is built on the foundation of Google's
distributed architecture, allowing it to automatically manage
resource allocation so you do not have to. This enables it to
handle data in the order of petabytes effortlessly, without
requiring manual sharding or complex data distribution
schemes.
• Pay-as-you-go pricing model: BigQuery operates on a payas-you-go pricing model, which means you pay only for the
queries you run. This model offers a lot of flexibility and is
particularly beneficial for smaller businesses and startups who
might not have a constant stream of queries but need powerful
analytics capabilities. It also includes a free tier, enabling
small-scale experimentation without cost implications.
• Geospatial analytics: BigQuery GIS allows you to run superfast SQL queries, draw a map, or use your geographic data in
standard SQL queries. This brings a whole new dimension to
data analytics, allowing organizations to gain insights based
on geographic data.
• Integrated ML models: BigQuery ML enables users to create
and execute machine learning models using SQL queries,
bringing machine learning closer to where your data resides.
You can train models and make predictions directly within

BigQuery, which can be a game-changer for analytics
workflows.
Example: Creating a simple linear regression model in
BigQuery:
CREATE OR REPLACE MODEL `my_dataset.my_model`
OPTIONS(model_type='LINEAR_REG') AS SELECT
input_features, output_label FROM
`my_dataset.my_training_data`;
• Security and compliance: Security is one of the top priorities
for Google, and BigQuery is no exception. With features like
Customer Managed Encryption Keys (CMEK) and the ability
to control access at both dataset and table levels, BigQuery
offers robust security measures. It is also compliant with
certifications like ISO 27001, HIPAA, and GDPR, among
others.
• Federated query support: With federated queries, BigQuery
can analyze data across Google Cloud services like Google
Sheets, Cloud Storage, and Cloud SQL. This feature allows
businesses to have a more unified analytics strategy without
having to move data between different platforms.
• Integration with Google ecosystem: Being a part of the
Google Cloud ecosystem, BigQuery easily integrates with other
GCP services and tools. This can significantly simplify your
analytics pipeline, from data ingestion with Pub/Sub to data
transformation with Dataflow, and visualization with Data
Studio.
By offering these unique and powerful features, BigQuery sets
itself apart as not just another big data analytics engine but a
fully managed, serverless solution that offers real-time
analytics, machine learning capabilities, and a host of other
advanced functionalities.
• Pricing structure: Understanding the cost implications of
your data analytics operations is crucial for effective budget
management. BigQuery offers a range of pricing options
designed to accommodate different usage patterns and
business needs. In this section, we will break down BigQuery's
multifaceted pricing structure, helping you to make an
informed choice that aligns with your project requirements
and financial considerations.
• Query-based costing: One of the most attractive features of

BigQuery is its query-based costing model, which only charges
you for the queries you run. This sets it apart from traditional
databases, where you might pay for storage, licenses, or peruser fees. In BigQuery, you are billed for the amount of data
processed during queries, measured in terabytes.
Example: Assuming a simple SELECT query scans 500 GB of
data, you will be charged for that 500 GB of data processed.
If BigQuery's current rate is $5 per TB, then the query would
cost $2.50.
SELECT * FROM `bigquery-public-data.samples.crypto` WHERE
name = ‘bitcoin’; 
• Streaming inserts: BigQuery also allows for real-time
analytics via its streaming insert feature. However, unlike
batch loading data, streaming data into BigQuery incurs
additional costs. Charges are calculated based on the number
of rows inserted.
• Storage costs: BigQuery offers the first 10 GB of storage for
free, but after that, you'll incur additional charges based on
the amount of data stored. However, BigQuery has an
automatic, policy-based data retention feature that can help
you manage storage costs over time.
• Flat-rate pricing: For enterprises running consistently high
volumes of queries, BigQuery offers a flat-rate pricing model.
Under this model, you pay a fixed monthly fee for unlimited
queries, providing a predictable cost structure for businesses
with extensive analytical needs.
• Geographical pricing: The region in which you run your
queries also affects the cost. Typically, costs are slightly higher
when querying data stored in multiple regions as opposed to a
single region.
• Cost controls: You can set up custom quotas and alerts to
control costs. These can be daily, user-based, or even querybased limits to ensure you do not exceed your budget.
Understanding BigQuery's pricing structure can help you
optimize your analytics spending, providing a balance between
cost and performance that meets your specific needs.
Related quotas
Understanding quotas is essential for managing resources and

---

## Sección 41: CHAPTER 4 [Entropy: 0.53]

avoiding unexpected limits when working with BigQuery.
Following are some key quotas you should be aware of:
• Query rate: The default quota is up to 1,000 queries per
project per day, which can be increased upon request.
• Concurrent queries: BigQuery allows up to 50 concurrent
queries per user, and up to 100 for batch queries.
• Streaming inserts: The default quota for streaming inserts is
100,000 rows per second per table, which can be increased
based on your needs.
• Load jobs: The default limit is 100,000 load jobs per project
per day, including failures.
• Export jobs: The limit is 100, 000 export jobs per project per
day, which includes failed jobs.
• BigQuery ML: Models are subject to query and storage quotas;
up to 100 models can be created per dataset.
• Data transfer: Free tier users get 10GB of data transfer per
month, while paid tier limits depend on the subscription.
• Partition modification: The default quota is 4,000 partitions
per table per day, either modified or created.
• Storage: Up to 10,000 tables and partitions per dataset and a
total of 10 GB of stored procedure and UDF code per project.
Remember, these quotas can change, and you can often request
higher limits. For the most current information, refer to the
BigQuery Quotas documentation (https://cloud.google.com/
bigquery/quotas).
Best practices of BigQuery
Mastering BigQuery is not just about understanding its features but
also about employing best practices to ensure efficient operation.
This section delves into key techniques and recommendations for
optimizing your queries, managing your data, and reducing costs,
all while maximizing performance.
Following are some best practices that are often endorsed by
BigQuery experts and are also supported by Google Cloud's official
documentation:
• Dataset design:

○ Use a consistent schema: This will make it easier to query
and analyze your data.
○ Use partitioned tables to improve query performance
and cost: This allows BigQuery to scan only the relevant
partitions of the table, thereby reducing costs. Check out
the official documentation on partitioned tables (https://
cloud.google.com/bigquery/docs/partitioned-tables).
○ Use nested and repeated fields: This can help you to
organize your data more efficiently.
○ Use the appropriate data types: This will help to improve
the performance of your queries and to avoid data errors.
○ Learn more from Google’s Schema Design Guide (https://
cloud.google.com/bigquery/docs/schemas).
• Query performance:
○ Use filters and predicates: This will help to narrow down
the amount of data that needs to be processed.
○ Avoid using subqueries: Subqueries can be slow, so it is
best to avoid them if possible.
○ Use aggregations: Aggregations can help to improve the
performance of your queries by reducing the amount of
data that needs to be processed.
○ Use materialized views: For frequently executed and
computationally expensive queries, materialized views can
provide a performance boost. Learn how to create them in
the 
Materialized 
Views 
documentation 
(https://
cloud.google.com/bigquery/docs/materialized-viewsintro).
○ Avoid using SELECT * and instead specify the columns
you need. This reduces the amount of data read by the
query, improving performance. Google Cloud has a
dedicated guide on how to write efficient queries (https://
cloud.google.com/bigquery/docs/best-practicesperformance-communication)
• Data security:
○ Use access control lists (ACLs): Implement fine-grained
access controls to secure your data. BigQuery integrates
with Cloud Identity and Access Management (IAM) for
this purpose. Here is how to set up access controls (https://

cloud.google.com/bigquery/docs/access-control).
○ Use encryption: Encryption can help to protect your data
from unauthorized access.
○ Use auditing: Auditing allows you to track who has
accessed your data and when.
• Cost controls:
○ Set up budget alerts and use query cost estimators to
manage 
your 
BigQuery 
expenses. 
The 
pricing
documentation 
(https://cloud.google.com/bigquery/
pricing) offers comprehensive insights into controlling
costs.
• Data transfer and loading:
○ For large data sets, batch loads over streaming inserts are
preferred for cost efficiency. For real-time needs, a
combination of both may be necessary. Read the data
ingestion 
guide 
(https://cloud.google.com/bigquery/
docs/loading-data) for more.
Fun facts
• BigQuery can query petabytes of data in seconds. That is faster
than you can read this sentence!
• The internal technology behind BigQuery is called Dremel, and
it was originally designed for Google's internal use for quick
data exploration.
• During the 2012 Olympics, the New York Times used BigQuery
to publish interactive infographics that were updated in realtime.
Trivia
Question: Which company was one of the first to use BigQuery to
power real-time analytics applications?
Answer: Spotify was one of the first companies to use BigQuery to
power real-time analytics applications. They use BigQuery to
analyze data from their users' listening habits, such as which songs
they are listening to and how long they are listening to them. This
data is then used to personalize the Spotify experience for each
user, such as by recommending new songs and artists.

Dataproc
Dataproc is a fast, easy-to-use, fully-managed cloud service for
running Apache Spark and Apache Hadoop clusters in a more
efficient, streamlined, and optimized manner. Dataproc offers a way
to manage and leverage the power of open-source data tools for
batch processing, querying, streaming, and machine learning. Its
flexibility and scalability allow for quick and cost-effective
execution of data processing tasks without requiring a significant
infrastructure investment.
Key concepts of Dataproc
Some key concepts for Dataproc are discussed as follows:
• Clusters: Dataproc allows you to run Apache Spark and
Hadoop clusters in a simpler, more cost-efficient way. A
cluster is essentially a set of VM instances configured in a
specific way to handle your data processing tasks. Below
image shows Dataproc Cluster UI:
Figure 4.2: Dataproc home page
• Jobs: These are the data processing tasks that you submit to
your clusters. Dataproc supports various types of jobs,
including Spark, Hadoop, Pig, and Hive jobs.
• Managed Spark and Hadoop: Dataproc provides managed
services for running Apache Spark and Hadoop. This means
that it handles the operational aspects like scaling and
maintenance, allowing you to focus on your data.

---

## Sección 42: CHAPTER 4 [Entropy: 0.81]

• Workflow templates: These templates make it easier to
automate and manage workflows. They are reusable and can
be instantiated multiple times.
• Autoscaling: Dataproc clusters can automatically resize
themselves, within limits you can define, based on the
workloads. This feature is beneficial for optimizing resources
and costs.
• Preemptible instances: These are short-lived, cost-effective
compute instances suitable for batch jobs and fault-tolerant
workloads. They can help you save money but are not suitable
for all types of jobs due to their ephemeral nature.
• Region and zones: Like other GCP services, Dataproc allows
you to specify the geographic location (region and zones) of
your clusters, which is crucial for latency and local data
processing requirements.
• Security: Dataproc integrates with Cloud Identity and Access
Management (IAM) and supports Kerberos, enabling you to
set granular permissions and secure your data processing
environment.
• Monitoring and logging: Integration with Cloud Monitoring
and Cloud Logging allows you to keep an eye on the system
metrics and logs and create custom alerts.
Key features of Dataproc
Google Cloud Dataproc distinguishes itself in various ways from
other cloud-based Apache Spark and Hadoop services, making it an
appealing choice for many data processing needs. These are
discussed in the following section:
• Fast cluster spin-up: Dataproc's ability to get your clusters up
and running in under 90 seconds. However, this can vary
depending on the size and complexity of the cluster, as well as
the availability of resources. For example, a small cluster with
a few nodes may spin up in as little as 30 seconds, while a
large cluster with many nodes may take several minutes to
spin up. Additionally, if there is a high demand for resources,
it may take longer for Dataproc to spin up a cluster.
• Serverless spark: The offering allows you to run Apache
Spark jobs without having to manage clusters. This minimizes
operational overhead and makes it even more cost-effective

while also being able to scale resources automatically based
on the workload.
• Built for open-source: Dataproc is designed to work
seamlessly with popular open-source data tools such as
Apache Spark, Hadoop, Pig, and Hive. It serves as a bridge for
organizations transitioning from on-premise to cloud or those
who want to use a combination of both.
• Cost-effective: With fine-grained billing down to the second
and several pricing options including preemptible VMs, you
have the flexibility to optimize costs. You pay only for what
you use, reducing waste and lowering operational expenses.
• Customization and extensibility: Dataproc allows you to add
custom packages, libraries, and even entirely new services into
your cluster via initialization actions. This means you're not
locked into a set stack and can modify the environment
according to your needs.
• Automated features: With features like auto-healing and
auto-scaling, Dataproc minimizes the operational burden,
making it easier for you to focus on data analytics rather than
infrastructure management.
• Fine-grained control with managed ease: While Dataproc
manages the backend operations, it also provides you with the
ability to fine-tune your clusters and jobs. This offers a
balance between control and simplicity.
Code snippet of Dataproc
Following are some code examples of common tasks in Dataproc:
• Creating a Dataproc cluster: Following is how you could
create a Dataproc cluster using the gcloud command-line tool:
gcloud dataproc clusters create my-cluster --region=us-central1
--subnet=default --zone=us-central1-a --master-machinetype=n1-standard-1 --master-boot-disk-size=500 --numworkers=2 --worker-machine-type=n1-standard-1 --workerboot-disk-size=500 --image-version=1.5-deb9
• Submitting a spark job:
gcloud dataproc jobs submit spark --cluster=my-cluster --
region=us-central1 --class=org.apache.spark.examples.SparkPi
--jars=file:///usr/lib/spark/examples/jars/spark-examples.jar
-- 1000

• Using PySpark to count words:
python
from pyspark import SparkContext
 
sc = SparkContext("local", "Word Count")
text_file = sc.textFile("gs://my-bucket/my-file.txt")
counts = text_file.flatMap(lambda line: line.split(" ")) \
 .map(lambda word: (word, 1)) \
 .reduceByKey(lambda a, b: a + b)
counts.saveAsTextFile("gs://my-bucket/word-count-output/")
• Run the PySpark script:
gcloud dataproc jobs submit pyspark --cluster=my-cluster --
region=us-central1 wordcount.py
• Using Hadoop MapReduce: Following is a sample command
to run a Hadoop MapReduce example job which estimates Pi:
hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/
hadoop-mapreduce-examples-2.8.5.jar pi 16 1000
These are just some simple examples, and the possibilities with
Dataproc are extensive. Remember to replace the bucket names and
other parameters to fit your specific needs.
Pricing structure
Understanding the pricing model of Dataproc is crucial for
managing costs effectively.
Following is a breakdown:
• Per minute billing: One of the standout features of Dataproc
pricing is the per-minute billing, with a 10-minute minimum
usage cost. This makes it suitable for jobs that do not run for a
very long time.
• Virtual machines: The cost of the VM instances that are part
of your Dataproc cluster make up a significant chunk of the
costs. These prices vary based on the type of machine, its
geographical location, and whether or not it is a preemptible
instance.
• Data transfer: While transferring data into Dataproc is

generally free, transferring data out of it may incur additional
costs, especially if it is to another cloud provider or over the
internet.
• Additional services: Utilizing additional GCP services like
Cloud Monitoring, Logging, or BigQuery may lead to extra
costs. It is important to factor these into your overall budget.
• License costs: Dataproc itself does not have a separate license
cost as it leverages open-source software. However, if you are
using any licensed software on top of Dataproc, those costs
will be separate.
• Reserved capacity: GCP offers the ability to reserve resources
for Dataproc for a discounted price, which can be an
economical choice for predictable, long-term workloads.
For a detailed look at pricing, you can refer to the official GCP
Dataproc pricing page (https://cloud.google.com/dataproc/
pricing).
Best practices of Dataproc
Implementing best practices can help you get the most out of your
Dataproc clusters.
Following are some recommended guidelines:
• Right-sizing clusters: Dataproc enables you to customize
your cluster configurations. Always tailor the cluster size to
your workload requirements to ensure cost-efficiency and
optimal performance.
• Use preemptible instances: For workloads that can tolerate
interruptions, consider using preemptible instances. They are
far cheaper than regular instances and can be used for tasks
like data transformation and batch processing.
• Autoscaling: Dataproc's autoscaling feature allows clusters to
automatically adjust to the workload. This feature can save
costs and improve performance. Be sure to configure the
scaling policies in line with your resource requirements.
• Optimize storage: Choose the appropriate storage options
like Cloud Storage, HDFS, or a combination of both,
depending on your needs. Each has its own benefits in terms
of cost, availability, and latency.
• Job isolation: Rather than running all jobs on a single cluster,

---

## Sección 43: CHAPTER 4 [Entropy: 0.5]

isolate jobs that require different resources or dependencies.
This makes it easier to manage and troubleshoot.
• Monitoring and logging: Make use of Google Cloud's
Operations Suite for logging and monitoring. This can help in
debugging 
and 
also 
in 
understanding 
your 
clusters'
performance metrics.
• Security: Implement IAM roles and permissions to restrict
cluster access. Also, use encrypted storage options to protect
sensitive data.
• Batch and stream processing: Decide between batch or
stream processing based on your workload. Dataproc caters to
both, and picking the right model can significantly influence
cost and performance.
• Idle clusters: Make it a practice to delete or stop clusters
when they are not in use to avoid incurring additional costs.
• Centralized Hadoop history server: Using a centralized
Hadoop History server can help you in consolidating logs and
metrics, thereby making it easier to debug and analyze job
performance over time.
• Network configuration: Isolate Dataproc clusters in a
dedicated VPC for enhanced security and ease of management.
• Fine-grained IAM roles: Make use of custom roles for better
access management and to follow the principle of least
privilege.
• Using initialization actions: Initialization actions can be
used to install additional software or to modify the
configuration settings of cluster instances. This ensures that
the environment is set up correctly right from the start.
• Versioning: Always specify the software version when
creating a cluster, so you can manage upgrades or rollbacks
more easily.
• Graceful decommissioning: When you are scaling down the
number of nodes, ensure to decommission the existing ones
gracefully to prevent data loss.
• Quota management: Keep an eye on your resource quotas to
avoid throttling. Plan and request quota increases in advance
for smoother operation.
• Monitoring quotas and costs: Use Cloud Monitoring to set

alerts for when you are nearing your resource and budget
quotas.
Google Cloud frequently updates its services, so it is a good
habit to regularly check its Dataproc documentation (https://
cloud.google.com/dataproc/docs) for the latest best practices
and feature updates.
Fun facts
• Google published the original whitepaper for MapReduce in
2004, and it has since become the standard for large-scale
data processing. The ideas from the whitepaper eventually
evolved into Apache Hadoop.
• Dataproc clusters are isolated from each other and from the
public internet, and they use encryption to protect your data.
Whether you are migrating existing on-premise data lakes or
building a new data platform from scratch, Dataproc offers a
serverless, fully managed, and highly scalable environment to get
the job done. With features such as autoscaling, customizable
virtual machines, and serverless Spark options, Dataproc provides a
rich set of capabilities that make it a compelling choice for modern
data operations. Its compatibility with existing APIs and its ability
to work alongside other GCP services like BigQuery and Cloud
Storage make it an integral part of Google Cloud's data and
analytics ecosystem. By following the best practices outlined in this
chapter, you can make the most out of what Dataproc has to offer.
Dataflow
Google Cloud Dataflow is a fully managed, serverless data
processing service that offers both stream and batch data processing
capabilities. Built on top of Apache Beam, Dataflow enables
developers to build robust, scalable pipelines for Extract,
Transform, Load (ETL), real-time analytics, and other data
processing tasks. Its ability to auto-scale resources based on
workload requirements makes it an ideal choice for organizations
looking to process large volumes of data cost-effectively.
Key concepts of Dataflow
Following are some key features of Dataflow:

• Apache Beam: Dataflow uses Apache Beam as its underlying
programming model. Apache Beam is an open-source model
that allows developers to define data processing pipelines for
both batch and streaming data. Beam abstracts the underlying
data processing engines, making it easier to switch between
different processing backends like Dataflow, Apache Flink, and
Apache Spark. The Beam SDK provides a rich set of
windowing and session analysis primitives that can be used in
your Dataflow pipelines.
• Serverless: Dataflow takes care of provisioning and managing
the resources required to run your data pipelines. This
eliminates the operational overhead of manually managing a
cluster, allowing you to focus solely on code and data.
• Autoscaling: One of the defining features of Dataflow is its
ability to dynamically allocate resources based on the
workload. Dataflow adjusts the number of virtual machines
running your job up or down within configurable ranges. This
allows for optimized resource utilization and cost-efficiency,
especially when dealing with varying data volumes or
processing complexities.
• Windowing: 
Dataflow 
provides 
powerful 
windowing
capabilities, allowing you to divide a potentially unbounded
dataset into finite sets (windows) over which you can perform
transformations and computations. This is particularly
important for real-time data processing and analytics, where
you might want to compute aggregates over data arriving in
real-time.
• Event time processing: In streaming analytics, the timing of
events is crucial. Dataflow allows you to handle events based
on the time they actually occurred, as opposed to the time
they are processed. This ensures a more accurate and
contextual analysis of real-time data.
• Dataflow SQL: Believe it or not, you can use SQL queries in
Dataflow! This feature is part of the efforts to make the service
more accessible to those who may not have a background in
programming.
• Streaming engine: The Dataflow Streaming Engine separates
compute and state, allowing for more dynamic work
partitioning. This was an upgrade that made streaming
pipelines more robust and efficient.

Key features of Dataflow
Google Cloud Dataflow stands out for a variety of reasons that can
significantly benefit your data processing workloads.
Following is what makes it truly exceptional:
• Unified batch and stream processing: Dataflow allows you
to build both batch and streaming data pipelines using the
same service. This makes it easier to manage and maintain
your data processing infrastructure, as well as switch between
different types of workloads seamlessly.
• Auto-scaling and resource optimization: One of Dataflow's
most appealing features is its fully managed auto-scaling
capabilities. You can automatically allocate or deallocate
resources based on the real-time requirements of your data
pipeline, reducing costs and ensuring high performance.
• Fault-tolerance and reliability: Dataflow is designed to be
fault-tolerant, meaning it can handle failures gracefully. If a
worker node goes down, the service automatically re-routes
the data and spawns a new node, ensuring that your pipeline
continues to operate efficiently.
• Code portability: Dataflow is built on the open-source
Apache Beam model, allowing for high code portability. You
can run your Apache Beam code on other data processing
engines as well, offering you a wider choice of platforms for
running your data pipelines.
• Native Google Cloud integration: Being a Google Cloud
native service, Dataflow integrates seamlessly with other GCP
services like Pub/Sub, BigQuery, and Cloud Storage, making it
easier to build end-to-end data solutions.

---

## Sección 44: CHAPTER 4 [Entropy: 0.725]

• Stream analytics and real-time ETL: Dataflow excels in realtime ETL scenarios and stream analytics, enabling you to
process and analyze data in real-time and make data-driven
decisions faster.
• Security and compliance: Dataflow offers robust security
features including data encryption at rest and in transit, as
well as fine-grained access control via Cloud IAM.
By understanding these unique features, you can better evaluate if
Dataflow is the right solution for your specific data processing
needs.

Code snippet of Dataflow
Following are some practical code examples that demonstrate
common tasks and functionalities in Dataflow:
Example 1: Simple Data Pipeline
One of the most basic tasks you can accomplish with Dataflow is
setting up a simple data pipeline to process and move data. Below is
a Python code snippet that uses Apache Beam (which Dataflow is
built upon) to create a pipeline that reads from a text file,
transforms the data by converting all text to uppercase, and then
writes it back to another text file.
import apache_beam as beam
 
def main():
 p = beam.Pipeline()
 
 (p | 'Read from text file' >> beam.io.ReadFromText('input.txt')
 | 'Convert to uppercase' >> beam.Map(lambda x: x.upper())
 | 'Write to text file' >> beam.io.WriteToText('output.txt'))
 
 p.run()
 
if __name__ == '__main__':
 main()
Example 2: Windowed aggregations
Dataflow also supports windowing, allowing you to perform
operations on data streams that arrive in real-time. Here is how you
can set up a time-windowed count of incoming elements:
Pipeline p = Pipeline.create();
 
p.apply(PubsubIO.readStrings().fromTopic("projects/myProject/topics/
myTopic"))
 .apply(Window.into(FixedWindows.of(Duration.standardMinutes(1))))
 .apply(Count.globally())
 .apply(BigQueryIO.write().to("myProject:myDataset.myTable"));

p.run();
The Java code snippet above reads from a Google Pub/Sub topic,
sets up a 1-minute fixed window, and writes the count of elements
in each window to a BigQuery table.
These are simplified examples to get you started. For more complex
use-cases, you can refer to the Dataflow Documentation [https://
cloud.google.com/dataflow/docs/].
Pricing structure
Understanding the cost implications of using Google Dataflow is
crucial for effective budgeting and resource allocation. Dataflow's
pricing is primarily based on the following factors:
• Compute engine costs: Dataflow pipelines run on Google
Compute Engine instances. The costs will depend on the type
and number of virtual machines you use for your jobs.
• Data processing costs: This is based on the volume of data
that your Dataflow pipelines read from and write to data
sources. Costs can accrue from shuffling, sorting, or joining
data.
• Streaming engine costs: If you opt for the Dataflow
Streaming Engine, you'll incur additional costs. The Streaming
Engine offloads some processing tasks from worker VMs,
which might reduce your overall Compute Engine costs but
will add its own separate fees.
• Network costs: Data egress or transfer fees might apply
depending on the source and destination of the data.
• Additional storage: Temporary or durable storage costs for
pipeline data may also apply, depending on your specific
requirements.
For a detailed breakdown and calculation of these costs, you can
visit the Dataflow Pricing Page (https://cloud.google.com/
dataflow/pricing). This section aims to offer a general outline. For
the most accurate and tailored pricing information, it is advisable to
use Google Cloud Platform's pricing calculator.
Related quotas
Understanding the quotas in Dataflow is crucial for planning,

scaling, and managing your data pipelines effectively.
Following are some of the key quotas you should be aware of:
• Maximum number of workers: The default maximum
number of worker instances per job is set at a particular limit,
and you may need to request a quota increase for larger
workloads.
• Maximum number of concurrent jobs: There is a default
limit on the number of Dataflow jobs you can run
concurrently in a single project. Exceeding this limit will
require a quota adjustment.
• API rate limits - requests per minute: There's a rate limit on
how many API calls you can make to Dataflow within a
minute. Exceeding this limit will result in throttling.
• Streaming engine: When using the Streaming Engine, be
aware that there is a limit on the number of streaming units
that can be used.
• Network Egress: Data Egress Limits: Dataflow has network
egress limits that depend on the location of the job and the
destination of the data.
• Time and duration: job duration: Keep in mind that very
long-running jobs might also have specific quotas, especially
for streaming jobs.
You can review and request quota changes in the Google Cloud
Console under the IAM & Admin section. Make sure to request any
necessary quota increases well in advance of reaching them to
ensure the uninterrupted operation of your Dataflow pipelines.
For more details on these quotas, you can refer to the official
Dataflow Quotas documentation (https://cloud.google.com/
dataflow/quotas).
Best practices of Dataflow jobs
Implementing best practices can optimize your Dataflow jobs for
performance, cost, and maintainability.
Following are some of the key guidelines you should consider:
• Resource utilization, Autoscaling: Enable autoscaling to let
Dataflow automatically adjust the number of worker instances
based on the needs of your pipeline.

• Data processing
○ Use windowing carefully: When working with unbounded
data, design your windows and watermarks carefully to
manage system lag and data completeness.
○ Fine-tune ParDo operations: Customize ParDo functions
to minimize the amount of data that needs to be serialized
and sent between worker nodes.
• Monitoring and debugging:
○ Leverage Stackdriver: Utilize Google Stackdriver for realtime monitoring and logging of your Dataflow jobs.
○ Enable streaming metrics: For real-time pipelines, enable
Streaming Engine metrics for better monitoring and
debugging.
○ Avoid excessive logging: Excessive logging may result in
significant performance degradation of your application.
• Cost optimization:
○ Optimize shuffle operations: Shuffle operations can be
expensive; use combiners or other techniques to reduce the
volume of data shuffled.
○ Use committed use discounts: For sustained, predictable
usage, consider purchasing committed use discounts for
worker nodes.
• Implement dead-letter queues: For fault-tolerance in your
pipelines, use dead-letter queues to catch and review bad
messages or failed processing tasks.
This section is designed to get you started on optimizing your
Dataflow implementations. The ultimate best practices for your
specific case may vary based on your unique requirements.
Fun fact
Dataflow has its roots in Google's MillWheel and FlumeJava, which
are essentially internal technologies that were revealed in research
papers. The ideas from these technologies eventually evolved into
what Dataflow is today.
Dataplex

---

## Sección 45: CHAPTER 4 [Entropy: 0.53]

Dataplex is Google Cloud's intelligent data fabric, designed to
provide a centralized platform for managing, securing, and
governing data across your organization. Whether your data is
stored in BigQuery, GCS, or other Google Cloud services, Dataplex
enables you to create a cohesive layer to manage all of your data
assets seamlessly.
Key concepts of Dataplex
Before we take a further deep dive into Dataplex it will be helpful to
know the following key concepts in context of Dataplex:
• Data lake: Dataplex is primarily designed for data lake
architecture, where raw and processed data can coexist.
• Metadata management: One of the standout features of
Dataplex is its robust metadata management, which includes
automatic metadata ingestion and rich metadata tagging
capabilities.
• Data governance: Security and compliance are big with
Dataplex. Features like data masking and encryption are
standard.
• Search and discover: Dataplex comes with a search
functionality that helps users easily locate the data they need
across various services and platforms.
• Automated 
data 
quality: 
Dataplex 
also 
focuses 
on
maintaining the quality of the data through automated
validation checks.
Key features of Dataplex
Dataplex stands out as a unique offering in the data management
landscape for several key reasons as follows:
• Unified data management: Dataplex offers a centralized
platform that brings together data lakes, data warehouses, and
other data repositories. This unified approach simplifies data
governance, management, and security across your entire data
landscape.
• Intelligent data fabric: Dataplex goes beyond being just a
data lake by incorporating an intelligent data fabric layer. This
layer understands the metadata and semantics of stored data,
allowing for smarter data governance and discoverability.

• Scalability and flexibility: Dataplex is designed to scale with
your needs, accommodating everything from small data sets to
petabytes of information. Moreover, it supports a variety of
data formats, providing the flexibility to meet diverse data
storage requirements.
• Advanced metadata management: Metadata isn't an
afterthought with Dataplex; it's an integral feature. The
platform 
automatically 
classifies, 
labels, 
and 
manages
metadata, which is essential for efficient data governance and
legal compliance.
• Secure and compliant by design: Dataplex incorporates
built-in security features such as fine-grained access controls,
encryption at rest and in transit, and continuous monitoring.
Additionally, it meets various industry compliance standards,
easing the burden of regulatory compliance.
• Seamless integration with GCP ecosystem: Being a Google
Cloud offering, Dataplex can effortlessly integrate with other
GCP services like BigQuery, GCS, and Dataflow, allowing for a
more unified and streamlined user experience.
• Real-time analytics support: Dataplex is built to work
seamlessly with real-time analytics tools. This capability
allows organizations to gain insights faster and make datadriven decisions in real-time.
Pricing structure
The pricing for Dataplex is based on the volume of data managed,
number of API calls made, and additional services like data quality
checks and metadata indexing. Costs can vary widely depending on
the scale and complexity of your data landscape.
Best practices
Following are some common best practices you should be aware of
while using Dataplex:
• Use zones wisely: Segregate data into zones based on access
level and sensitivity to streamline governance.
• Automate metadata: Utilize automated metadata ingestion
features for real-time updates and easier governance.
• Enable data masking: For sensitive datasets, always enable
data masking features to protect against unauthorized access.

• Monitor activity: Use built-in monitoring and alerting
capabilities to keep track of data access and changes.
• Review documentation: Keep an eye on the official Google
Cloud Dataplex Documentation (https://cloud.google.com/
dataplex/docs) for the most current best practices and tips.
Related quotas
Following are some key Dataplex related quotas you need to
consider while using Dataplex:
• API rate limit: Dataplex has an API rate limit that varies
depending on your project's setup and requirements.
• Data volume: There may be limitations on the volume of data
you can manage within Dataplex, based on your subscription.
• Metadata queries: The number of metadata queries you can
perform per minute/hour may be limited, so it is essential to
keep that in mind when implementing large-scale data
governance tasks.
Fun fact
Dataplex can automate metadata tagging for over 100 types of data,
making it one of the most versatile solutions for metadata
management.
Trivia
What is the name of the Google Cloud service that makes it easy to
run Apache Beam pipelines without having to manage any
infrastructure?
Answer: The Google Cloud service that makes it easy to run Apache
Beam pipelines without having to manage any infrastructure is
called Cloud Dataflow Serverless.
Data fusion
Google Cloud Data Fusion is designed as an end-to-end data
integration platform that allows organizations to ingest, prepare,
and deliver both real-time and batch data. With a code-free UI and
the ability to create reusable data pipeline templates, Data Fusion
lowers the technical barrier to data preparation and integration. It is

intended to serve data engineers, business analysts, and data
scientists by providing a single, unified platform for all data
integration needs.
Key features of Data fusion
Some key features of Data Fusion are as follows:
• Code-free and code-friendly: With a graphical interface for
designing pipelines, even users with minimal coding
experience can contribute to data preparation tasks. For those
who prefer writing code, Data Fusion offers a code-friendly
environment that supports custom transformation
• Hybrid and multi-cloud: Data Fusion is designed with a
cloud-native architecture but also extends its capabilities to
on-premises and other cloud providers. This flexibility
facilitates a seamless data integration strategy across different
environments.
• Real-time and batch processing: Whether you are ingesting
logs for real-time analytics or conducting complex batch
processing tasks overnight, Data Fusion can handle it. This
versatility makes it suitable for a wide range of business use
cases.
• Built-in data catalog: The service features a robust metadata
repository, making it easy for data practitioners to discover
available datasets and understand their lineage and quality.
Key concepts of Data fusion
Following are some key concepts regarding Data Fusion:
• Pipelines: These are the workflows that you design in Data
Fusion for data integration. A pipeline consists of a series of
stages connected in a flow.
• Stages: These are individual operations or steps within a
pipeline. Stages can be sources, sinks, or transformations.
• Runtime arguments: Parameters that can be fed into
pipelines during their execution, enabling dynamic behavior
without having to change the code.
• Plugins: These are reusable code blocks that you can import
into your pipeline, allowing you to extend functionality easily.
• Data catalog integration: Data Fusion integrates with Google

---

## Sección 46: CHAPTER 4 [Entropy: 0.635]

Cloud's Data Catalog, giving users an indexed repository to
efficiently search and manage their data.
Code snippet of Data Fusion
Following is an example of how to create a Data Fusion pipeline
using Python:
python
from google.cloud import data_fusion_v1beta1
 
# Initialize Data Fusion client
data_fusion_client = data_fusion_v1beta1.DataFusionServiceClient()
 
# Define the pipeline configuration
pipeline = {
 "name": "my_first_pipeline",
 "description": "This is a simple example of a Data Fusion pipeline",
 # Other configurations
}
 
# Create the pipeline
created_pipeline = data_fusion_client.create_pipeline(parent="projects/
my_project/locations/us-central1/instances/my_instance",
pipeline=pipeline)
Pricing structure
Cloud Data Fusion pricing is primarily driven by the underlying
resources consumed during pipeline execution rather than the
number of pipelines themselves.
Key factors influencing your Cloud Data Fusion costs are as follows:
• Data Fusion instance type: The edition you choose
(Developer, Basic, or Enterprise) determines the base cost.
• Dataproc cluster resources: The size and duration of
Dataproc resources created to execute your pipelines directly
impacts your costs.
• Storage and network costs: Additional costs may arise from

storing data in Cloud Storage and network egress.
Best practices of Data fusion
Following are the best practices of data fusion:
• Pipeline optimization: Design your pipelines to perform
operations in batches, wherever possible, to reduce API calls
and I/O operations.
• Monitoring and logging: Leverage the built-in monitoring
and logging features in Data Fusion to troubleshoot issues and
optimize performance.
Related quotas
• Maximum number of Data Fusion instances per project: 10
• Maximum number of pipelines per Data Fusion instance: 1000
• Maximum duration for a single pipeline run: 7 days
Fun fact
Data Fusion is built on Apache CDAP, one of the first unified
integration platforms for batch and real-time data.
Looker
Looker is more than just a traditional Business Intelligence (BI)
tool; it's an analytics platform built from the ground up to live in
the cloud. What sets Looker apart is its unique approach to data
modeling and exploration, catering to both technical and nontechnical users alike. This allows for an agile, collaborative
environment where teams can make data-driven decisions rapidly.
Key concepts in Lockers
Following are some key concepts in Looker:
• LookML: This proprietary modeling language is the backbone
of Looker, allowing data teams to define metrics and business
logic in a centralized and reusable manner. This ensures that
everyone in the organization speaks the same data language.
• Explores: These are query spaces that enable users to delve
into their data. Explores can be customized, saved, and even

embedded into other tools or websites, allowing for extensive
personalization.
• Dashboards: Looker's dashboards are not static; they are
interactive and can be drilled into for deeper insights. This
makes them a dynamic tool for real-time business monitoring.
• Blocks: These are building blocks of LookML code, which can
be assembled like Lego pieces to speed up data model
development. Blocks can be generic or industry-specific.
• Embedding: Looker offers robust APIs and SDKs, enabling
businesses to embed analytics directly into their products,
enhancing the end-user experience.
Key features of Looker
Following are some important features of Looker you should know
about:
• Self-service analytics: Looker's user interface is designed to
be intuitive, with drag-and-drop functionality and a wide
variety of chart options. This makes it easy for anyone,
regardless of their technical aptitude, to create meaningful
visualizations.
• Data-driven workflows: Besides delivering insights, Looker
can integrate with other tools and platforms to drive actions.
This enables automated processes based on the data analytics,
thus making data an active participant in day-to-day
operations.
• In-database architecture: Traditional BI tools extract data to
perform analytics, but Looker connects directly to your
database, enabling real-time analytics without compromising
on data governance or security.
• Integrated data platform: Being a part of Google Cloud
Platform, Looker benefits from seamless integration with other
Google Cloud services. Whether you are storing data in
BigQuery 
or 
running 
machine 
learning 
models 
via
TensorFlow, Looker can easily fit into your data ecosystem.
Pricing structure
Looker does not take a one-size-fits-all approach to pricing. It offers
flexible plans that can be customized to fit organizational needs.
Whether you are a small business or a large enterprise, Looker has

different plans that can accommodate your particular use-case.
Best practices of Looker
Following are the best practices of Looker:
• Optimize LookML models: Consistency is key. Standardizing
naming conventions and organizing your code logically can
significantly ease long-term maintenance.
• Leverage caching: To speed up commonly run queries, make
the best use of Looker's caching capabilities. This is
particularly useful for dashboards that are viewed frequently.
• User training: The best tool is only as good as its users.
Regular training and retraining ensure that everyone can
make the most out of the tool.
Related quotas
• API requests per minute: The standard rate limit is 5,000
requests per minute, but enterprise-level contracts may offer
higher limits.
• Maximum concurrent queries: Looker auto-scales query
processing depending on the database backend but will
manage query queuing to ensure that the database is not
overwhelmed.
Fun fact
Looker was acquired by Google in 2021.
Multiple choice questions
1. In the context of BigQuery, what does BI Engine
specialize in?
a. Data visualization
b. Data cleaning
c. Accelerating SQL queries
d. Machine learning analytics
2. Which of these is a best practice when using Google

Dataproc?
a. Using a single +Hadoop History server across multiple
clusters
b. Always running clusters at maximum size
c. Avoiding the use of preemptible instances
d. Storing all data on local disks
3. Which GCP service is designed for unified real-time,
stream and batch processing?
a. Google Cloud Dataplex
b. Google BigQuery
c. Google Cloud Dataflow
d. GKE
4. What is Looker primarily used for?
a. Data backup and recovery
b. Networking
c. Data visualization and business intelligence
d. File storage
5. What is one of the primary functions of Google Dataplex?
a. Data ingestion
b. Data governance
c. Data analysis
d. Data visualization
6. What types of data processing pipelines can Dataflow
handle?
a. Only batch processing
b. Only stream processing

---

## Sección 47: CHAPTER 4 [Entropy: 0.25]

c. Both batch and stream processing
d. Neither batch nor stream processing
7. Which BigQuery feature would you use for machine
learning directly within the SQL environment?
a. Data Studio
b. BI Engine
c. BQML
d. Public Datasets
Case studies
1. A healthcare analytics company was experiencing slow data
processing times using an on-premises Hadoop and Spark
solution. The bottleneck was impeding research outcomes and
timely reporting. What solution you will propose to resolve
their challenges?
2. A global retail company needed a way to analyze real-time
data from its online sales platform, distributed across multiple
countries. They want to understand customer behaviors and
sales patterns as they happened. What will be most cost
effective and efficient way of doing this on GCP?
3. An IoT company requires both real-time and batch processing
for their sensor data. Their legacy systems were not scaling
well with the influx of data from millions of devices. What
solution will you propose?
4. A financial institution was struggling with data governance
and management. Their data was siloed across different
departments, making it challenging to enforce consistent data
access policies. How can you solve this problem on GCP?
Answer key
1. c. Accelerating SQL queries
2. a. Using a single +Hadoop History server across multiple

clusters
3. c. Google Cloud Dataflow
4. c. Data visualization and business intelligence
5. b. Data governance
6. c. Both batch and stream processing
7. c. BQML
Case studies
1. The company can migrate their ETL workflows to Google
Cloud Dataproc. They can use mix of temporal Dataproc
clusters and serverless Spark. Optimize costs and
performance by following Dataproc best practices.
2. The company can migrate its data storage and analytics to
Google BigQuery. They can implement streaming data
pipelines to push real-time transaction data into BigQuery
tables. BI Engine may be employed to accelerate SQL queries
for immediate analysis.
3. They can opt for Google Cloud Dataflow to manage both their
streaming and batch data pipelines. This can eliminate the
need to manage two separate systems for real-time and
batch processing.
4. They can deploy Google Dataplex to create an intelligent data
catalog and enforce data governance at scale. With Dataplex,
they were able to centralize metadata and enforce security
and compliance policies across all data assets.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 48: CHAPTER 5 [Entropy: 0.56]

Machine Learning and
AI Services
Introduction
Want to build intelligent applications that can see, hear, and
understand? Artificial intelligence (AI) and machine learning (ML)
are transforming industries, and Google Cloud Platform (GCP)
provides a comprehensive suite of tools and services to help you
harness their power. This chapter explores the exciting world of AI
and ML on GCP, from pre-trained models for vision, language, and
structured data to custom model development and deployment.
From Vertex AI, a managed environment for machine learning
models, to specialized services like Vision AI, Document AI, and
Agent Builder, this chapter will equip you with the tools and
knowledge you need to effectively implement AI and ML
capabilities in your applications.
Structure
Following is the structure of the chapter:
• Vertex AI
• Document AI
• Gen AI App Builder

Objectives
By the end of this chapter, you'll be well-versed in GCP's key
machine learning and AI services. You'll understand how to leverage
pre-trained models, build and train your own models, and deploy
them to production. As of 2024, GCP had 19+ services listed under
the AI and ML section. However, many of those are moving under
the broader Vertex AI platform (for example, AI Platform, natural
language, and more). So, now we will focus on Vertex AI, Document
AI, and Gen AI App Builder. By the end of this chapter, you should
be able to select and implement the appropriate machine-learning
service for your specific use case.
Vertex AI
Vertex AI is designed to be a unified machine learning platform that
brings automation and simplicity to the deployment and
management of ML models. As a part of the Google Cloud Platform,
it aims to cater to both beginners who are new to machine learning
as well as seasoned data scientists and ML engineers.
The platform provides a comprehensive set of tools to build, train,
and deploy machine learning models. This includes, but is not
limited to, Automated Machine Learning (AutoML) capabilities,
custom model training, data labeling services, and robust ML
pipelines. What sets it apart is its focus on providing end-to-end
services for the entire machine-learning workflow, from data
ingestion and preparation to model training, evaluation,
deployment, and monitoring as shown in Figure 5.1:

Figure 5.1: Vertex Engine home page
Vertex AI is serverless, which means you do not have to worry
about the underlying infrastructure. This frees you up to focus on
perfecting your models and deriving valuable insights from your
data. Its serverless nature also makes it scalable, as it automatically
adjusts to the computational demands of your project.
Key concepts of Vertex AI
In this section, we will examine the fundamental components that
make Vertex AI a robust and comprehensive tool for AI and ML
applications. We will explore capabilities ranging from AutoML and
custom training to model deployment, vertex pipelines, and
explainability, offering a systematic understanding of how these
elements contribute to efficient and insightful machine-learning
solutions. First, let us begin with the introduction of key terms you
should be aware of while working on Vertex AI as follows:
• AutoML: AutoML is a prominent feature in Vertex AI,
allowing you to train a model with your dataset automatically.
The system chooses the optimal algorithm, hyperparameters,
and other settings, eliminating much of the guesswork
typically associated with machine learning.
• Custom training: For users who require more control, Vertex
AI provides the ability to train custom models using your
preferred machine learning frameworks, like TensorFlow,
PyTorch, or scikit-learn.
• Model deployment: Once a model is trained, Vertex AI offers

a streamlined process for deploying it into a production or
testing environment. You can deploy models to serve online
predictions or for batch prediction tasks.
• Vertex pipelines: This feature allows you to orchestrate your
machine learning workflows, stringing together complex
sequences of data preparation, model training, and evaluation
steps into automated, reusable pipelines.
• Explainability: Understanding how a model makes decisions
is crucial for many applications. Vertex AI includes tools for
generating explanations for your model's predictions, offering
insights into feature importance.
• Monitoring and maintenance: Vertex AI includes built-in
monitoring tools that provide real-time statistics on your
deployed models, helping to maintain the health and
performance of your machine learning systems.
• Data labeling service: If you need to annotate data for
supervised learning, Vertex AI offers a data labeling service
that makes it easy to create high-quality training datasets.
• Endpoints: These are the network-accessible URLs where your
deployed models are served. They can handle online and
batch prediction requests.
• Vertex vizier: An optimization service that automatically
fine-tunes your model's hyperparameters, facilitating better
performance without manual tuning.
Key features of Vertex AI
The following are the key distinguishing features that set Vertex AI
apart as a comprehensive machine-learning solution:
• Unified platform: Vertex AI offers a centralized interface
where you can prepare data, build, train, and deploy models,
thus simplifying the machine learning lifecycle.
• Scalability: The platform is designed to scale with your needs,
from a few data points to petabytes, without requiring any
hardware or software management.
• Framework flexibility: You are not tied to a specific machine
learning framework; Vertex AI supports popular frameworks
like TensorFlow, PyTorch, and scikit-learn, giving you the
freedom to use the tools you're comfortable with.

• AutoML tables: This feature allows you to automatically build
and deploy machine learning models on structured data,
providing a fast way to go from raw data to actionable
insights.
• Real-time prediction: Once models are deployed, you can get
real-time predictions, making it suitable for dynamic and
interactive applications.
• Batch prediction: For larger datasets that do not require
immediate responses, Vertex AI supports batch predictions.
• Built-in algorithms: Vertex AI offers a selection of pre-built
algorithms that can be used out-of-the-box, saving time and
resources that would otherwise be spent building algorithms
from scratch.
• Hyperparameter tuning: With vertex vizier, you can
automatically fine-tune model parameters to optimize for
specific outcomes, thereby improving model performance.
• Resource management: Vertex AI also allows you to allocate
and manage resources efficiently, ensuring you are not overprovisioning or underutilizing your cloud resources.
• Robust security features: Data and model security are
backed by Google Cloud's state-of-the-art encryption and
authentication services.
• Model evaluation and monitoring: Post-deployment, the
platform offers tools for continuous monitoring and evaluation
of model performance, making it easier to maintain and
update models over time.
• Codeless UI: For those who prefer a graphical interface over
code, Vertex AI provides a user-friendly UI to perform many of
the 
operations, 
reducing 
the 
entry 
barrier 
for 
nonprogrammers.
Generative AI
Before diving into how Vertex AI leverages the capabilities of
generative AI, it is essential to understand what generative AI is all
about. Generative AI is a class of artificial intelligence models
designed to create new data resembling the data it was trained on.

---

## Sección 49: CHAPTER 5 [Entropy: 0.46]

Unlike traditional AI models that make predictions or classifications
based on input data, generative models can produce new data
similar in structure and content to the original dataset.

These models have a wide range of applications, as follows:
• Image generation Generative AI can create entirely new
images 
or 
modify 
existing 
ones 
in 
ways 
that 
are
indistinguishable from natural images. These techniques are
increasingly used in art creation, video game development,
and virtual environment simulations. Following are the
examples:
○ DeepArt: 
This 
platform 
uses 
neural 
style 
transfer
techniques to convert your photos into famous art styles.
○ NVIDIA GauGAN: This AI tool allows you to create
photorealistic landscapes by sketching the layout.
○ FaceApp: Uses generative models to realistically age faces,
change expressions, or even swap genders in photographs.
• Text generation Generative AI models can write coherent and
contextually relevant text given a sequence of words or
sentences. This has applications in chatbots, automated
journalism, and even code generation. Following are the
examples:
○ GPT-3 by OpenAI: Powers applications that require
human-like text, such as writing, summarizing, and coding.
○ Chatbots: Customer service bots like Mitsuku utilize text
generation to provide human-like interactions.
○ Quillbot: An AI writing and paraphrasing tool that helps
you rewrite or summarize articles.
• Data augmentation Data augmentation involves creating new
data based on existing data to improve the robustness of
machine learning models. Generative models can create
realistic data points that can be used for training predictive
models, particularly useful in healthcare, finance, or any field
where data is scarce or expensive to collect. Following are the
examples:
○ Synthetic Minority Over-sampling Technique (SMOTE):
Widely used for balancing class distribution in machine
learning.
○ Medical Imaging: Generative models can create additional
X-ray or MRI images to improve diagnosis models.
• Simulations Generative AI can model complex systems and
predict the outcomes of scenarios, which is useful in many

fields like climate science, financial markets, and logistics.
These simulations can be used for research purposes or for
real-time 
decision-making 
systems. 
Following 
are 
the
examples:
○ IBM's GRAF model: Used for more accurate weather
forecasting.
○ Stock market simulation: Quantitative analysts use
generative models to simulate different market conditions
and make predictions.
○ Traffic simulations: Urban planners use generative AI to
model different transportation scenarios and optimize
traffic flow.
Vertex AI Studio
Vertex AI Studio in Vertex AI helps you rapidly prototype and test
generative AI models. It is built on top of Google AI's research and
development in generative AI, and it offers a variety of features that
make it easy to get started with generative AI and to customize
foundation models to handle tasks that meet your application's
needs.
With Vertex AI Studio, you can perform the following functions:
• Rapid prototyping: Vertex AI Studio makes it easy to get
started with generative AI. You can start prototyping your
ideas in minutes without having to write any code.
• Customization: Vertex AI Studio allows you to customize
foundation models to handle tasks that meet your application's
needs. This is useful for tasks that are not well-supported by
existing foundation models.
• Testing: Vertex AI Studio provides a variety of tools for
testing your generative AI models. You can test your models
on sample prompts, or you can design your own prompts. You
can also compare the performance of different Refer to the
following figure:

Figure 5.2: Vertex AI studio in Vertex AI
Model garden
Model garden is a curated collection of pre-trained AI models,
including enterprise-ready foundation model APIs, open source
models, and task-specific models from Google and third parties.
Model garden provides a one-stop shop for discovering, testing, and
deploying AI models on Vertex AI.
To use model garden, simply go to the model garden page in the
Vertex AI console. Browse the available models and select the
model that you want to use. You can then test the model with
sample inputs or deploy the model to production as shown in Figure
5.3:
Figure 5.3: Model Garden in Vertex AI

Popular models
Following are some popular models available in Model Garden:
• Foundation models: Foundation models are large language
models that can be used for a variety of tasks, including text
generation, translation, and question answering. Model garden
includes a number of foundation models, are as follows:
○ Gemini: Google’s 
latest 
multimodal 
model, 
handling
natural language tasks, code generation, multiturn chat,
and code chat. It supports text, code, and chat prompts,
making it suitable for various scenarios.
○ PaLM: Designed for text-based tasks, PaLM excels in
understanding and generating human-quality text. It's adept
at 
tasks 
like 
question 
answering, 
summarization,
translation, and code generation.
○ Imagen: Image generation model allows you to create
realistic and visually compelling images from text
descriptions. It is ideal for tasks like generating product
mockups, creating illustrations, or manipulating existing
images.
• Codey: This suite consists of three models focused on coderelated tasks, as follows:
○ Code generation: Generates code snippets based on
natural language descriptions.
○ Code chat: Enables interactive code completion and
generation through a conversational interface.
○ Code completion: Suggests code completions as you type,
improving developer productivity.
• Pre-trained APIs: Model Garden also includes a number of
pre-trained APIs that can be used for a variety of tasks,
including natural language processing, translation, and vision.
Here are a few examples:
• Natural Language Processing APIs:
○ Cloud Natural Language API: The Cloud Natural
Language API provides a variety of services for natural
language processing, including sentiment analysis, entity
extraction, and text classification.
○ Cloud Translation API: The Cloud Translation API
provides a service for translating text between languages.

---

## Sección 50: CHAPTER 5 [Entropy: 0.545]

○ Cloud Vision API: The Cloud Vision API provides a service
for detecting and classifying objects in images.
• Open source models: Model garden also includes a number
of open-source models, as follows:
○ Meta's Llama 2: Llama 2 is a large language model from
Meta that can generate text, translate languages, and
answer questions.
○ TII's Falcon: Falcon is a large language model from TII that
can generate text, translate languages, and answer
questions.
○ BERT: BERT is a large language model from Google AI that
can be used for a variety of tasks, including natural
language processing, translation, and question answering.
○ T-5: T-5 is a large language model from Google AI that can
be used for a variety of tasks, including natural language
processing, translation, and text summarization.
○ FLAN: FLAN is a large language model from Google AI that
can be used for a variety of tasks, including natural
language processing, translation, and question-answering.
○ ViT: ViT is a vision transformer model from Google AI that
can be used for a variety of tasks, including image
classification, object detection, and image segmentation.
• EfficientNet: EfficientNet is a convolutional neural network
model from Google AI that can be used for a variety of tasks,
including image classification, object detection, and image
segmentation.
Training models with your own data
Vertex AI Studio allows you to train your own generative AI models
using your own data. This is useful for tasks that are not wellsupported by existing foundation models, or for tasks where you
need to generate outputs that are consistent with your own data.
To train a model with your own data, you will need to provide
Vertex AI Studio with a dataset of labeled examples. The dataset
should be in a format that is compatible with Vertex AI Studio.
Once you have uploaded your dataset, Vertex AI Studio will train a
model for you. The training process can take several hours,
depending on the size and complexity of your dataset.

Once the model is trained, you can use it to generate outputs using
the same interface that you use to test sample prompts.
Use cases
Generative AI can be used for a variety of tasks, as follows:
• Prototyping new AI-powered applications: Vertex AI Studio
can be used to rapidly prototype new AI-powered applications,
such as chatbots, virtual assistants, and creative content
generators.
• Improving existing AI-powered applications: Vertex AI
Studio can be used to improve existing AI-powered
applications by customizing foundation models to handle tasks
that are not well-supported by existing foundation models.
• Generating creative content: Vertex AI Studio can be used to
generate creative content, such as poems, stories, and code.
• Translating languages: Vertex AI Studio can be used to
translate languages.
• Generating speech: Vertex AI Studio can be used to generate
speech.
Pricing structure
Following is the pricing structure of Generative AI:
• Pay-as-you-go: Vertex AI is a pay-as-you-go service, meaning
you only pay for the resources you use. This is in contrast to
traditional machine learning platforms, which often require
upfront costs or long-term commitments.
• Training costs: Charges for training models depend on the
type and number of machines you use. Specialized hardware
like Tensor Processing Units (TPUs) will have different
pricing than standard CPUs or GPUs.
• Prediction costs: Once a model is deployed, you will incur
costs for online and batch predictions. These costs are also
based on the computing resources used to make the
predictions and may include data transfer fees.
• AutoML costs: Utilizing AutoML features for training comes
with its own separate cost, generally higher than manual
model training due to the additional automation and
optimization it offers.

• Data storage and transfer: There are costs associated with
storing your models and datasets in Google Cloud Storage,
especially if you are working with large datasets. Additionally,
data transfer costs may apply when moving data in and out of
Vertex AI.
• Hyperparameter tuning: This is billed separately and is
based on the computational resources used during the tuning
process.
• Monitoring and logging: Using monitoring services like
Vertex Monitoring can add additional costs, based on the
amount of data that is logged and monitored.
• Region-specific pricing: Prices may vary depending on the
Google Cloud region in which you are operating, due to
differences in local infrastructure costs.
• Free tier: Google Cloud often offers a free tier with certain
limitations for Vertex AI, which is a great way to get started
and experiment without incurring costs.
Best practices of Vertex AI
Now let us delve into some of the best practices for harnessing
Vertex AI's capabilities to the fullest, as follows:
• Understand your data: Before jumping into model training,
it's essential to understand your data. Vertex AI integrates well
with data analytics tools like BigQuery, which can be used for
data exploration.
• Use AutoML wisely: While AutoML is powerful, it is not a
one-size-fits-all solution. Use it for quick prototyping and tasks
that do not require fine-grained control over the model
architecture.
• Monitoring 
and 
logging: 
Enable 
detailed 
logs 
and
monitoring to keep track of your model's performance and
usage. Google Cloud's monitoring and logging services can be
easily integrated with Vertex AI.
• Model versioning: Always keep track of your model versions.
Vertex AI provides native support for model versioning,
making it easier to roll back to earlier versions if needed.
• Secure your models: Make sure you adhere to Google Cloud's
IAM policies to secure your machine learning models. Limit
access only to those who need it.

• Optimize costs: Be mindful of the resources you allocate for
training and prediction. Vertex AI allows custom compute
options, so choose the ones that best suit your budget and
performance needs.
• Batch predictions for efficiency: If real-time prediction is
not a requirement, consider using batch prediction to lower
costs and improve efficiency.
• Use pre-trained models: Before training a model from
scratch, see if Google's library of pre-trained models can meet
your needs. This can save both time and computational
resources.
• Test thoroughly: Before deploying any model, make sure to
test it rigorously under different conditions to ensure it meets
your performance and accuracy expectations.
For more details and best practices, you can refer to the official
[Vertex AI Documentation] (https://cloud.google.com/vertex-ai/
docs).
Summary
• Unified platform: Vertex AI brings together all the tools and
services required for the entire machine learning workflow
data preparation, feature engineering, training, deployment,
and prediction, all under one umbrella.
• MLOps capabilities: Native MLOps tools make it easier to
manage models and data pipelines, helping teams become
more efficient by automating routine tasks.
• AutoML support: Whether you are a seasoned data scientist
or new to machine learning, Vertex AI's AutoML features can
automatically generate high-quality models tailored to your
data.
• Scalability: With the power of Google Cloud behind it, Vertex
AI can handle projects of any size. It can scale resources up or
down depending on the requirements, thus optimizing costs
and performance.
• Integrated tooling: Vertex AI is designed to seamlessly
integrate with Google's other cloud services, like BigQuery for
data analytics or Dataflow for data engineering, making it
easier to implement end-to-end solutions.

---

## Sección 51: CHAPTER 5 [Entropy: 0.515]

• Extensive pre-built models: Aside from building your own,

you can leverage pre-trained models for common tasks like
image recognition, text analysis, and more.
• Custom compute options: You can choose from various types
of hardware for training and prediction, including CPUs,
GPUs, and TPUs, allowing for flexibility and optimization of
costs and performance.
• Serverless 
inference: 
Vertex 
AI 
supports 
serverless
deployment 
for 
your 
models, 
abstracting 
away 
the
infrastructure management so you can focus on building
quality models.
• Explainability and fairness: Built-in tools for model
explainability and fairness audits allow you to understand
your model's decisions better and ensure they are free from
biases.
Understanding what makes Vertex AI unique can help you make an
informed decision when choosing a machine-learning platform for
your needs.
Trivia
1. Which feature of Vertex AI provides insights into why a
model made a specific prediction?
a. TensorBoard Integration
b. Vizier for Hyperparameter Tuning
c. Explainable AI
d. Continuous Monitoring
Answer: c. Explainable AI
Document AI
Google Cloud's Document AI is a versatile machine learning solution
designed to transform the way organizations deal with unstructured
data in documents. Built on top of Google's machine learning and
natural language processing technology, Document AI goes beyond
simple Optical Character Recognition (OCR). It can identify and
understand the context, structure, and meaning behind the text and
even images in various document types, including invoices,

contracts, and forms.
The service provides an array of capabilities, including, but not
limited to, text extraction, table parsing, sentiment analysis, and
entity recognition. By automating these tasks, Document AI
empowers businesses to focus on deriving actionable insights rather
than getting bogged down by manual document sorting and data
entry.
The key advantage of Document AI is its integration within the
broader Google Cloud ecosystem. This makes it easy to pair with
other services like BigQuery for advanced analytics or Vertex AI for
customized machine learning models, creating a seamless pipeline
from document ingestion to data analysis and decision-making.
Moreover, its robust set of APIs makes it highly flexible and easily
customizable to fit specific industry needs. Whether you are in
healthcare, finance, or retail, Document AI provides a fast, secure,
and scalable solution to automate document understanding and data
extraction, thereby enabling smarter workflows and improved
efficiency across the organization. Refer to the following figure:
Figure 5.4: Document AI processor gallery
Key concepts of Document AI
As we delve into Document AI, it is crucial to understand the
foundational elements that power this robust document processing
platform. Following are the key concepts:

• Document understanding: This is the capability to extract
meaning from document text and images, enabling data
extraction, categorization, and more.
• Invoice and receipt parsing: Specialized parsers can extract
essential information from invoices and receipts, such as
dates, amounts, and vendor names.
• Natural Language Understanding (NLU): Beyond simple
text extraction, Document AI integrates natural language
processing to understand the context and sentiment of the
text.
• Optical Character Recognition: This technology converts
different types of documents, including scanned paper
documents, PDFs, and images, into editable and searchable
data.
• Text classification and clustering: Document AI can
categorize and cluster text based on content or other criteria,
making it easier to sort or analyze.
• Entity recognition: Beyond merely extracting text, Document
AI can identify and classify named entities within the content,
such as names, dates, and financial figures.
• Form parsing: When dealing with forms or structured
documents, the platform can identify fields, extract the
information, and even validate the data based on predefined
criteria.
• Semantic search: Using the extracted and understood data,
Document AI can facilitate semantic search, allowing for more
nuanced and context-aware search queries within your
document repository.
• Integration and APIs: One of Document AI's strengths is its
ability to integrate seamlessly with other Google Cloud
services and its robust set of APIs, which allow for extensive
customization and automation.
• Security and compliance: Document AI is designed with
strict security protocols to handle sensitive data. It offers finegrained control over who can access your documents and
what operations they can perform.
• Scalability: The platform can scale as your needs grow,
accommodating anything from small batches of documents to
millions of pages.

Key features of Document AI
Document AI comes with a robust set of features that streamline the
document processing workflow and enable deeper insights into your
data. Following are some of the primary features:
• Automated data extraction: It can automatically pull
information like names, dates, and totals from documents,
making manual data entry unnecessary.
• Content classification: Advanced machine learning models
categorize document types and content, making it easier for
users to organize and manage files.
• Multi-language support: Document AI supports multiple
languages, broadening its usability across different regions
and industries.
• Pre-trained 
models: 
Leverage 
pre-trained 
models 
to
recognize specific document types like invoices, forms, and
contracts, saving time and resources.
• Custom models: For specialized requirements, users can train
their custom models to fit their specific document-processing
needs.
• Data validation: Beyond simple extraction, Document AI can
also validate the data it extracts against predefined criteria,
helping ensure data accuracy.
• Integration 
with 
Google 
Cloud 
Services: 
Seamless
integration with other Google Cloud services like Google
Cloud Storage and BigQuery allows for an end-to-end
document processing pipeline.
• Security and compliance: Ensuring the security of your data
is paramount. Document AI complies with Google Cloud's
stringent security protocols, including encryption and access
management controls.
• Batch and real-time processing: Whether you need to
process documents in real-time or in batches, Document AI
offers the flexibility to choose the most efficient and costeffective method for your use case.
Pricing structure
Understanding the pricing structure of Document AI can enable you
to make a more informed decision regarding its adoption for your

---

## Sección 52: CHAPTER 5 [Entropy: 0.545]

specific needs. Generally, the pricing is consumption-based and
varies based on the volume of pages processed, the type of models
used, and any additional features like language support or data
validation, as follows:
• Per-page pricing: Costs are typically based on the number of
pages processed, which allows for scalability as your needs
evolve.
• Custom versus pre-trained models: Using pre-trained
models is usually more cost-effective than training and
deploying custom models. However, custom models may be
necessary for specialized tasks.
• Additional features: Extra services like data validation,
advanced language support, or integration with other Google
Cloud services may incur additional costs.
• Monthly commitments: Some pricing plans may offer
discounts for monthly commitments or higher volumes of data
processing.
• Free tier: Document AI usually has a free tier for developers
and small businesses to experiment with its features without
incurring immediate costs.
It is essential to consult the official Google Cloud pricing page for
the most up-to-date information on Document AI pricing.
Related quotas
As with many cloud services, Document AI comes with certain
limitations and quotas designed to ensure fair usage and manage
system resources effectively.
Following are some key quotas to consider:
• Rate limits: There may be limits on the number of Requests
Per Second (RPS) or Minutes (RPM) you can make to
Document AI APIs, usually tiered based on the type of account
you have (free tier, paid, enterprise).
• Data size limits: The service usually imposes restrictions on
the maximum size of the documents that can be processed.
The limits can differ depending on the specific Document AI
product you are using.
• Concurrent requests: Limits are also placed on the number of
requests that can be processed concurrently. Exceeding this

limit would queue the additional requests.
• API call quotas: Different types of API calls like text
extraction, entity recognition, and so forth might have
individual quotas.
• Geographic restrictions: Some features or models may not be
available in all regions, affecting where you can deploy your
solutions.
It is advisable to check Google Cloud's official documentation for
the most accurate and current information on quotas related to
Document AI. Knowing these quotas will help you manage your
usage effectively and avoid unexpected restrictions or additional
costs.
Fun fact
Human parity: In 2020, Google AI researchers published a paper
showing that their machine learning algorithms for document
extraction had achieved human parity on several benchmarks. This
means that the algorithms were able to extract information from
documents with the same accuracy as human experts.
Trivia
Which of the following is NOT a primary function of Google
Cloud's Document AI?
a. Extracting structured data from unstructured documents.
b. Translating documents from one language to another.
c. Automating the classification of documents.
d. Enabling human-like understanding of forms and invoices.
Answer: b. Translating documents from one language to another.
(Translation is primarily handled by Google Cloud Translation, not
Document AI.)
Agent Builder
Agent Builder is a tool within the Google Cloud Platform designed
to facilitate the development of generative AI applications.
Recognizing the complexities of AI application development, the
platform aims to provide developers, irrespective of their deep

machine learning knowledge, a more accessible avenue to harness
AI capabilities. Refer to the following figure:
Figure 5.5: Agent Builder UI
At its essence, Agent Builder utilizes Google's foundational models.
These models, having been trained on extensive data sets, provide a
reliable backbone for application development, allowing developers
to initiate projects with a solid base.
One notable feature of Agent Builder is its integration with Google's
search capabilities. This ensures that applications can efficiently
process information, generate insights, and produce relevant
outputs. This is especially valuable for developers aiming to create
applications with precision and relevance in their domain.
The platform's incorporation of Google's conversational AI
technologies allows developers to design applications that can
interact with users in a more human-like manner. This is
increasingly important in a digital landscape where user
engagement and understanding are paramount.
In summary, Agent Builder provides developers with tools and
integrations to build generative AI applications with greater ease
and efficiency. While harnessing the power of foundational models
and other Google technologies, the platform emphasizes
practicality, aiming to help developers create applications that are
both functional and user-centric.
Key features of Agent Builder
Following are the key features of Agent Builder:
• Generative AI agent: Generative AI agent is an integral

component of the Generative AI App Builder and is
architected atop the Dialog flow platform. This innovative
feature facilitates the creation of a virtual agent through GCP
console. Once set, the Generative AI App Builder meticulously
parses the provided content, subsequently leading to the birth
of a virtual agent animated by large language models. This
agent is adept at conversing about the parsed content with the
end-users, thus creating an interactive experience.
• Enterprise search and recommendations: When discussing
AI-enabled search and recommendation functionalities for
websites or mobile applications, Agent Builder 's Enterprise
Search 
and 
Recommendations 
provide 
fully-managed
platforms invigorated by large language models. Enterprise
search empowers users to swiftly erect a search functionality.
By leveraging this, one can seamlessly embed a search bar
within web pages or applications, thus enriching the user
experience as shown in Figure 5.6a:
Figure 5.6a: Steps to create Enterprise Search app

Figure 5.6b: Further steps to create Enterprise Search app
The Recommendations feature (As of Oct 2023 this feature is in
preview) allows users to promptly establish a recommendation
application for their data. What is more is that this application
astutely suggests content mirroring the content currently being
viewed by the user.
Following are the key features across both enterprise search
and recommendations:
• Natural language and semantic search: With built-in
natural language understanding, users benefit from a top-tier
search experience sans the rigors of establishing and
sustaining systems tailored for keyword searches or pattern
matching.
• Advanced language processing: The platform inherently
grasps synonyms, undertakes spell-check, and proactively
suggests searches — circumventing the need for intricate
natural language processing implementations.
• Generative AI integration: Harness the might of generative
AI for summarizing and conducting conversational searches
amidst unstructured documents.
• Recommendations 
out-of-the-box: 
Benefit 
from 
MLempowered content and metadata comprehension, guiding
users to swiftly identify analogous content.
• Unified console and APIs: With the Agent Builder console
and 
APIs 
at 
your 
disposal, 
instating 
a 
search 
or
recommendations app for structured/unstructured data.

---

## Sección 53: CHAPTER 5 [Entropy: 0.31]

• Integration-ready widgets: For a seamless blend into
websites and apps, Agent Builder extends integration-ready
widgets.
• Self-learning 
capabilities: 
The 
platform's 
models 
are
continually evolving, learning from user interactions. Coupled
with advanced analytics, these offer invaluable insights.
However, this necessitates access to the user's clickstream.
Fun fact
Agent Builder is one of the few platforms that allows developers to
build generative AI applications without the need for deep machine
learning knowledge.
Conclusion
In this chapter we explored the various AI and ML services available
on GCP. We delved into Vertex AI, a unified platform for building,
testing, scaling, and deploying your AI/ML applications. We also
explored the burgeoning field of Generative AI, its potential
applications, and the model options available through the Model
Garden and the recently launched Gen AI App Builder.
In the next chapter, we will explore the networking options
available within GCP.
Multiple choice questions
1. What does Vertex AI's AutoML allow users to do?
a. Manually select algorithms for model training.
b. Perform detailed logs and monitoring only.
c. Automatically train a model using given datasets.
d. Deploy web applications.
2. What is the primary purpose of vertex pipelines?
a. To provide real-time chat support.
b. To orchestrate machine learning workflows.
c. To manually tune model hyperparameters.

d. To offer cloud storage solutions.
3. Which of the following best describes the primary
functionality of Document AI?
a. Web scraping tool
b. Cloud storage system
c. Document parsing and data extraction tool
d. Graphical design software
4. Document AI enhances search capabilities by providing:
a. Keyword-based search only.
b. Semantic search and natural language understanding.
c. Manual indexing of documents.
d. Animation features for documents.
5. One of the key benefits of Document AI for large
businesses is:
a. Converting documents into websites.
b. Automating data extraction from voluminous documents.
c. Offering cloud-based word processing.
d. Designing business logos.
6. Which of the following is not a feature of Generative AI
App Builder?
a. Generative AI agent
b. Enterprise Search and Recommendations
c. Dialogflow Integration
d. AutoML Engine
7. The Generative AI agent within the Agent Builder is built
on which platform?

a. TensorFlow
b. AutoML
c. Dialogflow
d. Vertex AI
8. Which feature of Agent Builder is designed specifically
for website or mobile application recommendations?
a. Generative AI Agent
b. Enterprise Search
c. AutoML Engine
d. Recommendations (Preview)
9. Which of the following is NOT an actual quota for Agent
Builder?
a. Number of documents per organization
b. Pending import operations per project
c. Daily API call count
d. Complete query requests per minute per organization
Case studies
1. A large e-commerce company was struggling to provide a
personalized experience for its customers. Customers were
often bombarded with irrelevant product recommendations
and marketing messages. The CTO of this company wants to
standardize data science efforts on a single platform to
minimize 
development 
and 
operational 
friction 
while
accelerating rapid prototyping and experimentation.
2. A large financial services company was struggling to detect
fraudulent 
transactions 
in 
real-time. 
Fraudsters 
were
becoming increasingly sophisticated and were able to evade
traditional fraud detection systems.
3. A large healthcare company was struggling to extract

information from medical records in a timely and accurate
manner. Medical records are often complex and contain a lot
of unstructured data. What solution will you propose to solve
their challenges?
Answer key
1. c. Automatically train a model using given datasets.
2. b. To orchestrate machine learning workflows.
3. c. Document parsing and data extraction tool
4. b. Semantic search and natural language understanding.
5. b. 
Automating 
data 
extraction 
from 
voluminous
documents.
6. d. AutoML Engine
7. d. Vertex AI
8. d. Recommendations (Preview)
9. B. Pending import operations per project
Case studies
1. The company can use Vertex AI platform to create dev, test
and prod environments. For personalization, company can use
either pre-built recommendations AI or develop its own
machine learning mode.
2. The company can use Vertex AI to develop a new machine
learning model that could detect fraudulent transactions with
greater accuracy and speed. The model can be trained on a
massive dataset of historical transaction data, including both
fraudulent and non-fraudulent transactions. Once trained, the
model can be deployed on a production environment and
used to monitor all incoming transactions in real time.
3. The company used Document AI to extract information from
medical records automatically. Document AI lets you train
new processor versions using your own training data and
evaluate the quality of your processor version against your
own test data.

Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 54: CHAPTER 6 [Entropy: 0.5]

Networking in GCP
Introduction
The underlying foundation of any cloud infrastructure is its
networking capabilities. In today's hyper-connected digital age, the
efficiency, security, and scalability of networking solutions are
paramount for businesses aiming to optimize their cloud
deployments. Google Cloud Platform (GCP) offers a wide range of
robust suite of networking services designed to handle tasks ranging
from content delivery and load balancing to virtual private
networks and peering. This chapter will provide an in-depth
exploration of GCP's networking services, equipping you with the
knowledge to architect and manage efficient network infrastructures
in the cloud.
Structure
Following is the structure of the chapter:
• VPC networks
• Routes
• Network services
• Hybrid connectivity
• Network security

Objectives
By the end of this chapter, you'll have a firm grasp of cloud
networking's intricacies. You'll understand how to design,
implement, and manage networks that ensure seamless
communication between your data, applications, users, and
interconnected services. As the digital ecosystem grows more
interconnected, understanding the intricacies of networking
becomes indispensable. This chapter on Networking in GCP is
meticulously designed to furnish readers with an in-depth
understanding of GCP's networking services. From the foundational
principles of Virtual Private Clouds to the advanced functionalities
of network intelligence and security, our journey will encompass
the breadth and depth of GCP's offerings.
By the end of this chapter, you will be well-versed in GCP's
networking services and best practices, enabling you to design and
deploy effective and secure cloud network architectures.
Key concepts of GCP
The following are some key concepts you should know before we
delve deeper into GCP network services:
• Virtual Private Cloud (VPC): A VPC provides an isolated
virtual network within GCP, offering a private space where
users can provision their Google Cloud resources. It facilitates
communication among resources, both internally to Google
Cloud and externally to other networks.
• Subnetworks (Subnets): These are subdivisions within a
VPC, representing IP range segments. Subnets allow for
organized segmentation of network resources in different
regions.
• IP addresses: Every machine on a network requires an IP
address for communication. In GCP, users can opt for
ephemeral (temporary) or static IP addresses. There's also the
option to "bring your own IP" for organizations with specific
IP address requirements.
• Firewall: A set of rules defining which network traffic is
permitted or denied within a VPC. It's pivotal for ensuring the
security of networked resources.
• Routes: Routing tables direct traffic, ensuring that data

packets get where they're meant to go, either within the
network or out to the internet.
• Load balancing: Distributes incoming network traffic across
multiple 
resources, 
ensuring 
no 
single 
resource 
is
overwhelmed, leading to more efficient resource utilization
and increased application availability.
• Cloud DNS: Google Cloud's domain name system service
translates friendly domain names like www.example.com into
IP addresses, which are required for routing traffic to the
appropriate servers.
• Hybrid connectivity: The ability to connect Google Cloud
resources with other public clouds or on-premises data
centers, 
ensuring 
seamless 
operations 
across 
different
environments.
• Network security: Measures and tools to protect data during
transfer within or outside the network. This includes features
like SSL/TLS encryption, firewall rules, and threat detection.
• Network telemetry: Insights into network operations,
performance metrics, and potential issues, facilitated by tools
such as the Network Intelligence Center in GCP.
With these foundational concepts introduced, we can delve deeper
into each section, detailing the services GCP offers and how they are
implemented and utilized.
VPC networks
Google Cloud's Virtual Private Cloud (VPC) is a dynamic, flexible,
and robust tool that provides a secure private network space within
the Google Cloud ecosystem. It allows users to deploy and manage
Google Cloud resources, offering a slew of advanced networking
features tailored for modern cloud-native applications. The idea
behind VPC is to offer a scalable and secure environment that
mirrors the capabilities of a physical network but with the
advantages of cloud computing.
Introducing VPC
At its core, VPC is a globally distributed, virtualized replica of a
traditional network, with its resources located within Google's
infrastructure. Unlike the confined, regional nature of physical

networks, VPCs on Google Cloud are global, ensuring that the
network's reach is not bound by regional limitations. This offers
several advantages, as follows:
• Seamless global communication: Even if your resources
(like VM instances) are scattered across various regions, they
are all part of a single private network. They can communicate
with each other as if they are in the same room, without
incurring additional egress costs associated with inter-regional
communication.
• Isolation and security: While VPCs are expansive, they are
also isolated environments. This means that the data and
applications within a VPC are segregated from the outside
world, ensuring heightened security.
• Flexibility and customization: Google Cloud's VPC allows
users to craft their virtual network meticulously. You can
segment your VPC into subnets, define IP address ranges,
create routes, apply firewall rules, and more. This ensures that
you have granular control over your network's topology and
traffic.
Importance of VPC networks
The transition to cloud computing has seen an increasing number of
enterprises migrating their operations to the cloud. With this shift,
the need for a secure, reliable, and scalable network environment
becomes paramount. VPC networks fit the bill by offering as
follows:
• Efficient resource management: By enabling resources from
different regions to communicate within the same VPC
without the need for a cloud VPN, VPC networks optimize
resource utilization and reduce complexity.
• Scalability: As your business grows, so does your network's
demands. VPC networks can scale seamlessly without the need
for significant infrastructure changes, ensuring that your
operations run smoothly even under increased loads.
• Cost-effectiveness: Since inter-regional data transfers within
the VPC do not incur additional costs and because of the
efficient use of resources, VPC networks can lead to significant
cost savings.
• Integration with other GCP services: VPC networks

---

## Sección 55: CHAPTER 6 [Entropy: 0.5]

integrate seamlessly with other Google Cloud services, like
Cloud load balancing, Cloud Content Delivery Network
(CDN), and more. This ensures that your applications and
services get the best of Google Cloud's offerings, all within a
cohesive network environment.
VPC peering
VPC peering in Google Cloud is a mechanism that allows for private
communication between two VPC networks, regardless of whether
they belong to the same project or organization, or whether they
are in the same region. This connection is achieved without having
to use an external IP address, VPN, or separate network connection.
To create a VPC peering connection, you must first create a peering
request in one of the VPC networks. Once the peering request is
accepted in the other VPC network, the peering connection is
established.
VPC peering has a number of benefits, as follows:
• Improved performance: VPC peering can improve the
performance of your applications by allowing resources in
each VPC network to communicate with each other directly,
without having to go through the public internet.
• Increased security: VPC peering can increase the security of
your VPC networks by isolating them from the public internet.
• Reduced costs: VPC peering can reduce the costs associated
with data transfer by allowing resources in each VPC network
to communicate with each other directly, without having to
go through the public internet.
Following are some key points to be kept in mind for VPC peering:
• Privacy: Communication via VPC peering remains entirely
within Google's infrastructure, ensuring the data remains
secure.
• Global 
reach: 
VPC 
Peering 
is 
global, 
allowing 
for
communication between VPC networks in different regions.
• No overlapping IP ranges: VPC networks with overlapping IP
ranges cannot be peered.
• Transitivity: VPC Peering is non-transitive, meaning if VPC A
is peered with VPC B and VPC B is peered with VPC C, VPC A

and VPC C do not have a direct peering relationship.
VPC controls
VPC service controls enhance the security perimeter around Google
Cloud resources. They allow administrators to define a security
perimeter around Google Cloud resources such as Cloud Storage
buckets, Compute Engine instances, and BigQuery datasets to
constrain data within a VPC and prevent data exfiltration.
VPC controls include the following features:
• Firewalls: Firewalls can be used to control traffic to and from
your VPC network. You can use firewalls to allow or deny
specific types of traffic, such as HTTP, TCP, or UDP traffic.
You can also use firewalls to specify the source and
destination IP addresses or IP address ranges for allowed or
denied traffic.
• Routes: Routes can be used to control the flow of traffic
within your VPC network. You can use routes to specify the
path that traffic should take to reach a destination.
• Network Access Control Lists (ACLs): Network ACLs can be
used to control access to specific resources in your VPC
network. You can use network ACLs to allow or deny specific
types of traffic to and from specific resources.
• Service controls: Service controls can be used to control
access to Google Cloud services from your VPC network. You
can use service controls to specify which services can be
accessed from your VPC network and which projects are
allowed to access those services.
VPC controls are an important part of any VPC network security
strategy. By using VPC controls effectively, you can help to protect
your VPC network from unauthorized access, malicious activity, and
data exfiltration.
Following are some examples of how VPC controls can be used:
• Prevent unauthorized access to your VPC network: You
can use firewalls to prevent unauthorized access to your VPC
network. For example, you can use a firewall to deny all
incoming traffic except for traffic from specific IP addresses.
• Protect your VPC network from malicious activity: You
can use network ACLs to protect your VPC network from

malicious activity. For example, you can use a network ACL to
deny all traffic to and from specific ports.
• Prevent data exfiltration: You can use service controls to
prevent data exfiltration from your VPC network. For
example, you can use service controls to deny access to Google
Cloud Storage from your VPC network.
Shared VPC
A Shared VPC is a feature that allows you to share your VPC
network with other projects in your organization. This can be useful
for centralizing network management and reducing costs.
To create a Shared VPC, you must first enable the Shared VPC
feature in your organization's billing account. Once the feature is
enabled, you can create a host project and attach service projects to
it. The host project is the project that owns the VPC network that
you want to share. The service projects are the projects that will be
able to use the VPC network.
Once you have attached service projects to the host project, you can
grant them access to specific subnets in the VPC network. You can
also grant them access to specific services in the VPC network, such
as Cloud Load Balancing and Cloud SQL.
Shared VPCs have a number of benefits, as follows:
• Centralized network management: Shared VPCs allow you
to centralize the management of your VPC networks. This can
help to simplify network management and reduce costs.
• Improved security: Shared VPCs allow you to improve the
security of your VPC networks by centralizing network
security policies.
• Reduced costs: Shared VPCs can help you to reduce costs by
allowing you to share your VPC networks with other projects
in your organization.
• Resource separation: Although the network is shared,
resources from individual projects remain isolated and
distinct.
Shared VPC’s can be used in many different scenarios to enable
seamless networking between different sections of infrastructure.
Following are some examples of how you can use shared VPCs to

enhance your cloud infrastructure:
• You can use shared VPC network to connect with your onpremises data center to create a unified network environment.
This will facilitate seamless communication between onpremises and cloud resources while enabling you to leverage
cloud services within your on-premises infrastructure.
• A company might use a shared VPC to share its VPC network
with its different business units. Shared VPC enable seamless
collaboration between different business units within an
organization by sharing network resources.
• A company might use a Shared VPC to facilitate collaboration
and integration with external partners or third-party services
by providing them with access to the shared VPC network.
If you are considering using shared VPCs, you should carefully
consider the following factors:
• Network security: Shared VPCs can make it more complex to
manage network security. You need to make sure that you
have the appropriate security policies in place to protect your
VPC network.
• Cost: Shared VPCs can help you to reduce costs, but there are
some costs associated with using shared VPCs, such as the cost
of creating and managing connectors.
• Performance: Shared VPCs can impact the performance of
your VPC network. You need to make sure that you have the
appropriate network architecture in place to support your
performance needs.
Serverless VPC access
Serverless VPC Access is a service that allows you to connect
serverless workloads to your VPC network. This allows your
serverless workloads to access resources in your VPC network, such
as databases, storage, and other services.

---

## Sección 56: CHAPTER 6 [Entropy: 0.61]

Serverless VPC access is based on a resource called a connector. A
connector is a VPC-attached resource that routes traffic between
your serverless environment and your VPC network.
If your connector is located in the same project as its VPC network,
you can either create a connector using an existing subnet or create
a connector and a new subnet.

If your connector is located in a service project and uses a shared
VPC network, the connector and its associated VPC network are in
different projects. When a connector and its VPC network are in
different projects, a shared VPC network administrator must create
the connector's subnet in the shared VPC network before you can
create the connector, and you must create the connector using an
existing subnet.
To use serverless VPC access, you first need to create a connector.
You can create a connector using the Google Cloud Console, the
Cloud SDK, or Terraform.
To create a connector using the Google Cloud SDK, you can use the
following command:
gcloud compute networks vpc-access connectors create
CONNECTOR_NAME \
 --region REGION \
 --subnet SUBNET_NAME \
 --subnet-project HOST_PROJECT_ID \
 --min-instances MIN \
 --max-instances MAX \
 --machine-type MACHINE_TYPE
For example, to create a connector named my-connector in the uscentral1 region and connect it to the my-network network, you
would use the following command:
gcloud compute networks vpc-access connectors create myconnector \
 --region us-central1 \
 --subnet my_dev_subnet \
 --subnet-project apple-dev-project \
 --min-instances 10 \
 --max-instances 100 \
 --machine-type e2-standard-8
Once the connector is created, you can configure your serverless
workload to use it by setting the VPC_ACCESS_CONNECTOR
environment variable to the name of the connector.
For example, to configure a Cloud functions function named my-

function to use the my-connector connector, you would set the
VPC_ACCESS_CONNECTOR environment variable to my-connector
in the function's configuration.
Once the serverless workload is configured to use the connector, it
will be able to access resources in the VPC network.
Following is an example of a Cloud Functions configuration that
sets the VPC_ACCESS_CONNECTOR environment variable:
 1. {
 2. "name": "my-function",
 3. "runtime": "python39",
 4. "trigger": {
 5. "event": "providers/cloud.storage/eventTypes/object.change",
 6. "resource": "my-bucket"
 7. },
 8. "environmentVariables": {
 9. "VPC_ACCESS_CONNECTOR": "my-connector"
10. },
11. "source": "gs://my-bucket/my-function.py"
12. }
Once the function is deployed, it will be able to access resources in
the VPC network, such as the my-bucket bucket.
Serverless VPC Access has a number of benefits, as follows:
• Security: Serverless VPC access allows you to isolate your
serverless workloads from the public internet. This helps to
protect your workloads from attack.
• Performance: Serverless VPC access allows your serverless
workloads to access resources in your VPC network with high
performance.
• Compliance: Serverless VPC access can help you to comply
with industry regulations that require you to isolate your
workloads from the public internet.
Packet mirroring
Packet mirroring in Google Cloud captures and inspects network

traffic in your VPC. By mirroring certain traffic flows, you can
monitor network performance, ensure security compliance, and
detect anomalies within your traffic.
Packet mirroring can be used for a variety of purposes, as follows:
• Troubleshooting network problems: Packet mirroring can
be used to troubleshoot network problems by allowing you to
see all of the traffic that is flowing through a network
segment.
• Monitoring network performance: Packet mirroring can be
used to monitor network performance by allowing you to see
how much traffic is flowing through a network segment and
how long it is taking packets to travel through the network.
• Security monitoring: Packet mirroring can be used to
monitor network traffic for security threats, such as malware
and intrusions.
Packet mirroring is typically implemented using a switch or router.
The switch or router is configured to mirror all or a subset of the
traffic that is flowing through it. The mirrored traffic is then sent to
a monitoring device, such as a network analyzer or Security
Information And Event Management (SIEM) system.
Following are some examples of how packet mirroring can be used:
• A network administrator might use packet mirroring to
troubleshoot a network problem, such as a slow connection or
a dropped connection.
• A security analyst might use packet mirroring to monitor
network traffic for security threats, such as malware and
intrusions.
• A performance engineer might use packet mirroring to
monitor network performance and identify bottlenecks.
Packet mirroring is a powerful tool that can be used to improve the
performance, security, and reliability of networks.
IP addresses
IP addresses in Google Cloud are crucial for enabling resources to
communicate both internally and over the internet. Understanding
the fundamentals of IP addressing is foundational to efficiently
manage networking in Google Cloud.

IP addresses are numerical labels assigned to devices participating
in a computer network. They facilitate location and device
identification, enabling communication within and outside the
network.
There are two main types of IP addresses: IPv4 and IPv6. IPv4 is the
older version of the IP protocol and is still the most widely used.
IPv6 is the newer version of the IP protocol and is designed to
address the limitations of IPv4.
IPv4
IPv4 addresses are 32-bit numbers that are typically represented in
dotted-decimal notation. For example, 192.168.1.1 is a valid IPv4
address.
IPv4 addresses are divided into five classes, as follows:
• Class A: 0.0.0.0 - 127.255.255.255
• Class B: 128.0.0.0 - 191.255.255.255
• Class C: 192.0.0.0 - 223.255.255.255
• Class D: 224.0.0.0 - 239.255.255.255
• Class E: 240.0.0.0 - 255.255.255.255
Class A networks are used for large networks, such as the Internet.
Class B networks are used for medium-sized networks, such as
corporate networks. Class C networks are used for small networks,
such as home networks. Class D networks are used for multicast
traffic. Class E networks are reserved for experimental use.
IPv6
IPv6 addresses are 128-bit numbers that are typically represented in
hexadecimal notation. For example,
2001:0db8:85a3:0888:8a2e:0370:7334 is a valid IPv6 address.
IPv6 addresses are not divided into classes. Instead, they are divided
into scopes, as follows:
• Link-local scope: These addresses are used to communicate
with devices on the same local network.
• Site-local scope: These addresses are used to communicate
with devices on the same local network or on other networks
that are connected to the same site.

---

## Sección 57: CHAPTER 6 [Entropy: 0.569]

• Global scope: These addresses can be used to communicate
with devices on any network in the world.
Google Cloud offers both internal and external IP addresses, as
follows:
• Internal IP addresses: Used for communication within the
Google Cloud and are allocated from the project's VPC
network.
• External IP addresses: Can be static or ephemeral. Static IPs
are reserved for your project until you decide to release them,
while ephemeral IPs are provisioned temporarily and released
once the associated resource (e.g., VM instance) is stopped or
deleted.
• Static IPs: In GCP, you can reserve a static external IP
address, which will not change until you explicitly release it.
Following is an example of a public IP address range:
1.1.1.1 - 1.1.1.255
Following IP address range is an example of private ip range:
172.16.0.0 - 172.31.255.255
This IP address range is reserved for private networks. Devices on
this network will not be able to access the public Internet directly.
They will need to use a router or other network device to connect to
the public Internet.
Bring Your Own IP
With Bring Your Own IP (BYOIP), Google Cloud allows enterprises
to bring their public IP address ranges to Google's network
infrastructure across all regions. This is particularly useful for
applications that rely on IP reputation or have hard-coded IP
addresses.
Firewall
Google Cloud’s firewalls are highly configurable, providing a robust
and granular control mechanism for your cloud network. Firewalls
control the ingress and egress traffic to networked resources,
offering a layer of security for your applications and data. Firewalls
can be used to allow or deny specific types of traffic, such as HTTP,
TCP, or UDP traffic. They can also be used to specify the source and

destination IP addresses or IP address ranges for allowed or denied
traffic.
Firewalls can be applied at the network level or at the individual
resource level. Network-level firewalls apply to all traffic entering
or leaving a VPC network. Resource-level firewalls apply to specific
resources, such as VMs, instances, or load balancers.
Firewalls are an important part of a layered security approach for
GCP resources. They can help to protect your applications and data
from unauthorized access, malware, and other security threats.
Following are some examples of how firewalls can be used to
protect GCP resources:
• Allow 
only 
authorized 
traffic 
to 
access 
your
applications: You can use firewalls to allow only traffic from
specific IP addresses or IP address ranges to access your
applications. This can help to protect your applications from
unauthorized access.
• Prevent malware from spreading: You can use firewalls to
block traffic from known malware servers. This can help to
prevent malware from spreading to your GCP resources.
• Protect your data from being exfiltrated: You can use
firewalls to prevent data from being exfiltrated from your GCP
resources. For example, you can block traffic from known
attacker IP addresses or IP address ranges.
Firewalls are a powerful tool for protecting GCP resources. By using
firewalls effectively, you can help to keep your applications and
data safe. Some key features of firewall are as follows:
• Default firewall rules: Google Cloud provides a few default
firewall rules, including the ones that allow for outbound
traffic and another that allows SSH, RDP, and ICMP traffic.
• Priority system: Each firewall rule is assigned a priority,
where a lower number indicates higher priority. This system
ensures that if two rules conflict, the one with the higher
priority (lower numerical value) is applied.
• Stateful firewalls: Google Cloud's firewalls are stateful,
meaning they consider the state of a connection. If an
incoming packet is a valid response to a request sent from a
VM, the response is allowed, even if there's no firewall rule
that explicitly allows the response.

Following is an example:
Creating a firewall rule: To allow incoming HTTP traffic to VM
instances tagged with http-server, you can create a firewall rule
using the Google Cloud Console, gcloud command-line tool, or the
REST API.
Following is how you might use the gcloud command-line tool to
create this rule:
gcloud compute firewall-rules create allow-http \ --allow=tcp:80 \
--target-tags=http-server \ --description="Allow incoming HTTP
traffic  
This rule allows traffic over TCP on port 80 to any VM instance with
the http-server tag.
Best practices of firewalls on GCP
The following are some key best practices while using firewalls on
GCP:
• Principle of least privilege: Only allow necessary traffic.
Start with a default deny rule and then add rules for specific
traffic needs.
• Consistent naming convention: Use a consistent naming
pattern for firewall rules to simplify management.
• Regular monitoring and review: Check firewall rules
regularly. Google Cloud Monitoring and Logging can help in
keeping track of the traffic that is being allowed and denied.
• Layered security approach: Firewalls are just one part of a
layered security approach. You should also use other security
measures, such as intrusion detection systems (IDS) and
intrusion prevention systems (IPS).
• Keep your firewall rules up to date: As your applications
and infrastructure change, you should update your firewall
rules accordingly. This will help to ensure that your firewall
rules are still providing the necessary protection.
• Monitor your firewall logs: You should regularly monitor
your firewall logs for suspicious activity. This can help you to
identify and respond to security threats early.
By implementing and regularly updating firewall rules, you are
ensuring a foundational layer of security for your applications and

data in Google Cloud.
Routes
Routes define the paths that network traffic takes from a VM
instance to other destinations. These destinations could be within
your VPC network or outside it, like the internet or on-premises
locations.
Routes are created and managed in route tables. A route table is a
collection of routes that apply to a specific subnet or network
interface. When a VM instance wants to send traffic to a destination,
it first checks its route table to see if there is a route for that
destination. If there is a route, the VM instance sends the traffic
over the path specified in the route.
Routes can be static or dynamic. Static routes are manually
configured by the network administrator. Dynamic routes are
automatically generated by GCP routing services, such as Cloud
Router or Cloud Interconnect.
Following are some examples of how routes can be used:
• Route traffic to the internet: You can use a route to send
traffic from your VM instances to the internet. This allows
your VM instances to access websites and other online
resources.
• Route traffic to a VPC network: You can use a route to send
traffic from your VM instances to another VPC network. This
allows your VM instances to communicate with each other
and with resources in the other VPC network.
• Route traffic to an on-premises location: You can use a
route to send traffic from your VM instances to an on-premises
location. This allows your VM instances to communicate with
resources in your on-premises network.
• Types of routes: There are system-generated routes, which
Google Cloud automatically creates for you, and custom static
routes that you define.
Routes are an important part of any network architecture. By using
routes effectively, you can control the flow of traffic through your
network and improve the performance and security of your
applications.

---

## Sección 58: CHAPTER 6 [Entropy: 0.653]

Some key features of routes are as follows:
• System-generated routes: When you create a subnet in a VPC
network, Google Cloud automatically creates a corresponding
route. This route directs traffic from that subnet to any
address in the VPC network range.
• Custom static routes: You can define custom static routes to
direct packets that have destinations outside of your VPC
network. This is especially useful when working with VPNs,
Cloud Interconnect, or other on-premises connections.
• Priority: Each route has a priority assigned to it. In case of
overlapping routes, the one with the lowest priority value is
used.
• Next hop: Each route specifies a next hop, which is the next
destination for a packet. Next hops can be the default internet
gateways, VM instances, VPN tunnels, and more.
Following is an example:
Creating a Static Route Imagine you want to direct traffic from your
VPC to an on-premises network via a VPN tunnel.
Following is how you could set a static route using the gcloud
command-line tool:
gcloud compute routes create to-on-premises \ --destinationrange=192.168.0.0/16 \ --next-hop-vpn-tunnel=my-vpn-tunnel \
--next-hop-vpn-tunnel-region=us-central1 \ --priority=1000 \ --
description="Route to on-premises network via VPN" 
This route will direct traffic destined for the 192.168.0.0/16 range
through the my-vpn-tunnel in the us-central1 region.
Following are essential best practices in the context of routes:
• Avoid overlapping routes: Ensure that custom routes do not
overlap with system-generated routes to prevent unintended
traffic paths.
• Use descriptive names: When creating custom routes, use
meaningful names to make management easier.
• Use a hierarchical routing table structure: You can
organize your route tables into a hierarchy to make them
easier to manage. For example, you could have a separate
route table for each subnet or network interface.
• Use route policies: Route policies allow you to prioritize

routes and filter traffic based on criteria such as source IP
address, destination IP address, and protocol.
• Monitor your route tables: You should regularly monitor
your route tables to ensure that they are correct and up to
date. This can help you to identify and resolve routing
problems early.
Having a solid grasp of routes in Google Cloud ensures that you are
directing network traffic efficiently and securely, both within your
VPC and to external destinations.
The networking capabilities of GCP provide both flexibility and
robustness. By leveraging features such as custom IP addressing and
firewall configurations, you can tailor the Google Cloud networking
environment to meet specific requirements and ensure optimal
performance and security.
Network services
GCP offers a wide array of network services designed to enhance the
connectivity, performance, and reachability of applications.
Whether you're looking to distribute traffic, accelerate content, or
connect services, GCP has the tools to meet those needs. Let us take
a look at the primary network services offered by GCP:
Load balancer
Load balancing is a crucial component for ensuring that applications
are both resilient and performant. In the context of GCP, load
balancing is about distributing incoming application traffic
efficiently across multiple targets in various global locations, such
as virtual machine instances, containers, and more. This not only
boosts the application's availability but also optimizes its
performance. Let us delve deeper into its types and benefits:
Load balancing is important for a number of reasons, are as follows:
• Performance: Load balancing can improve the performance of
your applications by distributing traffic across multiple
servers. This means that each server has less load to handle,
which can result in faster response times and better overall
performance.
• Reliability: Load balancing can improve the reliability of your

applications by making them less susceptible to failure. If one
server fails, the other servers can continue to handle traffic.
This helps to ensure that your applications are always
available to your users.
• Scalability: Load balancing can make your applications more
scalable by allowing you to add more servers as needed to
handle increased traffic. This means that you can scale your
applications up or down to meet the needs of your users.
Cloud load balancing
Cloud load balancing is a load balancing service that is offered by
GCP. It provides a variety of load balancing features, as follows:
• Global load balancing: Cloud load balancing can distribute
traffic across multiple regions. This helps to improve the
performance and reliability of your applications.
• Network load balancing: Cloud load balancing can distribute
traffic across multiple instances of a managed instance group.
This makes your applications more scalable.
• Health checks: Cloud load balancing can perform health
checks on your servers to ensure that they are healthy and
available.
• Session affinity: Cloud load balancing can maintain session
affinity, which means that users are routed to the same server
for the duration of their session.
Types of load balancers on GCP are as follows:
• Application load balancer: An Application Load Balancer
(ALB) is a type of load balancer that distributes incoming
application traffic across multiple targets, such as web servers
or application servers. ALBs operate at the Layer 7
(application layer) of the Open Systems Interconnection
(OSI) model, which means that they can inspect and route
traffic based on the content of the HTTP or HTTPS requests.
ALBs are typically used to improve the performance,
scalability, and reliability of web applications. They can also
be used to improve the security of web applications by
distributing traffic across multiple targets and by filtering
out malicious requests, as follows:
○ HTTP(S) Load Balancers are the most common ALBs. It is a

global, fully-distributed load balancing solution that enables
users to deploy applications with global network reach. It is
designed for HTTP and HTTPS traffic. The following are its
key features:
■ Anycast IP addresses
■ Cross-region load balancing
■ Integration with Cloud CDN and Google's global
infrastructure
■ Health checks to ensure traffic only goes to healthy
instances
• Network load balancer: A Network Load Balancer (NLB) is
a type of load balancer that distributes incoming network
traffic across multiple targets, such as Compute Engine
instances or IP addresses. NLBs operate at the Layer 4
(transport layer) of the OSI model, which means that they can
route traffic based on the TCP or UDP port number. Following
are NLBs available in GCP:
○ TCP/SSL Proxy Load Balancer is a global load balancer
for non-HTTP/HTTPS traffic, providing layer 4 network
load balancing.
■ SSL offload, allowing backends to focus on the
application logic
■ Load balancing for raw TCP traffic
■ Support for client IP preservation for applications that
need it
○ TCP/UDP Load Balancer: This load balancer is used for
distributing internal TCP/UDP traffic among virtual
machines in the same region in a VPC network
■ Uses an internal IP address as the forwarding rule
address
■ Supports various backend types, including instance
groups
■ Useful for distributing traffic for databases, cache, and
more, inside a VPC
Following are the key benefits of using GCP load balancing:
• Highly reliable: Due to the distributed nature of GCP's
infrastructure, even if one or more backend instances fail, the

---

## Sección 59: CHAPTER 6 [Entropy: 0.536]

load balancer seamlessly reroutes traffic to healthy instances.
• Performance boost: By distributing incoming requests, it
ensures that no single instance is overwhelmed with traffic.
This optimizes latency and provides a better user experience.
• Scalability: As your traffic grows, GCP Load Balancers can
easily scale without any manual intervention. They also adjust
to traffic spikes and drops, ensuring optimal resource
utilization.
• Integrated security: With SSL/TLS termination at the load
balancer level, it offloads the compute-intensive work of
encrypting and decrypting traffic from the backend instances.
• Analytics and monitoring: Integration with Stackdriver
provides detailed metrics about your traffic, allowing for
improved insights and faster troubleshooting.
In the world of digital applications, ensuring high availability and
performance is paramount. GCP's load balancing services offer an
enterprise-grade solution to ensure applications can handle large
volumes of traffic while maintaining optimal performance.
DNS
Domain Name System (DNS) is the backbone of the internet,
translating easy-to-remember domain names like
www.example.com into IP addresses that machines understand.
Google Cloud's Cloud DNS is a scalable, reliable, and managed
authoritative DNS service running on the same infrastructure as
Google.
Some key features of DNS are as follows:
• Anycast 
name 
servers: 
Employing 
Google's 
globally
distributed system, Cloud DNS provides a consistent and lowlatency experience for users across the world.
• DNSSEC: Cloud DNS supports DNS Security Extensions
(DNSSEC), which helps guard against DNS spoofing and other
types of attacks aimed at DNS data authenticity.
• Integrated with GCP services: Seamlessly integrate Cloud
DNS with other GCP services like Load Balancers, Compute
Engine, and more.
• Programmatic management: With the RESTful API, users
can programmatically manage their DNS entries, ensuring

dynamic updates and flexibility.
• Private DNS zones: Provides DNS name resolution for VMs in
GCP VPC networks without exposing DNS data to the public
internet.
• Fully managed: Cloud DNS takes the complexities out of DNS
by providing managed services. No need to run your DNS
servers.
• High availability: Built on Google's reliable infrastructure,
Cloud DNS offers high availability and low latency across the
world.
• Scalability: Designed to handle millions of domains and a
vast 
number 
of 
queries. 
It 
automatically 
scales 
to
accommodate how your applications grow.
Working of Cloud DNS
When you use Cloud DNS, you create a managed zone. A managed
zone is a collection of DNS records for a domain. You can then add,
edit, and delete DNS records in the managed zone.
Cloud DNS uses a global network of DNS servers to resolve your
domain names. When a user tries to resolve one of your domain
names, their query is routed to the nearest DNS server. The DNS
server then resolves the domain name and returns the IP address to
the user.
Some use cases for Cloud DNS are as follows:
• Migrating to Google Cloud: If you are moving your
applications or websites to GCP, Cloud DNS makes it
straightforward to set up, update, and manage DNS records.
• Multi-regional deployment: For applications deployed across
multiple regions, Cloud DNS ensures users get routed to the
nearest global location.
• Hybrid Cloud: If you have a hybrid-cloud setup, Cloud DNS
allows for consistent DNS resolution across both GCP and non-
GCP environments.
In essence, Cloud DNS provides businesses with a secure, and
straightforward way to manage domain names in the digital space,
ensuring that users can always find their way to the applications
and sites they need.

Cloud CDN
Google Cloud CDN leverages globally distributed system points of
presence and Google's highly reliable and low-latency global
infrastructure, offering both content and application delivery
capabilities. It uses Google's globally distributed edge points of
presence to accelerate content delivery for websites and
applications served out of Google Cloud.
Working of Cloud CDN
Cloud CDN can significantly improves the performance and delivery
of your content to users worldwide. By caching your content at edge
locations closer to your users, Cloud CDN reduces latency, enhances
reliability, and provides a superior user experience. Cloud CDN
offers a number of features, as follows:
• Global network of edge servers: Cloud CDN has a global
network of edge servers that are located in over 200 countries
and territories. This means that your content is always close to
your users.
• Content caching: Cloud CDN caches content at edge
locations, so that it can be served to users quickly and
reliably.
• Load balancing: Cloud CDN can distribute traffic across
multiple edge locations to improve performance and
reliability.
• Security: Cloud CDN can help to protect your website or
application from attacks such as denial-of-service attacks.
• Cost savings: Cloud CDN can help to reduce the cost of
delivering your content to users.
You can use Cloud CDN in a variety of applications, following are
some popular examples:
• Static Content Delivery: Accelerate the delivery of static
assets like images, CSS, and JavaScript files for websites and
web applications.
• Media Streaming: Optimize the delivery of video and audio
content to users worldwide, reducing buffering and improving
playback quality.
• API Acceleration: Improve the performance of your APIs by

caching responses and reducing latency.
• Software Distribution: Deliver software updates and patches
efficiently to users globally.
• Gaming Content Delivery: Minimize latency for online
games by caching game assets and data closer to players.
• E-commerce: Enhance the user experience for online stores by
delivering product images, catalogs, and other content
quickly.
Real-Life Example: Serving a Website from GCS using Cloud
CDN
Let us understand its use case with a real-life example. Imagine
you've built a simple website with HTML, CSS, and JavaScript files.
You want to host this website using GCS and make it load quickly
for users around the world. Following are the steps:
1. Create a GCS bucket: Creates a public Cloud Storage bucket
to store your website content. Make it publicly accessible.
gsutil mb -acl public-read gs://my-cdn-bucket
2. Upload your website files: Upload your website file
(Exindex.html, CSS, JavaScript) and any images to the bucket.
gsutil mb -acl public-read gs://my-cdn-bucket
3. Reserve an external IP address: Now that your Cloud
Storage bucket is up and running, set up a global static
external IP address that your customers use to reach your load
balancer. This step is optional, but recommended, because a
static external IP address provides a single address to point
your domain at.
gcloud compute addresses create example-ip \
 --network-tier=PREMIUM \
 --ip-version=IPV4 \
 --global
4. (Optional) Create a backend bucket This step is optional. A
backend bucket acts as a wrapper for your Cloud Storage
bucket and allows you to enable Cloud CDN on it.
gcloud compute backend-buckets create my-cdn-backendbucket \

---

## Sección 60: CHAPTER 6 [Entropy: 0.581]

--gcs-bucket-name=my-website-bucket \
 --enable-cdn
gcloud compute url-maps create http-lb \
 --default-backend-bucket=cat-backend-bucket
This command creates a backend bucket named my-cdnbackend-bucket, sets its source to the Cloud Storage bucket
my-website-bucket, and enables Cloud CDN for that
backend.
5. Access your website: After creating the Cloud CDN
configuration or backend bucket (with Cloud CDN enabled), it
takes some time for the CDN to populate its edge caches with
your website files. You can access your website using the CDN
endpoint URL provided by the Google Cloud Console or the
command:
curl http://IP_ADDRESS/pics/cat-in-the-hat.jpg
Cloud NAT
Cloud NAT, Google Cloud's managed Network Address
Translation (NAT) service, allows instances without external IP
addresses to access the internet for necessary tasks such as software
updates. It operates in a way that doesn’t consume external IP
addresses yet provides internet connectivity in a controlled and
efficient manner.
Working of Cloud NAT
Cloud NAT works by translating the private IP addresses of your
resources to a public IP address when they send traffic to the
internet. When the response traffic is received, Cloud NAT translates
the public IP address back to the private IP address of the resource
that initiated the request.
Cloud NAT offers a number of features, as follows:
• NAT mapping: Dynamic assignment of private IPs to NAT
external IPs. This provides granular control over IP mapping
and allows users to dictate how IPs are allocated.
• NAT bypass: Cloud NAT provides a feature to exclude certain
IPs or subnets from NAT, ensuring direct access without NAT
translations.

• Session control: Admins can set the timeout for NAT sessions,
ensuring optimal use of available IPs.
• Logs and metrics: Cloud NAT integrates with Cloud
Monitoring and Cloud Logging, allowing you to keep an eye
on how NAT is performing and how it's being used.
• High availability: Built for reliability and spread across
multiple zones, Cloud NAT is designed to handle zone failures.
• Bandwidth 
and 
throughput: 
Cloud 
NAT 
scales
automatically, handling up to 40 Gbps of NAT traffic for VMs.
• No external IPs needed: Cloud NAT allows VM instances in a
VPC to initiate outbound connections to the internet using the
NAT gateway’s IP address, without requiring an external IP
address for each VM.
• Automatic or manual: You can either let Cloud NAT
automatically allocate NAT IP addresses, or you can manually
specify which addresses to use.
Some use cases for Cloud NAT are as follows:
• Controlled internet access: In scenarios where VMs need to
fetch updates or access external services but shouldn’t be
directly reachable from the internet, Cloud NAT acts as the
bridge.
• Kubernetes workloads: For GKE workloads that require
outbound internet access but should not be exposed to
incoming traffic from the internet.
• Reducing IP usage: In scenarios where there's a need to
reduce the consumption of public IPs, Cloud NAT provides a
way to provide internet access without allocating an external
IP for each VM.
Cloud NAT brings the utility of traditional NAT gateways into
Google Cloud, giving enterprises the ability to efficiently manage
their external connectivity needs.
Traffic director
Traffic director is a fully managed, scalable, and resilient traffic
control plane for service mesh data planes. It offers global load
balancing, intelligent traffic steering, and resiliency features for
modern microservices-based applications running on Google Cloud.

Traffic director interacts with proxy sidecars like Envoy to provide
advanced traffic management capabilities. With traffic director, you
can deploy and manage applications that span multiple Kubernetes
clusters in different regions, connected by a multi-regional service
mesh.
Some key features of traffic director are as follows:
• Global load balancing: It offers traffic distribution across
various backends based on load, latency, and availability.
Traffic is directed to the nearest healthy instance.
• Intelligent traffic steering: With application-aware health
checking and consistent hashing, traffic director ensures that
traffic is sent to the most suitable backend service.
• Configurable traffic control: Set up fine-grained traffic
policies for your services, like routing, traffic splitting, and
failover settings.
• Service topology awareness: Using the client's location and
the backend topology, it provides optimal traffic routing,
enhancing performance and user experience.
• Integrated with service mesh: Seamless integration with
service mesh implementations ensures unified traffic and
security policies across your infrastructure.
• Advanced traffic management: Traffic director supports
request-based routing, traffic splitting, retry, fault injection,
and other advanced features.
• Security: Integrated with security services on Google Cloud, it
ensures end-to-end traffic encryption and consistent security
policies.
Some use cases of traffic director are as follows:
• Multi-regional deployments: For applications that have
backends in multiple regions, Traffic Director offers a unified
way to manage and control inter-region traffic.
• Microservices architecture: With microservices spread across
various platforms and regions, traffic director ensures efficient
traffic management and service discovery.
• Disaster recovery: In cases of regional outages, Traffic
Director reroutes traffic to the nearest available region,
ensuring application availability.

• Application modernization: As enterprises transition from
monoliths to microservices, traffic director provides the traffic
control required for such modernized applications.
Traffic director, being a modern traffic control plane, equips
developers and operations teams with the tools they need to build
and maintain applications that are resilient, efficient, and globally
distributed.
Service directory
Service directory is a managed solution on Google Cloud that allows
operations teams to publish, discover, and connect services in a
consistent and standardized way. Designed for both traditional
applications and microservices, it provides real-time service
information across cloud and on-prem environments.
To register a service with service directory, you need to provide the
following information:
• Service name: The name of the service.
• Service type: The type of service.
• Service endpoints: The endpoints of the service.
• Service metadata: Optional metadata about the service.
Once you have registered a service with service directory, you can
discover and use the service in your applications.
Some key features for service directory are as follows:
• Unified service registry: Centrally register all your services,
irrespective of where they are hosted – on Google Cloud, other
clouds, or on-premises.
• Native integration with monitoring tools: Service directory
seamlessly integrates with Google Cloud operations suite,
ensuring effortless monitoring and logging.
• Custom annotations and metadata: Attach custom metadata
to your services, making it easier to filter and search for
specific services based on organizational needs.
• Role-Based Access Control (RBAC): Define permissions at a
granular level, ensuring only authorized personnel can access
or modify service details.
• Fully managed: With no infrastructure to manage and

---

## Sección 61: CHAPTER 6 [Entropy: 0.575]

automatic scaling, service directory reduces operational
overhead.
• Multi-cloud and on-prem support: Register and manage
services across different environments, providing a consistent
service discovery experience.
Some use-cases for service directory are as follows:
• Centralized service management: For enterprises with a mix
of cloud-native, on-premises, and hybrid applications, service
directory offers a centralized repository of all services.
• Service discovery in hybrid deployments: Easily discover
and connect services across multiple cloud environments and
on-premises data centers.
• Operational insight: With integrated monitoring and logging,
gain deep insights into service health, usage, and performance.
Private Service Connect
Private Service Connect provides a way to connect consumers and
producers in different VPCs securely. It abstracts the underlying
infrastructure, offering a way to connect services without exposing
them to the public internet, thus ensuring a higher level of security.
Working of a Private Service Connect
Private Service Connect uses a private network to connect your
services to your consumers. This private network can be a Google
Cloud VPN, a Cloud Interconnect connection, or a dedicated
connection.
To connect to a service using Private Service Connect, you need to
create a service attachment. A service attachment is a resource that
maps a private IP address to a service.
Once you have created a service attachment, you can connect to the
service using the private IP address that is specified in the service
attachment.
Some key features of Private Service Connect are as follows:
• Isolated connectivity: Connect services without the traffic
traversing the public internet, ensuring security and reducing
potential threats.
• Service endpoints: Create private endpoints in consumer

VPCs, which are used to access services in producer VPCs.
This abstracts the underlying infrastructure details.
• Integrated with Google Cloud marketplace: Easily find and
connect to services available in the Google Cloud marketplace,
streamlining the service integration process.
• Consistent access control: Implement consistent IAM policies
across your services, regardless of where they reside, ensuring
uniform access control.
• Traffic remains in Google's network: Traffic between the
service producer and consumer stays within Google's highspeed and highly reliable network, reducing latency and
enhancing performance.
• Endpoint metrics and monitoring: Integrated with Google
Cloud Monitoring, Private Service Connect provides vital
metrics about endpoint traffic, latency, and errors.
Following are some examples of how Private Service Connect can be
used:
• Secure data access: Organizations dealing with sensitive data
can use Private Service Connect to ensure their services access
data without exposure to the public internet.
• Multi-cloud workloads: Connect services across different
cloud providers securely and efficiently without resorting to
public internet-based communication.
• Hybrid connectivity: For businesses with a combination of
cloud and on-premises solutions, Private Service Connect
offers a way to bridge these environments securely.
Private Service Connect reinforces Google Cloud's commitment to
offering secure, efficient, and scalable solutions for businesses of all
sizes. It simplifies the networking landscape while maintaining high
standards of security.
Hybrid connectivity
Hybrid connectivity refers to the integration of on-premises
resources and cloud infrastructure. Google Cloud offers a suite of
tools to securely extend your private network into its cloud. This
ensures secure, high-speed, and reliable communication between
on-premises and cloud resources.

VPN
Virtual Private Network (VPN), is a secure way to connect two
networks over the public internet. It creates a tunnel between the
two networks that is encrypted, so that all traffic passing through
the tunnel is protected.
VPNs are often used to connect on-premises networks to cloud
networks. This allows users on the on-premises network to access
resources on the cloud network, and vice versa.
There are two main types of VPNs as follows:
• Site-to-site VPN: This type of VPN connects two networks,
such as an on-premises network and a cloud network.
• Remote access VPN: This type of VPN allows users to connect
to a network remotely, such as when they are working from
home.
Interconnect
Interconnect is a dedicated connection between your on-premises
network and Google Cloud. It provides a secure and highperformance way to connect your on-premises network to Google
Cloud resources.
There are three types of Interconnect as follows:
• Dedicated Interconnect: This type of Interconnect provides a
dedicated connection between your on-premises network and
Google Cloud.
• Partner Interconnect: This type of Interconnect provides a
connection between your on-premises network and Google
Cloud through a third-party service provider.
• Cloud Interconnect: This type of Interconnect provides a
connection between your on-premises network and Google
Cloud through a Google Cloud Point of Presence (POP).
Cloud Routers
Cloud Routers are a managed service that provides dynamic routing
for your cloud networks. They can be used to connect your cloud
networks to each other, to on-premises networks, and to the public
internet.

Cloud Routers support a variety of routing protocols, including
Border Gateway Protocol (BGP) and Open Shortest Path First
(OSPF).
Following are some examples of how hybrid connectivity can be
used:
• Connect an on-premises network to a cloud network using
a site-to-site VPN: This is a common way to connect an onpremises network to a cloud network. It is relatively easy to
set up and manage, and it provides a good level of security.
• Connect an on-premises network to a cloud network using
Dedicated 
Interconnect: This 
is 
a 
good 
option 
for
organizations that need a high-performance and secure
connection between their on-premises network and Google
Cloud.
• Connect a cloud network to another cloud network using
Cloud Routers: This is a good option for organizations that
need to connect multiple cloud networks together. Cloud
Routers provide dynamic routing, which allows traffic to flow
between the cloud networks in the most efficient way possible.
Network security
Network security is the practice of protecting computer networks
from unauthorized access, use, disclosure, disruption, modification,
or destruction. It is a critical part of any organization's IT
infrastructure, and it is becoming increasingly important as more
and more businesses move to the cloud.
There are a number of different network security technologies
available, including firewalls, IDS, and IPS. These technologies can
be used to protect networks from a wide range of threats, including
malware, denial-of-service attacks, and man-in-the-middle attacks.
Cloud Armor
Cloud Armor is a Web Application Firewall (WAF) that protects
web applications from a variety of attacks, including DDoS attacks,
SQL injection attacks, and cross-site scripting attacks. It is a
managed service that is easy to set up and use.
Cloud Armor can be used to protect web applications that are

---

## Sección 62: CHAPTER 6 [Entropy: 0.515]

hosted on GCP, as well as web applications that are hosted on other
cloud providers or on-premises.
Some key features of Cloud Armor are as follows:
• DDoS protection: Cloud Armor defends against the most
common, high-bandwidth, short-duration attacks.
• IP allowlist/blocklist: You can control access to your services
by creating IP-based allowlists and blocklists.
• Web Application Firewall: Offers protection against web
vulnerabilities like SQL injection, cross-site scripting, and
more.
Some use cases of Cloud Armor are as follows:
• Secure public facing applications: Protect web applications
exposed to the internet against targeted and distributed
threats.
• Geofencing: Restrict or allow application access based on
geographic regions using IP allowlists/blocklists.
Cloud IDS
Cloud IDS is an intrusion detection system that monitors network
traffic for suspicious activity. It can be used to detect a variety of
attacks, including malware, denial-of-service attacks, and man-inthe-middle attacks.
Cloud IDS is a managed service that is easy to set up and use. It can
be used to protect networks that are hosted on GCP, as well as
networks that are hosted on other cloud providers or on-premises.
Some key features of Cloud IDS are as follows:
• Deep packet inspection: Monitors network traffic for
suspicious activity by inspecting data packets in-depth.
• Anomaly detection: Identifies unusual patterns which may
indicate malicious activity.
• Integration with security command center: Incidents
detected by Cloud IDS can be viewed and managed within the
Security Command Center.
Some use cases for Cloud IDS are as follows:
• Network monitoring: Continuously monitor inter-VM traffic

for signs of malware, spyware, or other malicious activities.
• Compliance: Helps businesses remain compliant with industry
standards that require intrusion detection capabilities.
Cloud Firewall
Cloud Firewall is a managed firewall service that provides network
security for your GCP resources. It allows you to define and manage
firewall rules to control incoming and outgoing traffic.
Cloud Firewall is easy to set up and use. It supports a variety of
firewall rules, including port-based rules, IP-based rules, and
protocol-based rules.
Some use cases for Cloud Firewall are as follows:
• Directional control: Specify ingress (incoming) or egress
(outgoing) traffic rules.
• Protocol and port specifications: Define rules based on
specific IP protocols and ports.
• Priority-based evaluation: Rules with a lower priority
number are evaluated before rules with higher priority
numbers.
Some use cases for Cloud Firewall are as follows:
• Environment segmentation: Isolate production environments
from development or staging environments to prevent
unintended access.
• Dynamic access control: Adapt firewall rules based on
evolving requirements without causing service disruptions.
Following is when to use each service:
• Cloud Armor: Cloud Armor is a good choice for protecting
web applications from attacks such as DDoS attacks, SQL
injection attacks, and cross-site scripting attacks.
• Cloud IDS: Cloud IDS is a good choice for detecting attacks
such as malware, denial-of-service attacks, and man-in-themiddle attacks.
• Cloud Firewall: Cloud Firewall is a good choice for
controlling incoming and outgoing traffic to your GCP
resources.
You can use two or more of these services together to provide a

layered security approach. For example, you could use Cloud Armor
to protect your web applications from attacks and Cloud Firewall to
control incoming and outgoing traffic to your GCP resources.
Multiple choice questions
1. Which GCP service is specifically designed to provide
DDoS defense?
a. Cloud IDS
b. Cloud Armor
c. Cloud Firewall
d. Cloud VPN
2. What is the primary function of Cloud IDS in Google
Cloud?
a. Load Balancing
b. Virtual Private Networking
c. Intrusion Detection
d. Content Delivery
3. Which of the following is NOT a feature of Cloud Armor?
a. DDoS Protection
b. IP Allowlist/Blocklist
c. VPN Tunneling
d. Web Application Firewall
4. In Google Cloud Firewall rules, which rules are evaluated
first?
a. Rules with higher priority numbers
b. Rules with lower priority numbers
c. Ingress rules

d. Egress rules
5. Which service offers deep packet inspection to monitor
network traffic for suspicious activity?
a. Cloud NAT
b. Cloud DNS
c. Cloud Armor
d. Cloud IDS
6. Which service in GCP enables you to define IP-based
allowlists and blocklists?
a. Cloud VPN
b. Cloud Firewall
c. Cloud Armor
d. Traffic Director
7. Cloud DNS in GCP is primarily used for:
a. Denying or allowing specific IP addresses
b. Translating domain names into IP addresses
c. Detecting intrusions and malicious activities
d. Load balancing the traffic
8. Which GCP service is designed for threat detection for
traffic moving between virtual machines?
a. Cloud Armor
b. Cloud CDN
c. Cloud IDS
d. Traffic Director
9. Which of the following is a service that allows you to
connect to private services running in Google Cloud

Platform without having to expose them to the public
internet?
a. Cloud Armor
b. Cloud IDS
c. Cloud Firewall
d. Private Service Connect
10. Which of the following is a dedicated connection between
your on-premises network and Google Cloud?
a. VPN
b. Interconnect
c. Cloud Router
d. All of the above
Case studies
1. A financial services company has a hybrid environment, with
some of its applications hosted on GCP and some of its
applications hosted on-premises. The company needs a way
to connect its on-premises network to its GCP network
securely. The company also needs to ensure that its
compliance requirements are met.
2. A gaming company has a microservices architecture. The
company's game is very popular, and it experiences high
levels of traffic. The company needs a way to load balance
traffic across its microservices to ensure that the game
remains performant and reliable.
3. MediaHouse, a global media company, experienced frequent
outages and network inconsistencies, especially when they
streamed live events. Their traditional DNS setup was
proving inadequate to manage global traffic and provide
seamless experiences.
4. An e-commerce company, has recently expanded its
operations to Europe and Asia. They are now facing

---

## Sección 63: CHAPTER 6 [Entropy: 0.268]

challenges in delivering consistent low-latency responses to
users across all regions. Additionally, there's a significant
increase in traffic during sale events which affects site
performance.
Answer key
1. b. Cloud Armor
2. c. Intrusion Detection
3. c. VPN Tunneling
4. b. Rules with lower priority numbers
5. d. Cloud IDS
6. c. Cloud Armor
7. b. Translating domain names into IP addresses
8. c. Cloud IDS
9. d. Private Service Connect.
10. b. Interconnect
Case studies
1. The company can utilize a Cloud VPN to connect its onpremises network to its GCP network. A Cloud VPN is a
secure tunnel over the public internet that allows traffic to
flow between an on-premises network and a GCP network.
The company can also implement Cloud IAM to control access
to its GCP resources. IAM allows the company to grant users
and applications the permissions they need to access GCP
resources while also protecting resources from unauthorized
access.
2. The company can utilize Cloud Load Balancing to load
balance traffic across its microservices. Cloud Load Balancing
is a service that distributes traffic across multiple instances of
your application.
3. MediaHouse can utilize Google Cloud's Cloud DNS. With its
scalable, reliable, and managed authoritative DNS service,
they could handle and log millions of QPS to their domains.
They can also use Cloud NAT to ensure their internal

resources could securely access the internet for updates and
patches without exposing them to the public internet, further
strengthening their security posture.
4. To handle the traffic from multiple geographical regions
effectively, they can implement Google Cloud's HTTP(S) Load
Balancer. It enabled global load balancing, which routes users
to the nearest global location. During peak traffic times, the
Cloud CDN was integrated, which uses Google’s globally
distributed system to cache content closer to the users.
Additionally, to safeguard against DDoS attacks, especially
during high traffic sale events, company can use Cloud
Armor, which provided defense mechanisms to maintain site
reliability.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 64: CHAPTER 7 [Entropy: 0.46]

Identity and Access
Management
Introduction
Identity and Access Management (IAM) is a critical framework
for managing digital identities and permissions in Google Cloud
Platform (GCP). It allows organizations to control access to cloud
resources by granting the right individuals the appropriate
permissions at the right time, ensuring actions align with business
objectives and security policies. IAM is more than just a tool for
access management; it's a comprehensive solution that helps
businesses enhance security by enforcing the principle of least
privilege, improve compliance by providing detailed audit trails,
increase operational efficiency by automating access control, and
even support new business initiatives by enabling secure
collaboration.
IAM policies in GCP are expressed in a Role-Based Access Control
(RBAC) model, in which permissions are grouped into roles, and
roles are assigned to identities. This streamlines the permissions
process, making it easier to manage and understand. IAM also offers
advanced features such as conditional role-based access,
organization policies, and workload identity federation, which we
will explore later in this chapter.
IAM enables you to segregate duties within your team, ensure the

least privilege access, and monitor and audit activities across your
GCP environment. Through this robust set of capabilities, IAM
empowers administrators to maintain a secure and compliant cloud
infrastructure while enabling developers and data scientists to
access the resources they need efficiently.
Structure
Following is the structure of the chapter:
• Introduction to Identity and Access Management
• Service accounts and authentication
• Organization policies
• Best practices of GCP
Objectives
By the end of this chapter, readers will have an in-depth
understanding of GCP's IAM services. By the end of this chapter,
readers should be equipped with the knowledge and skills to
manage and control access within their GCP environment
effectively.
Introduction to Identity and Access Management
IAM service helps you manage and control access to your resources.
IAM allows you to specify who (identity) has what access (role) to
which resources. It enables administrators to allocate and limit
access in a very modular and secure way, ensuring that only
authorized individuals can interact with your cloud resources.
IAM is a core component of GCP. IAM allows you to control access
to all GCP resources, including Compute Engine instances, Cloud
Storage buckets, and BigQuery datasets.
Core components
IAM in GCP revolves around three core components, as follows:
• Identity: An identity can be a Google account for individuals,
a service account for applications, or even a Google Group
that includes multiple users. For example, a DevOps engineer
in your organization could have a Google account as an

identity used for logging into GCP services.
• Role: A role is a named set of permissions that dictates what
actions can be taken on which resources. For instance, a role
like roles/storage.admin would allow its possessor to
perform administrative tasks in a Google Cloud Storage
(GCS) bucket.
• Resource: Resources are what you're trying to control access
to. These can be Virtual Machines (VMs), databases, storage
buckets, and more. For example, you may have a storage
bucket that contains sensitive customer data.
Importance of IAM
IAM is critical for several reasons, which are as follows:
• Security: One of the foremost concerns in any cloud
deployment, security is substantially improved when you can
tightly control who has access to what. For example, limiting
the number of people who can access a database containing
sensitive information ensures that risk is minimized.
• Least privilege: IAM ensures that users have just the
permissions they need to do their jobs and no more. This
minimizes 
the 
potential 
damage 
from 
accidental
misconfigurations or intentional malfeasance. For instance, a
data analyst may only need read access to a data bucket, not
permission to delete items.
• Compliance: Many industries have stringent regulations
requiring controlled access to certain types of data. By
utilizing IAM policies, you can simplify the process of meeting
these regulatory standards.
• Operational 
efficiency: 
By 
providing 
developers 
and
administrators with appropriate permissions, you streamline
operational processes. People can do their jobs without being
bogged down by unnecessary permission requests while still
maintaining a high level of security.
By understanding and implementing IAM effectively, you make your
GCP environment robust, flexible, and secure. This caters to the
needs of a diverse set of stakeholders—from system administrators
and developers to end-users—each with its own specific set of
permissions and responsibilities.

Roles and permissions
Understanding roles and permissions is essential for effectively
managing access control within GCP. GCP’s IAM offers three types
of roles: Primitive roles, predefined roles, and custom roles. Let us
explore each of these in detail in the section.
Primitive roles
Primitive roles are the broadest types of roles that apply across all
resources in a GCP project. These roles are legacy access control
roles that existed prior to the introduction of more granular IAM
roles like predefined and custom roles.
There are three types of primitive roles, as follows:
• Owner: They have complete control over resources within a
given scope (organization, folder, or project); they can also
add other owners, editors, and viewers.
Example: An application lead who is overseeing a GCP
project would typically be assigned as an owner.
• Editor: They can create, delete, and modify resources but lack
the power to manage roles and permissions.
Example: Developers often have Editor roles to facilitate
building and deploying services.
• Viewer: They have a read-only access to resources, suitable
for stakeholders who need to review but not modify resources.
Example: Business analysts, who are interested in data but
don't need to modify settings or resources, can be given
Viewer access.
Predefined roles
Predefined roles are a collection of permissions that are designed to
support common use cases and workflows within various GCP
services. These roles are more granular than the primitive roles and
provide a more secure alternative for managing access to GCP
resources.
Each predefined role is composed of a set of permissions that allow
users to perform a specific set of operations. The roles are scoped to
specific GCP services like Compute Engine, Cloud Storage,

---

## Sección 65: CHAPTER 7 [Entropy: 0.475]

BigQuery, etc. and are managed by Google.
Following are some characteristics of predefined roles:
• Service-specific: Predefined roles are tailored to specific GCP
services and provide permissions that are necessary to perform
common tasks within those services.
• Least privilege: These roles are intended to follow the
principle of least privilege, granting only the permissions that
are necessary to perform specific tasks.
• Ready to use: They are created and maintained by Google,
ensuring that they are up-to-date with the service's capabilities
and permissions.
• Immutable: Predefined roles cannot be modified. They are
managed by Google, and while the set of permissions in a role
can be updated by Google as services evolve, users cannot
alter the permissions included in a predefined role.
Examples of Predefined Roles are as follows:
• roles/compute.viewer: Grants read-only access to Compute
Engine resources.
• roles/storage.objectAdmin: Grants full control over objects
in GCS, allowing for creating, viewing, and deleting objects.
• roles/bigquery.dataEditor: Grants permissions to manage
data in BigQuery datasets, including loading, deleting, and
updating data.
• roles/logging.viewer: Grants access to view logs in Cloud
Logging.
Using predefined roles enables administrators to assign users and
service accounts the minimum required access needed to perform
their functions, which enhances the security posture of their GCP
environment.
Use case
For example, a database administrator might only need access to
SQL instances and not to the entire Compute Engine. A predefined
role like roles/cloudsql.admin would be appropriate in this case.
Custom roles
Custom roles in GCP are user-defined IAM roles that allow cloud

administrators to create roles with a unique set of permissions.
Unlike predefined roles, which are managed by Google and
designed to support common use cases with a fixed set of
permissions, custom roles give administrators the flexibility to tailor
IAM roles to the specific needs of their organization.
Following are some more details about custom roles:
• Fine-grained access control: Custom roles offer precise
control over the permissions included in a role, which helps in
implementing the principle of least privilege effectively.
• Specific to organization’s needs: Administrators can define
custom roles that are specifically tailored to the unique
operational needs of their organization or project.
• Editable: Once created, custom roles can be modified to add
or remove permissions as the needs of the organization
change.
• Project or Organization scope: Custom roles can be created
at the project level or the organization level, providing
flexibility in how access is managed across resources. Note
that custom roles cannot be applied at the folder level.
Creating custom roles involves the following steps:
1. Selecting permissions: Identifying and selecting from the list
of available permissions those that are necessary for the role
to serve its intended purpose.
2. Creating the role: Giving the role a name, title, and
description and associating the selected permissions with it.
3. Testing the role: Before assigning the custom role to users or
service accounts, it is important to test it to ensure that it
grants the intended access without exposing any excess
permissions.
4. Assigning the role: Associating the custom role with users,
groups, or service accounts to grant them the defined set of
permissions.
5. Managing the role: Keeping track of the custom roles,
updating them as necessary, and auditing their usage to
ensure they continue to meet the organization’s needs.
Custom roles can be created at the organization, or project level and

can be used for specialized use-cases such as limited access to
sensitive datasets for auditing purposes.
By leveraging these roles judiciously, you can achieve fine-grained
control over your GCP environment, ensuring both operational
efficiency and security compliance.
Identity and Access Management policies
IAM policies are the backbone of access control in GCP. They define
who (identity) has what access (roles) to which resources. A policy
is attached to a resource and is used to establish permissions.
Policy inheritance
In GCP, policies are inherited hierarchically from the organization
level down to individual resources. This means that a policy set at
the organization level will be inherited by all the folders, projects,
and resources under it.
Example: Organization-wide policy - If you assign the Viewer role
to a user at the organization level, the user inherits read-only access
to all resources in all projects and folders within the organization.
Best practice: While it may be convenient to set broad policies at
the organization or folder level, it is generally best to apply the
principle of least privilege. This means giving users only the
permissions they need to perform their job and no more.
Policy evaluation
When a user makes a request to access a resource, GCP evaluates
the policies associated with that resource, from the organization
level down to the specific resource. All permissions are collected,
and the final decision is based on the evaluation of these
permissions.
Evaluation algorithm
GCP uses a deny by default algorithm. This means that unless a
policy explicitly allows a particular action, it is denied, as follows:
• Explicit deny: An explicit deny in any policy will deny the
access regardless of other policies.
• Explicit allow: Grants the permissions listed, subject to any

explicit deny.
Example for policy evaluation: Let us say a user has a Viewer role
at the organization level but an Editor role at the project level for a
specific project. If they try to modify a resource in that specific
project, the Editor role will be considered, and they will be able to
make the modification, despite having only Viewer permissions at
the organization level.
By understanding policy inheritance and policy evaluation, you can
create a robust and secure IAM policy strategy that effectively
governs access control across your GCP resources.
Let us consider a real-world use case to better understand the
practical implications of IAM policies. Consider the following
scenario of a multi-department organization:
An organization has three main departments: engineering, finance,
and human resources. Each department has its own set of projects
and resources within the GCP organization.
The requirement is to allow members of each department to have
access only to their department's projects and resources, with a few
exceptions for cross-department collaboration.
Additionally, Chief technological officer/Chief data officer
(CTO/CDO) also wants to deny access to any resources in the GCP
organization from IP addresses outside of the country where the
organization operates, say the United States, in addition to the
previous access controls per department.
IAM policy implementation
IAM empowers you to set granular access policies at various levels,
from the overarching organization to individual resources. Let us
delve deeper into how IAM works and how you can leverage it to
create a secure and efficient GCP environment, as follows:
• Organization level: At this level, an organization policy is set
to deny all requests originating from IP addresses outside of
the United States. This is a security measure to ensure that the
entire GCP resource tree is inaccessible from undesired
geographical locations.
By adding an organization-level policy, we introduce a
broad, sweeping rule that provides an extra layer of security.

---

## Sección 66: CHAPTER 7 [Entropy: 0.569]

This is particularly useful for global organizations that want
to limit.
• Folder level: Create folders for each department (engineering,
finance, HR) and set IAM policies here. For example, grant
members of the Engineering department the Editor role on the
Engineering folder, and similarly for Finance and HR.
• Project level: Within each folder, you will have various
projects. You can keep the inherited roles from the folder or
define project-specific roles. For instance, within the
Engineering folder, you might have a DevOps project where
you only want to give specific DevOps personnel the Owner
role.
• Resource level: Within projects, you can specify even more
granular permissions. For example, you might allow only
database administrators the Database Admin role on a
specific Cloud SQL instance within a project in the
Engineering folder.
• Cross-department collaboration: For exceptions where you
need cross-department collaboration, you can add specific
roles at the project or resource level without affecting the
inherited roles. For example, if a few HR personnel need readonly access to a Finance project, you can grant them the
Viewer role specifically for that project.
Following is how policy inheritance works:
• The organization-level policy will act as the first line of
defense. Even if a user has been assigned roles at the folder,
project, or resource level, if the request originates from an IP
outside the U.S., it will be denied.
• A finance user trying to access an Engineering resource would
be denied access, as their permissions are restricted to the
Finance folder and its contents.
• An engineering user with a "Viewer" role on a Finance project
could view specific finance resources but not edit them,
thanks to the "Viewer" role granted at the project level,
overriding the lack of access at the folder and organization
level.
Service accounts and authentication
Service accounts are a foundational element in GCP for securing and

identifying service-to-service interactions. They act as identities for
automated processes and applications running on your GCP
resources. Here is a more in-depth look:
Introducing service accounts
In a cloud ecosystem, different services often interact with each
other to complete various tasks. These services may need to read
data from a database, write to a file in cloud storage, or execute a
specific API call. Service accounts act as the identity for these
services, giving them permission to perform specific actions on
other GCP resources.
Two main types of service accounts in GCP are as follows:
• Built-in service accounts: Automatically created by GCP,
these accounts are minimalistic and are often pre-configured
with permissions needed for specific Google services.
• User-created service accounts: Created and managed by
users, these service accounts provide more flexibility and
control, allowing for custom permissions and roles.
Following is why service accounts are important part of your
identity management in GCP:
• Security: Service accounts enable a secure way of service-toservice communication, allowing only authorized services to
access specific resources.
• Role-Based Access Control: Service accounts can be assigned
custom roles, enabling fine-grained permissions for services.
• Traceability: Audit logs can trace actions back to specific
service accounts, improving accountability and security.
Example: For example, you have an application that needs to
upload files to a GCS bucket. You would typically go through the
following steps:
1. Create a service account: In GCP Console, go to IAM &
Admin, then create a new service account.
2. Assign roles: Assign the role roles/storage.objectCreator to
allow the service account to create objects in GCS.
3. Download credentials: Download the JSON key file for the
service account.

4. Configure application: Update your application to use the
downloaded JSON key file for authentication.
5. Test: Finally, test the application to ensure it can successfully
upload files to the GCS bucket using the service account.
Python code snippet:
python
from google.cloud 
import storage 
def upload_to_bucket(bucket_name, file_name): 
 storage_client = storage.Client.from_service_account_json('path/
to/service-account-key.json') bucket =
storage_client.get_bucket(bucket_name) blob =
bucket.blob(file_name) blob.upload_from_filename(file_name)
upload_to_bucket('my_bucket', 'file.txt') 
In this example, the application uses the service account's
credentials from the JSON key file to authenticate and upload a file
to the specified GCS bucket.
Organization policies
In the Google Cloud hierarchy, Organization Policies are crucial for
enforcing organization-wide settings that impact multiple resources
and services across GCP. These policies enable centralized
governance, allowing administrators to set guidelines that apply
uniformly, irrespective of the individual services or resources being
used.
Organization policies provide several critical features to ensure
governance and operational efficiency within GCP as follows:
• Consistency: Policies ensure that configurations are consistent
across different resources, eliminating the complexity that
arises from ad hoc settings.
• Auditability: These policies make it easier to trace back
actions and changes, thus improving your organization's audit
posture.
• Resource optimization: By enforcing certain resource
constraints and automating configurations, organization
policies can also contribute to cost optimization.

Organization policies in GCP play a pivotal role across various
aspects of cloud management: Following are some common
scenarios where these policies are particularly beneficial:
• Security: You can enforce specific encryption methods or data
residency requirements for compliance or risk management.
• Compliance: Set policies that ensure your organization
adheres to industry-specific regulations like GDPR or HIPAA.
• Cost management: Limit the types of resources that can be
provisioned to avoid unexpected costs, such as disallowing the
usage of high-CPU virtual machines for non-critical tasks.
Example: Let us consider a use case where an organization wants to
enforce that all its Cloud Storage buckets must only reside in the EU
region for compliance with GDPR. An organizational policy can be
created for this that denies the creation of buckets in any other
region.
1. json
2. { "constraints/storageLocation": { "listPolicy": { "allowedValues": [
"europe-west1", "europe-west2", "europe-west3" ], "allValues": "DENY" }
} } 
By deploying this policy at the organization level, you assure that
any newly created storage bucket complies with your data residency
requirements, thus simplifying compliance management.
Workload Identity Federation
Workload Identity Federation (WIF) is a security feature that
allows external identities, such as those in AWS, Microsoft Azure, or
any identity provider that supports OpenID Connect, to act as a
Google Cloud identity. With this feature, you can grant access to
Google Cloud resources to non-Google Cloud identities without the
need for a service account key.
WIF enables you to authenticate and authorize cloud services
without the need for service account keys. By using this approach,
you improve your security posture, reduce the administrative
burden, and enable better auditability.
Following are some main features of WIF:
• Reduced security risks: Eliminates the need for long-lived
service account keys, which are a common attack vector.

---

## Sección 67: CHAPTER 7 [Entropy: 0.795]

• Simplified management: Centralizes identity management
for on-premises, hybrid, and multi-cloud environments.
• Cross-cloud compatibility: Seamless integration with other
cloud providers like AWS and Azure.
• Audit and monitoring: Allows for tracking of which external
identities are accessing your Google Cloud resources.
• Flexibility: Allows you to use external identity providers,
such as AWS Cognito or Azure AD, to authenticate workloads.
WIF serves as a key component in managing complex infrastructure.
Following are several use cases where this feature proves to be
exceptionally useful:
• Multi-cloud: If your organization leverages multiple cloud
providers, you can unify authentication mechanisms through
Workload Identity Federation.
• Hybrid 
(On-premise) 
integration: 
For 
enterprises
maintaining on-premise data centers, Workload Identity
Federation eases the transition to the cloud by allowing the
reuse of existing identity solutions.
• Compliance and auditing: Enhanced audit trails are easier to
establish, making it more straightforward to comply with
industry regulations.
For instance, imagine you have a workload running in AWS lambda
functions that need to access a GCS bucket. You can set up WIF to
enable AWS Lambda functions to directly interact with Google
Cloud services without needing to manage service account keys. The
Lambda function assumes an AWS role that is mapped to a GCP
service account via WIF. Thus, the function inherits permissions
from the GCP service account and can make authorized API calls.
Following is how you can configure WIF:
• Set up an identity provider in AWS.
• Configure a Google Cloud identity pool to trust the AWS
identity provider.
• Create a Google service account and grant it permissions to
the GCS bucket.
• Finally, use the AWS identity to impersonate the Google
service account.
Following are the steps for a simplified configuration:

1. Create a workload identity pool in GCP:
gcloud iam workload-identity-pools create aws-pool --
location=global --description="AWS identity pool" 
2. Create a provider within that pool for AWS:
gcloud iam workload-identity-pools providers create-aws
aws-provider 
--location=global 
--accountid=AWS_ACCOUNT_ID --workload-identity-pool=aws-pool 
3. Map AWS role to GCP service account:
gcloud iam workload-identity-pools add-attribute-condition
--pool-name=aws-pool --attribute='["attribute.aws_role"]'
--attribute-value='["arn:aws:iam::AWS_ACCOUNT_ID:role/
AWS_ROLE_NAME"]' 
--condition-title="Map
AWS_ROLE_NAME to GCP Service Account" 
By following these steps, your AWS Lambda function will have the
necessary permissions to interact with GCP services, and you will
not have to worry about managing and securing long-lived
credentials.
Labels and tags
Labels and tags are metadata attributes that you can attach to GCP
resources. These attributes are essentially key-value pairs that serve
multiple purposes, from organizing resources to automating tasks
and facilitating cost allocation. Labels and tags serve as critical tools
for organization and management.
Following is how they can enhance your cloud resource
management:
• Resource organization: Labels and tags help in categorizing
resources based on project, team, or environment (e.g., dev,
test, prod).
• Cost allocation: You can filter resources by labels in your
billing report, allowing you to break down costs by
department, project, or any other criteria.
• Policy enforcement: Use labels to enforce organization
policies 
such 
as 
security 
settings 
or 
data 
residency
requirements.
• Automated 
operations: 
They 
can 
trigger 
automated
workflows or scripts based on conditions that you specify.

Applying labels and tags within GCP not only streamline resource
management but also brings tangible benefits across various
operational aspects.
Following are key scenarios where labels and tags prove to be
indispensable:
• Cost management: If you are running multiple services for
different departments, using labels like department=finance
or department=marketing will help in cost allocation.
• Security and compliance: Attach labels to resources that are
subject 
to 
specific 
compliance 
requirements, 
like
compliance=GDPR or security-level=high, to easily identify
and manage them.
• Environment management: Labels such as env=production
or env=staging can help you easily sort and manage resources
by environment.
Following is how to add a label to a Google Compute Engine
instance:
gcloud compute instances add-labels example-instance --
labels=env=dev,team=analytics 
After adding labels, you can easily filter your instances on the
Google Cloud Console, or use the labels to set up more complex
automation and policies. For instance, you could set up a Cloud
Function that listens for the creation of new VM instances and
automatically takes an action based on the env or team labels.
Now, with these labels in place, you can generate cost reports
broken down by environment or team, or even apply specific IAM
policies based on these labels.
Best practices of GCP
To ensure a secure and efficient environment within GCP, it is
crucial to follow IAM best practices.
Following are some strategies to strengthen your security posture
and optimize management:
• Temporary access: Grant temporary access for users who
need to perform specific tasks, and make sure to revoke this
access as soon as the task is complete.

• Enforce two-factor authentication: Enforce two-factor
authentication (2FA) at the organization level to add an
additional layer of security.
• Monitor and audit: Keep an eye on federated identities and
their access patterns. Use Cloud Audit Logs for this.
• Automation: Leverage automation tools to manage and
update labels and tags, ensuring they are consistently applied
across resources.
• Documentation: Maintain comprehensive documentation of
IAM roles, permissions, and policies. Make sure to update this
whenever there are changes.
• Training and awareness: Educate team members about the
importance of IAM policies and how to interact with them
properly to ensure ongoing compliance and security.
• Incident response plan: Have a plan in place for how to
respond if there is an indication of compromised credentials or
policy violations. This should include how to revoke access
and assess the impact.
Conclusion
In this chapter, we explored Identity and Access Management (IAM)
on GCP. We learned about the key parts of IAM: identities, roles,
and resources. These are the basic building blocks for controlling
access in GCP. You also learned about the different types of roles
and how to choose the right ones for your needs.
Further, we explored IAM policies, their inheritance model, and the
evaluation process that determines whether a request gets the green
light or the red light. We even peeked under the hood of some
advanced features, like organization policies and Workload Identity
Federation, which can be real lifesavers in complex, multi-cloud
environments.
By adopting IAM best practices, things like least privilege,
temporary access, and vigilant monitoring you will be well on your
way to fortifying your GCP environment. Remember, IAM is not just
about restrictions; it's about empowering your teams to work
productively while keeping your cloud assets locked down.
In the next chapter, we will shift our focus to the critical domain of

---

## Sección 68: CHAPTER 7 [Entropy: 0.28]

Security and Compliance in GCP. We will examine the tools
regulations and help you build a robust security posture, dissect
compliance frameworks and regulations, and provide actionable
best practices for a secure and compliant cloud infrastructure. At
the end of the day, safeguarding your data and maintaining
customer trust is non-negotiable.
Multiple choice questions
1. What is the primary purpose of IAM in GCP?
a. Cost management
b. User management
c. Resource management
d. Access management
2. Which role in IAM provides full access to all resources?
a. Editor
b. Viewer
c. Owner
d. Browser
3. Which of the following is NOT a type of role in IAM?
a. Primitive role
b. Composite role
c. Predefined role
d. Custom role
4. How are IAM policies evaluated?
a. Deny, Allow, Default
b. Allow, Deny, Default
c. Allow, Default, Deny

d. Deny, Default, Allow
5. What do Organization Policies do?
a. Control user behavior
b. Control resource allocation
c. Control cost
d. Control access at an organization-wide level
6. Which of the following can be accomplished using
Workload Identity Federation?
a. Integrate on-premises IAM
b. Unify identity sources
c. Enforce organization policies
d. Assign predefined roles
7. What is the main purpose of using Labels and Tags?
a. Resource tracking and categorization
b. Cost Management
c. Network Routing
d. Access Control
8. Where can a policy be applied within GCP's resource
hierarchy?
a. Organization level only
b. Project level only
c. Folder level only
d. Any level in the resource hierarchy
9. What does the "Workload Identity Federation" feature
primarily aim to solve?
a. Multi-cloud identity challenges

b. Intra-organization identity synchronization
c. Automated policy enforcement
d. Role-based resource allocation
10. Which IAM role would you assign to a user who needs to
only view the resources in a GCP project?
a. Viewer
b. Editor
c. Owner
d. Contributor
Case studies
1. Background: ABC Corp is a global enterprise with a presence
in over 50 countries. They have a multi-cloud strategy that
includes GCP and two other cloud providers. ABC Corp has
encountered challenges in managing identities and access
control across different platforms, leading to operational
inefficiencies and potential security risks.
Challenge: The main challenge for ABC Corp is to unify
access management across various cloud platforms without
increasing complexity or compromising on security. They
need a solution that:
a. Allows single sign-on (SSO) capabilities for users across all
clouds.
b. Ensures compliance with strict regulatory requirements.
c. Can be scaled and managed efficiently.
2. Background: XYZ Healthcare, a healthcare provider, uses
GCP to store and process patient data. With sensitive data in
the cloud, XYZ Healthcare must adhere to strict compliance
regulations, including HIPAA.
Challenge: XYZ Healthcare needs to ensure that their cloud
environment is compliant at all times with the following

needs:
a. Encrypting sensitive data both at rest and in transit.
b. Restricting access to patient data based on roles and
minimum necessary use.
c. Regularly auditing access and ensuring that no
unauthorized changes are made.
Answer key
1. d. Access Management
2. c. Owner
3. b. Composite Role
4. a. Deny, Allow, Default
5. d. Control access at an organization-wide level
6. b. Unify identity sources
7. a. Resource tracking and categorization
8. d. Any level in the resource hierarchy
9. a. Multi-cloud identity challenges
10. a. Viewer
Case studies
1. ABC Corp decided to implement Google Cloud’s Workload
Identity Federation to streamline their identity management.
Here is how they did it:
a. They established a central identity provider (IdP) that
integrates with all their cloud environments.
b. They configured Workload Identity Federation to accept
identities from the central IdP and mapped these
identities to IAM roles within Google Cloud.
c. They enabled SSO and two-factor authentication through
their IdP to enhance security.
2. To meet these requirements, XYZ Healthcare took the
following steps:

a. They implemented organization policies to enforce
encryption using Google’s managed encryption keys.
b. They designed custom IAM roles that precisely defined
necessary permissions for each job function, following
the principle of least privilege.
c. They used Cloud Audit Logs to monitor and verify
compliance with access and encryption policies.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 69: CHAPTER 8 [Entropy: 0.49]

Security and
Compliance
Introduction
The digital transformation journey to the cloud is underway for
many organizations, with security and compliance being topmost
priorities. Google Cloud Platform (GCP) provides advanced
services and technologies for comprehensive security and
compliance controls.
Security and compliance in the cloud is a shared responsibility
between cloud providers and their customers. Cloud providers offer
a wide range of security services and features to help organizations
protect their data and applications. However, simply adopting cloud
services does not automatically guarantee security or compliance.
Organizations must actively manage their cloud environments and
implement appropriate security measures to meet their specific
requirements.
Security on GCP is an all-encompassing feature that integrates
seamlessly into all services. From the physical security of data
centers to cyber security measures across its networks and services,
GCP ensures that security is not an afterthought but a foundational
component.
Compliance is equally critical, as businesses must navigate a

labyrinth of regulations and standards. GCP provides the tools and
features necessary to meet various industry-specific compliance
requirements, helping organizations protect their data and maintain
trust with their customers.
This chapter aims to unpack the layers of security and compliance
within GCP. We will delve into the intricacies of network security,
explore the capabilities of security monitoring and logging, and
examine how compliance is achieved and maintained. Additionally,
we will look at the incident response and forensics capabilities of
GCP, offering a window into how to handle potential security
events.
As we peek into the future trends in cloud security, we will assess
emerging threats and consider how advances in Artificial
Intelligence (AI) and Machine Learning (ML) are shaping the
future of security in the cloud.
To solidify understanding, the chapter will conclude with a review
section including objective questions for self-assessment and
practical case studies designed to apply the learning in real-world
scenarios.
Structure
Following is the structure of the chapter:
• Security in GCP
• Network security
• Application Layer Security
• Data security
• Security monitoring and logging
• Incident response and forensics
• Best practices
Objectives
By the end of this chapter, readers will have a solid grasp of
security and compliance in the Google Cloud Platform. You will
gain the knowledge to navigate GCP's security infrastructure,
implement best practices for network security, and leverage the

power of security monitoring and logging. We will also explore
various compliance frameworks and how to manage incident
response, ensuring you can keep your cloud environment secure and
compliant. Finally, we will look ahead to help you stay ahead of the
curve when it comes to emerging threats.
Security in GCP
GCP offers a comprehensive security model that spans across its
entire infrastructure, providing protection at multiple layers- from
the physical security of data centers to operational and software
security. This section will explore the foundational elements of
GCP's security architecture, such as its global network, built-in
protections like data encryption, and the security-first mindset that
underpins Google's cloud services.
Core principles of GCP security
To fully grasp the extent and effectiveness of security within GCP, it
is essential to understand its core principles. These foundational
elements collectively forge a robust and dynamic framework,
ensuring that every aspect of GCP’s infrastructure and services is
anchored in stringent security measures and innovative
technologies.
Following are the principles:
• Zero trust security model: GCP adopts Google’s security
model, a zero-trust approach that requires verification of
every user and device trying to access resources in the
corporate network, regardless of whether they are within or
outside of the network perimeter.
• Shared responsibility model: In GCP, security is a shared
responsibility between Google and the customer. Google
manages the security of the cloud infrastructure, while
customers are responsible for securing their data within the
cloud.
• Customer’s role: Customers need to manage user access, data
encryption (in certain scenarios), and network configurations.
This includes setting appropriate IAM policies, configuring
firewalls, and ensuring secure application deployment.
• Context-aware access control: This model relies on data

from users, devices, and applications to make access decisions,
significantly reducing the risk of unauthorized access and
lateral movement within the network.
• Global infrastructure security: These are security measures
in place at GCP data centers:
○ Data center security: GCP's data centers are engineered
with custom-designed electronic access cards, alarms,
vehicle access barriers, perimeter fencing, metal detectors,
and biometrics. The physical layer of security is the first
line of defense.
○ Innovative data center design: Leveraging Google's
proprietary technology, data centers are designed for
security, redundancy, and maximum efficiency. This
includes custom hardware, proprietary operating systems,
and on-site security personnel.
• Layered defense strategy: GCP employs a multi layered
defense strategy to guard against threats at different physical
and virtual layers.
○ Defense in depth: GCP employs a multi-layered security
strategy that includes hardware infrastructure, service
deployment, 
user 
identity, 
storage, 
and 
internet
communication. This approach helps protect against threats
at every level.
○ Intrusion detection and prevention: State-of-the-art
intrusion detection and prevention systems are used to
guard against unauthorized access and cyber threats.
• Secure-by-design software: Security in Software Lifecycle:
Security is integrated into the entire software development
lifecycle at Google. This includes thorough code reviews,
automated testing for vulnerabilities, and a rigorous release
process.
• Encryption by default: All data in GCP is encrypted at rest
and in transit by default. Google uses strong encryption
protocols like TLS for data in transit and AES for data at rest.
• Commitment to transparency and compliance: To comply
with industry standards and enable its customers to build their
own compliance strategies, GCP undertakes various steps, as
follows:
○ Regular third-party audits: GCP undergoes regular audits

---

## Sección 70: CHAPTER 8 [Entropy: 0.665]

for a wide array of international standards, such as ISO
27001, SOC 2/3, and GDPR compliance, ensuring that their
infrastructure 
meets 
stringent 
privacy 
and 
security
standards.
○ Transparency 
reports: 
Google 
regularly 
publishes
transparency reports to provide visibility into the requests
for data or removals it receives from governments.
• Innovative security technologies: GCP employs latest
technologies and standards to stay ahead of the security curve,
following is an example:
○ Advanced AI and machine learning: Google utilizes
advanced AI and machine learning technologies to detect
and respond to emerging threats proactively.
○ Custom security chips: Google has developed customdesigned security chips, including Titan, to secure data
centers and hardware infrastructure.
• Global network architecture: Google leverages its own vast
global infrastructure to provide additional network layer
security, following is an example:
○ Privately routed global network: Google Cloud traffic
flows over Google's private, highly secure global network,
reducing exposure to public internet risks.
○ Edge caching services: GCP provides edge caching
services, ensuring that data is served from global locations
closer to the user, enhancing both performance and
security.
By integrating these principles and features, GCP ensures a robust
and dynamic security posture. The shared responsibility model and
zero trust approach emphasize the importance of continuous
verification and a joint effort in maintaining security and
compliance in the cloud.
Network security
In this section, we will explore the various facets of network
security within the GCP, focusing on how GCP safeguards network
infrastructures and data transmission.
Network security in GCP is a critical aspect that encompasses a
range of technologies and practices designed to protect the

integrity, confidentiality, and accessibility of data and services.
Given the complexity and openness of networked environments,
especially in cloud computing, GCP implements a comprehensive
approach to network security.
Here are key components of network security in GCP:
Virtual Private Cloud
GCP’s Virtual Private Cloud (VPC) provides a comprehensive and
flexible set of networking functionalities. It allows you to create a
private network within GCP, offering control over IP ranges,
subnets, network gateways, and more.
Some key features of VPC are as follows:
• Isolation and customization: VPC provides a logically
isolated network for your GCP resources, ensuring that your
network configurations are separate and secure from others.
You have the control to customize the network configuration
as per your requirements, including the creation of subnets in
different regions.
• Subnet creation and management: Within a VPC, you can
create multiple subnets, each in a different region, which
allows for low-latency network setups and better handling of
regional availability.
Example:
gcloud compute networks subnets create my-subnet \ --
network my-network \ --range 10.0.1.0/24 \ --region uscentral1 
This command creates a subnet 'my-subnet' in the 'uscentral1' region with a specified IP range.
• Routing and firewall rules: VPC allows you to define
dynamic routing and firewall rules to control inbound and
outbound traffic to your instances.
Example of creating a firewall rule:
gcloud compute firewall-rules create my-firewall-rule \ --
direction=INGRESS \ --priority=1000 \ --network=mynetwork \ --action=ALLOW \ --rules=tcp:80 \ --sourceranges=0.0.0.0/0 
This command creates a firewall rule my-firewall-rule that

allows inbound traffic on TCP port 80.
• VPC peering: VPC Peering in GCP allows you to connect your
VPC network with another VPC network, either within the
same project or a different project. This connection is private
and secure.
gcloud compute networks peerings create my-peering \ --
network my-network \ --peer-network other-network \ --
auto-create-routes 
This command sets up a VPC peering connection named mypeering with another network other-network.
• Private Google Access: Private Google Access feature enables
VM instances that do not have external IP addresses to access
Google APIs and services over Google’s network. It is
particularly useful for enhancing security by limiting public
internet exposure.
Use case
Consider a scenario where you are deploying an application across
multiple regions. You can create regional subnets within a VPC for
each application component, ensuring low latency and high
availability. Additionally, you can set up VPC Peering to securely
connect to other networks or partners, as shown in Figure 8.1:

Figure 8.1: Create a new VPC in GCP UI
Cloud Firewalls
Cloud Firewalls in GCP are a crucial component for securing your
cloud network. They control both inbound and outbound network
traffic to and from your Virtual Machine (VM) instances. GCP
provides highly configurable firewall rules that protect your cloud
resources from unauthorized access and various types of cyber
threats.
Some key features of Cloud Firewalls are as follows:
• Stateful inspection: GCP firewalls are stateful, meaning they
keep track of active connections. This allows the firewall to
distinguish 
legitimate 
packets 
for 
different 
types 
of
connections, enhancing security and traffic management.
• Granular rules and policies: Firewalls allow for the creation
of detailed rules that specify which traffic is allowed or

blocked based on source and destination IP addresses, ports,
and protocols.
• Network tags: Network tags can be used to apply firewall
rules to specific instances. When you assign a tag to an
instance, any corresponding firewall rules associated with that
tag are applied to the instance.
• Priority system: Firewall rules are evaluated in order of
priority, with lower numbers indicating higher priority. This
system gives you control over which rules take precedence.
Consider a scenario where you need to secure a set of VM instances
that should only allow Secure Shell (SSH) access from a specific IP
range, reducing the risk of unauthorized access.
While default firewall rules offer a baseline level of protection, they
might not be sufficient for sensitive services like SSH. It is crucial to
restrict SSH access to only trusted IP addresses to minimize the risk
of unauthorized access. Let us see how you can achieve this:
Following are the ways for creating a more secure SSH firewall
rule:
gcloud 
compute 
firewall-rules 
create 
secure-ssh-rule 
\ 
--
direction=INGRESS \ --priority=1000 \ --network=my-vpc \ --
action=ALLOW 
\ 
--rules=tcp:22 
\ 
--sourceranges=203.0.113.0/24 \ --target-tags=ssh-secure 
This command creates a firewall rule named secure-ssh-rule in the
my-vpc network. The rule allows ingress SSH traffic (port 22) but
only from the IP range 203.0.113.0/24. The rule is applied to
instances tagged with ssh-secure.
Following is how to apply the rule to specific instances:
When creating a VM instance that requires this secure SSH access:
gcloud compute instances create my-secure-vm \ --networkinterface=network=my-vpc,subnet=my-subnet,tags=ssh-secure 
This command creates a VM instance named my-secure-vm and
applies the ssh-secure tag to it, ensuring that the firewall rule is
associated with this instance.
This example demonstrates a common security practice where SSH
access is restricted to a known, trusted IP range. This significantly
reduces the attack surface compared to allowing SSH access from
any IP address.

---

## Sección 71: CHAPTER 8 [Entropy: 0.595]

For example, if you are running a web server on a VM instance in
GCP, you can create a firewall rule to allow only HTTP and HTTPS
traffic to the server. You can assign a tag like http-server to your
VM and then create a firewall rule that allows traffic on ports 80
and 443 only for instances with this tag.
Identity-Aware Proxy
Identity-Aware Proxy (IAP) in GCP offers a secure method of
managing access to your web applications and VMs. It centralizes
access control for your cloud resources by verifying user identity
and context of the request, thereby enhancing security and control.
Some key features of IAP are as follows:
• Context-aware access control:
○ IAP evaluates both the identity of the user and the context
of the request (like the user's location, device security
status, and job title) before granting access.
○ This ensures that only authenticated and authorized users
can access your applications.
• Integration with IAM and OAuth:
○ IAP works closely with GCP’s IAM for identity verification
and uses OAuth for authentication, ensuring a secure and
seamless user experience.
• Zero trust approach:
○ By requiring every request to be authenticated and
authorized, IAP aligns with the Zero Trust security model,
moving away from the traditional network perimeter-based
security approach.
Implementation and code snippets
To enable IAP for a GCP application, you need to configure the
OAuth consent screen and set up IAP access policies, as follows:
gcloud services enable iap.googleapis.com gcloud iap web enable \
--resource-type=app_engine \ --oauth2-client-id=YOUR_CLIENT_ID
\ --oauth2-client-secret=YOUR_CLIENT_SECRET 
This command enables IAP for an App Engine application and sets
up the OAuth client ID and secret.

Securing a GCP VM with IAP:
IAP can be used to control SSH and RDP access to GCP VMs. The
setup involves configuring IAP tunneling and applying the necessary
IAM roles to the user.
gcloud compute start-iap-tunnel my-vm 22 \ --zone us-central1-a \
--local-host-port=localhost:22 
This command starts an IAP tunnel to a VM instance for secure SSH
access.
The use cases for IAP are as follows:
• Securing web applications: IAP is ideal for securing internal
web applications. It eliminates the need for a VPN and allows
remote workers to securely access internal apps.
• Protecting developer environments: Use IAP to control
access to development environments hosted on GCP, ensuring
that only authorized personnel can access these resources.
Cloud VPN and Cloud Interconnect
For businesses requiring secure and reliable connectivity between
their on-premises networks and the Google Cloud, Cloud VPN and
Cloud Interconnect are essential services. They provide robust
solutions for different connectivity needs.
Cloud VPN
Cloud VPN, also known as Cloud-based Virtual Private Network, is a
networking service that establishes secure encrypted tunnels
between your on-premises network and cloud resources hosted by a
cloud service provider (CSP) like GCP. VPN in GCP offers:
• Secure connectivity: Cloud VPN offers an IPsec-encrypted
tunnel between your on-premises network and your GCP
network, ensuring secure data transit. It is commonly used for
scenarios where data needs to be protected as it travels across
the internet.
• Setup and configuration: You can set up either a dynamic
(BGP) or static routing VPN. Example command to create a
Cloud VPN gateway:
gcloud 
compute 
target-vpn-gateways 
create 
my-vpngateway \ --network my-network \ --region us-central1 

This command creates a VPN gateway in the 'us-central1'
region within your network.
The use cases for cloud VPN are as follows:
• Ideal for extending on-premises networks to the cloud in a
secure manner.
• Suitable for disaster recovery scenarios, allowing traffic to be
rerouted through the VPN if the primary connection fails.
Cloud interconnect
Cloud interconnect refers to a dedicated network connection that
directly links your on-premises network infrastructure to a CSP’s
network.
Following are key characteristics of Cloud interconnect on GCP:
• High-speed, low-latency connections:
○ Offers a direct physical connection between your onpremises network and GCP for high-throughput, lowlatency needs.
○ Ideal for applications demanding real-time data transfer or
high-throughput workloads.
• Dedicated and partner interconnect options:
○ Dedicated interconnect: Provides dedicated, high-capacity
connectivity for large-scale deployments and missioncritical workloads.
Example command to create a dedicated interconnect:
gcloud compute interconnects create my-interconnect
\ --location interconnect-location \ --capacity 10Gbps
\ --interconnect-type DEDICATED 
// This command sets up a 10 Gbps dedicated
interconnect at a specified location.
○ Partner interconnect: Offers flexible, lower-capacity
options through network service providers, simplifying the
setup process for smaller organizations.
• Cross-cloud interconnect:
○ Enables high-bandwidth connectivity between Google
Cloud and other supported cloud service providers.
○ Provides a dedicated physical connection between the

Google network and the network of the partner cloud
provider.
○ Allows you to peer your Google VPC network with your
network hosted on the partner cloud platform.
The use case of Cloud Interconnect is that it is most suitable for
large-scale migrations, big data transfers, and mission-critical
applications that require consistent and reliable bandwidth.
Private Google Access in GCP
Private Google Access is a distinctive feature in GCP that allows VM
instances without external internet access to reach Google services.
It is a vital component for enhancing network security and privacy
in cloud environments.
Some key features of Private Google Access are as follows:
• Non-internet-facing access to Google Services:
○ VMs in your VPC can access Google services like Google
Cloud Storage, BigQuery, and more, without needing to
route traffic over the public internet.
○ This feature ensures that your internal services can remain
entirely isolated from the internet while still leveraging
Google’s powerful cloud services.
• No public IP addresses required:
○ VM instances do not require public IP addresses to use
Private Google Access, reducing the potential attack surface
exposed to external threats.
• Simple configuration:
○ Enabling Private Google Access is straightforward, typically
involving configuration changes in your VPC and DNS
settings.
Setup and configuration
To leverage the enhanced security and performance benefits of
Private Google Access, you need to enable it specifically on the
subnets within your VPC network where you want the following
feature to be active:
gcloud compute networks subnets update my-subnet \ --
region=us-central1 \ --enable-private-ip-google-access

---

## Sección 72: CHAPTER 8 [Entropy: 0.523]

This command configures the subnet my-subnet in the us-central1
region, permitting VMs within this subnet to seamlessly access
Google services without requiring an external IP address. This is
crucial for sensitive workloads or applications that need to
communicate with Google services while remaining isolated from
the public internet.
DNS configuration
For Private Google Access to function correctly, it's essential that
your VMs are configured to use either:
• The default DNS server provided by Google, which is
automatically aware of private Google service IP addresses.
• A custom DNS server that you've explicitly configured to
resolve Google service URLs to their private IP addresses.
Use cases:
Private Google Access offers significant advantages in various
scenarios as follows:
• Enhanced security for internal applications: If you have
applications that handle sensitive data or require a high level
of isolation from the public internet, Private Google Access
allows them to securely utilize Google's cloud services without
exposing them to external threats.
• Data 
processing 
workloads: 
Workloads 
that 
involve
extensive interaction with Google services like BigQuery or
Cloud Storage, but don't necessitate direct internet access, can
benefit greatly from Private Google Access. This configuration
enhances both security and performance by keeping the data
traffic within Google's network.
Application Layer Security
In the realm of cloud computing, securing the application layer is
paramount to safeguarding your digital assets. This section delves
into one of the key tools provided by GCP for this purpose.
Cloud Armor
Google Cloud Armor is a security service provided by GCP that
offers protection to applications running on the platform against a

variety of threats. It is primarily used to safeguard web applications
from Distributed Denial of Service (DDoS) attacks, as well as
other web-based attacks like SQL injections, cross-site scripting
(XSS), and more.
Following is a brief overview:
• DDoS protection: Cloud Armor utilizes Google's global
infrastructure and security systems to protect against largescale DDoS attacks. This infrastructure is the same that Google
uses to protect services like Gmail, YouTube, and Search.
• Customizable 
security 
policies: 
Users 
can 
define
customizable security rules and policies to control and filter
incoming traffic to their web applications. This includes
allowing or denying access based on IP addresses, geolocation,
and other attributes of the request.
• Web Application Firewall capabilities: Cloud Armor also
functions as a Web Application Firewall (WAF), enabling
users to create rules that block common web attacks and
vulnerabilities.
• Integration with Google Cloud Services: It seamlessly
integrates with other Google Cloud services like Global
HTTP(S) Load Balancer, providing a smooth and secure
experience in deploying and managing applications.
• Real-time metrics and reporting: Cloud Armor provides
real-time telemetry and logging, allowing users to monitor and
analyze traffic and attack patterns. This helps in making
informed decisions about security rules and policies.
• Named IP lists: Users can leverage pre-configured named IP
lists (such as known Tor exit nodes or a list of IPs associated
with a specific cloud provider) to create rules in their security
policies.
• Machine Learning: Leveraging Google's machine learning
capabilities, Cloud Armor can adapt to emerging threats and
unusual traffic patterns, enhancing its effectiveness in realtime threat mitigation.
Cloud Armor is designed for organizations and developers who are
looking to enhance the security posture of their applications on
GCP, especially when facing high risks of internet threats and
attacks. Imagine you're managing an online store, and you want to
make sure that customers can access your site smoothly and

securely. You also want to protect your store from hackers who
might try to steal customer information or disrupt your business.
That is where Cloud Armor comes in. It is like a security guard for
your online store, working behind the scenes to keep things running
smoothly and protecting you from bad guys.
Cloud Armor has three main superpowers as follows:
• Blocking bad guys from entering your store: Just like a
security guard checks IDs at the door, Cloud Armor checks all
incoming traffic to your store to make sure it's legitimate. If it
detects something suspicious, it blocks it before it can cause
any harm.
• Protecting 
your 
store 
from 
overwhelming 
attacks:
Sometimes, hackers might try to overwhelm your store with a
flood of traffic, trying to make it crash or slow down. Cloud
Armor is like a force field, absorbing these attacks and
preventing them from affecting your store's performance.
• Keeping a watchful eye on everything: Cloud Armor
constantly monitors all traffic to your store, looking for any
signs of trouble. It can identify suspicious patterns or activities
and alert you so you can take action quickly.
Think of Cloud Armor as your trusty security partner, always
working in the background to keep your online store safe and
secure. It is like having a superhero protecting your digital
storefront, ensuring that your customers can shop safely and that
your business stays protected.
Data security
In the digital age, where data is akin to currency, ensuring its
security is not just a measure but a necessity. To deal with modernday sophisticated cyber threats, data security stands as the
cornerstone of any robust digital strategy. Understanding and
implementing the core pillars of data security is not just a defensive
measure but a fundamental aspect of maintaining trust, integrity,
and continuity in the digital realm. This section aims to provide a
comprehensive overview of these pillars, ensuring that you have the
knowledge and tools to protect your most valuable digital assets.
Data encryption

At its heart, data encryption transforms readable data into a coded
format, accessible only to those who possess the key. In GCP,
encryption practices are designed to secure data both when it is
stored (at rest) and as it is being transmitted (in motion).
Furthermore, GCP offers flexibility and control through Customer-
Managed Encryption Keys (CMEKs). Let us explore each of these
in detail, as follows:
• Encryption for data at rest: Data at rest refers to any data
that is stored physically in any digital form, such as on a disk.
In GCP, data at rest is encrypted by default to protect it from
unauthorized access. GCP uses several layers of encryption to
secure data at rest. This includes encrypting the data before it
is written to disk, and stored in encrypted blocks. Google uses
strong encryption methods like AES-256.
Follow these best practices for encryption of data at rest:
○ Ensure that your data storage choices in GCP (like Cloud
Storage, Persistent Disk, and Cloud SQL) align with your
organization's data security policies. Utilize additional
controls offered by GCP for sensitive data.
○ Regularly review and understand the encryption and key
management processes for each GCP service you use.
○ For highly sensitive data, consider additional encryption
layers or use services like Cloud KMS or CMEKs to manage
your encryption keys.
○ Ensure compliance with industry standards and regulations
regarding data encryption and key management.
• Encryption for data in motion: Data in motion involves data
actively moving from one location to another, such as across
the internet or through a network. Encrypting this data is
essential to protect it from interception.

---

## Sección 73: CHAPTER 8 [Entropy: 0.4]

GCP automatically encrypts data in transit between Google’s
facilities. HTTPS is used to protect data communicated
between Google services and the users. For internal data
transfers, Google uses protocols like Transport Layer
Security (TLS).
Follow these best practices for encryption of data in motion:
○ Always use secure, encrypted connections when transferring
data. Utilize HTTPS and TLS for all your applications and
services.

○ For additional security, especially for highly sensitive
information, consider application-level encryption before
transmitting data.
○ Regularly update and patch your systems to ensure you use
the latest, most secure versions of transmission protocols.
• Customer-Managed Encryption Keys (CMEKs): While GCP
encrypts data by default, organizations may require more
control over encryption keys. CMEKs provide this control.
With CMEKs, you manage your encryption keys using Google’s
Cloud Key Management Service. This allows you to create,
use, rotate, and destroy AES-256 encryption keys.
Follow these best practices while using CMEKs:
○ Use CMEKs for scenarios where you need to demonstrate
control over key management for compliance or regulatory
reasons.
○ Regularly rotate and audit your CMEKs. GCP provides
features to automate key rotation, making this process more
manageable.
○ Implement strict access controls and logging for your
CMEKs. This includes monitoring who can access these keys
and auditing their usage.
Access control and identity management
As we have previously discussed in detail about access management
and IAM in earlier chapters, it is crucial to apply those principles
specifically to data security within GCP.
Following are the best practices for safeguarding your data through
effective access control and identity management:
• Reinforcing data security with access control: Access
control in GCP is managed through IAM, which allows precise
control over who can access your cloud resources.
Utilize the following data security best practices to safeguard
against unwarranted threats:
○ Implement fine-grained access controls for sensitive data.
Use GCP's IAM to assign specific roles related to data
management and analysis, like BigQuery Data Viewer or
Cloud Storage Object Admin.
○ Regularly audit who has access to your data. Utilize GCP’s
audit logs to track access and changes to data resources.

○ Apply resource-level policies to critical datasets to ensure
that only authorized entities can access or modify them.
• Streamlining identity management for data integrity:
Identity 
management 
involves 
ensuring 
that 
only
authenticated and authorized users and services can access
your resources in GCP.
Following are some best practices you can utilize while
setting up IAM identities and permissions for your cloud
infrastructure:
○ Consistently manage user identities, especially in scenarios
involving data access. Ensure that users have access only to
the data necessary for their role.
○ Use group-based access controls for managing access to
datasets. This simplifies the process when multiple users
need similar access.
○ Implement strong authentication mechanisms, like twofactor authentication, particularly for users with access to
sensitive or critical data.
• Advanced access techniques for enhanced data protection:
While basic IAM roles and permissions are fundamental,
leveraging advanced features can provide additional layers of
data security.
Following are some advanced security features you can
employ to harden your cloud security posture:
○ Consider context-aware access controls for dynamic control
based on user context, providing an additional layer of
security for sensitive data.
○ When integrating with third-party identity providers, ensure
that their security standards align with your data protection
goals in GCP.
○ Utilize GCP’s custom roles for highly specific data access
needs, tailoring permissions to match the exact requirements
of different user groups or scenarios.
Data resilience
While detailed discussions on disaster recovery and high availability
are covered in a dedicated chapter, it is important to underline their
relevance to data resilience.
Following are the key best practices that specifically enhance data

resilience in GCP, ensuring your data remains secure, intact, and
readily available.
• Regular backups and data redundancy: Schedule backups
to occur at regular intervals and ensure redundancy by storing
backups in multiple locations or regions within GCP. This
approach safeguards against data loss due to accidental
deletions, system failures, or disasters.
• Snapshot and versioning capabilities: Snapshots and
versioning provide point-in-time recovery options, enabling
you to restore data to a specific state. This is particularly
useful for quickly recovering from data corruption or loss.
• Cross-region replication for critical data: Storing replicated
data in multiple regions within GCP enhances protection
against regional outages or localized disasters, ensuring data
availability and business continuity.
• Data integrity measures: Regularly audit data access and
modifications. Utilize GCP’s encryption capabilities and access
management tools to safeguard data against unauthorized
changes and breaches.
• Disaster recovery planning: Detailed strategies for disaster
recovery and high availability are covered in their respective
chapter. Ensure that your disaster recovery plan is aligned
with your data resilience strategy. Regularly test and update
the plan to address new risks and changes in your cloud
environment.
Data lifecycle management
Data lifecycle management (DLM) in GCP is a comprehensive
approach that ensures efficient and secure handling of data from its
inception to its eventual obsolescence. This process is key to
maintaining data relevance, optimizing storage costs, and adhering
to compliance requirements. Following are some salient points of
DLM on GCP:
• Understanding data lifecycle in GCP: The lifecycle of data
in GCP involves several stages, including creation, storage,
usage, sharing, archiving, and deletion. Managing this
lifecycle effectively is essential for optimizing storage costs
and maintaining data security. GCP facilitates this process
through various tools like Object Lifecycle Management in
Cloud Storage, automated data tiering in BigQuery, and

---

## Sección 74: CHAPTER 8 [Entropy: 0.515]

custom retention policies in Cloud Spanner.
• Data creation and storage: When data is created, it is crucial
to classify it based on sensitivity and importance. This
classification guides the choice of the appropriate storage class
in GCP, such as Standard, Nearline, Coldline, or Archive in
Cloud Storage, depending on the frequency of access needed.
• Data usage and sharing: Managing how data is accessed and
shared is vital. Implementing robust access controls and
identity management ensures that only authorized users have
access. Additionally, using data loss prevention (DLP) tools
helps monitor and regulate data usage and sharing, thus
preventing unintentional disclosure of sensitive information.
• Data archiving and deletion: GCP's Object Lifecycle
Management can automate the transition of data to colder
storage and its eventual deletion. It is important to regularly
review and update data retention policies to comply with legal
requirements and meet business needs. Secure deletion of
obsolete data is also crucial to prevent unauthorized access or
recovery.
• Cost management and compliance: Regular monitoring and
optimization of storage costs are essential, particularly by
reviewing data usage patterns and adjusting storage classes
and retention policies as needed. Staying updated with
compliance 
requirements 
relevant 
to 
your 
data 
and
implementing corresponding policies in GCP is also crucial for
legal and operational conformity.
• Regular audits and updates: To ensure ongoing effectiveness
and alignment with business objectives, conduct regular audits
of your data lifecycle policies. As technology and regulatory
requirements evolve, proactive updates to data management
strategies are necessary to maintain relevance and efficiency.
Compliance and data governance
Adhering to legal and regulatory standards related to data security
is non-negotiable. This pillar involves understanding and
implementing practices that comply with data protection laws and
industry regulations.
Compliance standards are critical for enterprises to ensure they
meet legal, ethical, and technical standards. In this section, we will
discuss some of the most prominent compliance standards that

enterprises commonly need to adhere to.
General Data Protection Regulation
The General Data Protection Regulation (GDPR) is a regulation
in EU law on data protection and privacy in the European Union
(EU) and the European Economic Area (EEA). It also addresses
the transfer of personal data outside the EU and EEA areas. The
GDPR aims primarily to give control to individuals over their
personal data and to simplify the regulatory environment for
international business by unifying the regulation within the EU.
Some key requirements of GDPR: The GDPR imposes a number of
requirements on organizations that process personal data, are as
follows:
• Transparency: 
Organizations 
must 
provide 
clear 
and
transparent information to individuals about how their
personal data is being processed.
• Right to access: Individuals have the right to access their
personal data and to know how it is being processed.
• Right to rectification: Individuals have the right to have
inaccurate personal data rectified.
• Right to erasure: In certain circumstances, individuals have
the right to have their personal data erased.
• Right to restrict processing: Individuals have the right to
restrict the processing of their personal data.
• Right to data portability: Individuals have the right to
receive their personal data in a structured, commonly used,
and machine-readable format and to have it transmitted to
another controller.
• Right to object: Individuals have the right to object to the
processing of their personal data in certain circumstances.
• Data protection impact assessments: Organizations must
conduct data protection impact assessments for certain types
of processing that pose a high risk to the rights and freedoms
of individuals.
• Data protection officer: Organizations that process large
amounts of sensitive personal data or that engage in certain
types of high-risk processing must appoint a data protection
officer.

• Security: Organizations must implement appropriate technical
and organizational measures to protect personal data from
unauthorized or unlawful processing and from accidental loss,
destruction, or damage.
• Reporting of data breaches: Organizations must report data
breaches to the supervisory authority within 72 hours of
becoming aware of them.
Compliance with the GDPR is essential for organizations that
process personal data of EU residents. Failure to comply with the
GDPR can result in significant fines of up to 4% of annual global
turnover or €20 million, whichever is greater.
Health Insurance Portability and Accountability Act
The Health Insurance Portability and Accountability Act
(HIPAA) is a U.S. federal law that sets standards for the protection
of health information. It applies to healthcare providers, health
plans, and certain other entities that handle or transmit individually
identifiable health information (PHI).
HIPAA imposes a number of requirements on covered entities, as
follows:
• Privacy rule: The privacy rule establishes national standards
for the protection of PHI. It requires covered entities to obtain
individual authorization before using or disclosing PHI for
certain purposes, such as marketing or selling PHI.
• Security rule: The security rule establishes standards for the
security of PHI. It requires covered entities to implement
appropriate administrative, physical, and technical safeguards
to protect PHI from unauthorized access, use, or disclosure.
• Breach notification rule: The breach notification rule
requires covered entities to notify individuals and the
Secretary of Health and Human Services (HHS) of breaches
of PHI that pose a significant risk of harm to individuals.
• Electronic transactions and code sets rule: The electronic
transactions and code sets rule establishes standards for the
electronic exchange of healthcare information. It requires
covered entities to use certain standardized codes and formats
for electronic transactions, such as claims submission and
eligibility verification.
Compliance with HIPAA is essential for healthcare providers, health

---

## Sección 75: CHAPTER 8 [Entropy: 0.5]

plans, and other entities that handle PHI. Failure to comply with
HIPAA can result in significant penalties, including civil fines of up
to $50,000 per violation and criminal penalties of up to 10 years in
prison.
California Consumer Privacy Act
The California Consumer Privacy Act (CCPA) is a state law that
went into effect on January 1, 2020. It applies to businesses that
operate in California or that do business with California residents.
The CCPA gives California residents the right to know what
personal information businesses collect about them, the right to
have that information deleted, and the right to opt out of the sale of
their personal information.
The CCPA imposes a number of requirements on businesses, as
follows:
• Disclosure 
requirement: 
Businesses 
must 
disclose 
to
consumers what personal information they collect about them,
the categories of personal information they sell, and the
categories of third parties to whom they sell personal
information.
• Right to know requirement: Consumers have the right to
request from a business that it disclose to them the specific
pieces of personal information it has collected about them in
the past 12 months.
• Right to delete requirement: Consumers have the right to
request that a business delete the personal information it has
collected about them.
• Right to opt out of the sale of personal information
requirement: Consumers have the right to opt out of the sale
of their personal information by a business.
• Do 
not 
track 
requirement: 
Businesses 
must 
obtain
affirmative consent from consumers before tracking their
online activity across multiple websites.
• Non-discrimination 
requirement: 
Businesses 
cannot
discriminate against consumers for exercising their rights
under the CCPA.
Compliance with the CCPA is essential for businesses that operate in
California or that do business with California residents. Failure to

comply with the CCPA can result in significant fines of up to $2,500
per violation and $7,500 per intentional violation.
Digital Markets Act
The Digital Markets Act (DMA) is a regulation in EU law on
gatekeepers in digital markets. It aims to ensure fair competition in
digital markets by addressing the practices of large online platforms
that harm competition and consumers. The DMA was adopted by
the European Parliament and Council on 15 April 2022 and entered
into force on 2 May 2023.
The DMA imposes a number of requirements on gatekeepers, as
follows:
• Ban on self-preferencing: Gatekeepers are prohibited from
giving preferential treatment to their own products or services
over those of others.
• Interoperability requirement: Gatekeepers must ensure that
their products and services are interoperable with those of
others.
• Data access requirement: Gatekeepers must provide access
to their data to other businesses.
• Transparency requirement: Gatekeepers must be transparent
about their data collection and processing practices.
• User choice requirement: Gatekeepers must give users a
choice of which products and services they use.
• Due diligence requirement: Gatekeepers must conduct due
diligence to identify and address potential risks to competition
and consumers.
• Auditing requirement: Gatekeepers must be audited by
independent auditors to ensure compliance with the DMA.
Compliance with the DMA is essential for large online platforms
that operate in the EU. Failure to comply with the DMA can result
in significant fines of up to 10% of global annual turnover or €30
million, whichever is greater.
GCP offers a range of features and services designed to help
organizations meet their compliance obligations, as follows:
• Data encryption: Ensures data is encrypted at rest and in
transit, a key requirement for many compliance standards.

• IAM: Provides fine-grained access control to GCP services and
resources, essential for regulatory compliance.
• Cloud audit logs: Offers detailed logging that is vital for
auditing and compliance purposes.
• Data Loss Prevention (DLP) API: Helps in discovering and
redacting sensitive data, crucial for GDPR and other privacyrelated compliances.
• Compliance reports manager: A tool to access various
compliance reports, providing transparency into GCP’s
security practices.
GCP compliance philosophy
GCP offers a variety of features and services designed to help
organizations comply with various standards and regulations. These
are some important features that address different aspects of
compliance, from data protection to auditing and reporting, as
follows:
• Data encryption at rest and in transit: GCP encrypts
customer data stored at rest by default, without any action
required from the customer, using one or more encryption
mechanisms. Data in transit is also protected using secure
transport protocols such as HTTPS and Transport Layer
Security (TLS).
• Fine-grained access control: GCP’s IAM allows you to
manage who has access to your GCP resources and what they
can do with those resources. It plays a critical role in ensuring
that only authorized and authenticated users can access
sensitive data and services, aligning with compliance
requirements like GDPR and HIPAA.
• Cloud audit logs (Tracking user and administrator
activity): Cloud Audit Logs provide a way to track who did
what, when, and where if they interacted with your GCP
resources. They are essential for compliance audits, providing
evidence of access and changes made in the environment.
• Identifying and protecting sensitive data through data
loss prevention (DLP) API: The DLP API helps discover,
classify, and protect sensitive data in GCP. It is particularly
useful for complying with regulations that require the
protection of specific types of data, such as GDPR for personal

data or HIPAA for health information.
• Compliance reports manager: Compliance reports manager
in GCP provides access to various compliance reports such as
ISO, SOC, and PCI. These reports can help you understand
GCP’s compliance with global standards and assist in your
own compliance efforts.
• Integrated risk management via security command center:
Security Command Center helps you identify and prioritize
security issues across your GCP resources. It can aid in
compliance by providing insights into data exposure risks,
detecting misconfigurations, and enabling effective response
to threats.
Security monitoring and logging
Cloud security, monitoring, and logging are crucial components of a
secure cloud environment. GCP’s Cloud Monitoring suite, along
with its integrated services, provides robust tools for observing,
logging, and analyzing the behavior of cloud resources, thereby
enhancing security, compliance, and overall cloud operations.
Cloud Monitoring suite offers the following features to enable
security monitoring and logging:
• Comprehensive monitoring: Cloud Monitoring provides a
detailed view of the health, performance, and availability of
cloud applications and services. It integrates with a wide
range of GCP services, ensuring that you can monitor almost
every aspect of your environment.
• Real-Time Logging and Alerts: Cloud Logging, part of Cloud
Monitoring, captures logs from various GCP services. These
logs are vital for understanding the behavior of applications
and for troubleshooting issues. You can set up real-time alerts
based on specific log metrics or events, enabling prompt
responses to potential security incidents.
• Integration with Cloud Security Command Center (Cloud
SCC): Cloud Monitoring can feed its data into Cloud SCC,
providing a centralized view of your security status across
your GCP environment.

---

## Sección 76: CHAPTER 8 [Entropy: 0.653]

Setup and configuration
To use Cloud Monitoring effectively, you first need to ensure that it

is enabled for your GCP project and that your resources are
configured to send data to it as follows:
gcloud services enable monitoring.googleapis.com 
This straightforward command activates the Cloud Monitoring API
for your project, laying the groundwork for comprehensive
observability.
Creating custom metrics and dashboards:
Beyond the default metrics, Cloud Monitoring empowers you to
create custom metrics and dashboards tailored to your specific
monitoring requirements.
gcloud 
monitoring 
metrics-descriptors 
create 
\ 
--
description="Description 
of 
your 
metric" 
\ 
--
type="custom.googleapis.com/my_custom_metric" 
\ 
--metrickind=GAUGE \ --value-type=INT64 \ --labels="key=value" 
This command lays the foundation by establishing a custom metric
descriptor. With this descriptor in place, you can start feeding
tailored data into Cloud Monitoring, gaining valuable insights into
specific aspects of your environment that matter most to you.
Real-world applications of Cloud Monitoring and logging:
The combined power of Cloud Monitoring and logging offers
solutions for a variety of crucial use cases:
• Security event detection: By monitoring and analyzing
patterns within your logs and metrics, you can proactively
identify anomalies that might signal security threats, such as
unusual API calls or unexpected network traffic spikes.
• Audit and compliance: Cloud Monitoring logs serve as
detailed audit trails, offering valuable evidence during
compliance audits. Regular reviews of logs and metrics ensure
adherence to security policies and industry regulations.
Incident response and forensics
Incident response and forensics are critical components of a
comprehensive security strategy, especially in cloud environments
like GCP. In today's digital world, and organizations must be
prepared to respond to security incidents effectively. GCP provides a
comprehensive suite of tools and services to help organizations with
incident response and forensics.

Following are key elements of Incident Response in GCP:
• Preparation and planning: Developing an incident response
plan specific to your GCP environment is crucial. This plan
should include roles and responsibilities, communication
strategies, and steps for addressing different types of incidents.
• Detection and analysis: Utilizing GCP tools like Cloud
Monitoring, Cloud Logging, and Security Command Center
(SCC) for early detection of anomalous activities or potential
security breaches. Setting up alerting policies in Cloud
Monitoring to notify team members of potential incidents.
• Containment and eradication: Quick containment strategies
to limit the impact of an incident. This might involve isolating
affected systems or temporarily shutting down certain
services. Investigating the root cause of the incident and
taking steps to remove the threat from the environment.
• Recovery: Restoring services and data to normal operation
while ensuring that the system is no longer vulnerable to the
same type of attack. Leveraging GCP's data backup and
recovery tools to restore affected data or services.
• Post-incident analysis: Conducting a thorough review of the
incident to understand what happened, how the response was
handled, and what can be improved. Updating the incident
response plan based on lessons learned.
Forensic analysis in GCP
Forensic analysis plays a vital role in incident response within GCP.
It empowers you to investigate and understand security breaches or
suspicious activity.
Following is an overview of the key steps involved:
• Data collection and preservation: Utilizing tools like Cloud
Logging and Cloud Audit Logs to collect and preserve logs
crucial for forensic analysis. Ensure these logs are stored
securely and retained for a sufficient period to meet
investigative and compliance needs.
• Analysis tools and techniques: Analyzing logs and system
data to uncover the timeline of events, the scope of the
impact, and the methods used by the attacker. Leverage thirdparty forensic analysis tools that integrate with GCP for more
advanced investigation needs.

Following are some important GCP services to help enterprise with
incident response and forensics needs:
• Security Command Center: SCC is a centralized platform for
managing security and compliance posture across GCP
environments. It provides a unified view of security incidents
and helps organizations prioritize and respond to them
effectively.
• Cloud Security Command Center (Cloud SOC): Cloud SOC is
a managed security service that provides organizations with
24/7 security monitoring, threat detection, and incident
response.
• Cloud Identity and Access Management (IAM): IAM allows
organizations to control who has access to their GCP resources
and what actions they can perform. This helps to prevent
unauthorized access, which is a common cause of security
incidents.
• Audit logging: Audit logging allows organizations to track all
activity in their GCP accounts. This helps to identify and
investigate potential security incidents.
• Data Loss Prevention (DLP): DLP helps organizations to
identify and protect sensitive data. This helps to prevent the
unauthorized disclosure of sensitive data, which is a major
component of many security incidents.
Figure 8.2: Cloud Armor create policy
Best practices

Following are the best practices of Forensic analysis in GCP:
• Security in GCP
○ Implement a layered security approach: Utilize the
multiple layers of security provided by GCP, including
physical security, network security, and application
security.
○ Regularly update and patch systems: Keep all systems
and software updated to protect against vulnerabilities.
○ Use IAM effectively: Implement least privilege access,
regularly review IAM roles and permissions, and employ
role-based access controls.
• Network security in GCP
○ Segment networks using VPCs: Create different VPCs for
various parts of your organization to limit the scope of
network breaches.
○ Enforce strong firewall rules: Regularly review and
update firewall rules to ensure they align with the current
security requirements.
○ Use private connectivity options: Leverage Cloud VPN or
Interconnect for secure communication between onpremises networks and GCP.
• Security monitoring and logging with cloud monitoring
○ Set up comprehensive monitoring and alerts: Monitor all
resources and set up alerts for abnormal activities that
could indicate security incidents.
○ Audit logs regularly: Regularly review Cloud Audit Logs to
detect unusual activities and trace back security incidents.
○ Integrate monitoring tools: Combine Cloud Monitoring
with other GCP security tools for a unified view of security
threats.
• Compliance in GCP
○ Stay informed about compliance requirements: Keep upto-date with the latest in compliance standards relevant to
your industry.
○ Leverage GCP’s compliance resources: Utilize tools like
Compliance Reports Manager and DLP API to maintain
compliance.

---

## Sección 77: CHAPTER 8 [Entropy: 0.28]

○ Conduct regular compliance audits: Regularly audit your
environment using GCP tools to ensure ongoing compliance
with various standards.
• Incident response and forensics
○ Prepare an incident response plan: Have a well-defined
incident response plan tailored to your GCP environment.
○ Practice incident response drills: Regularly conduct drills
to ensure your team is prepared to respond to incidents
effectively.
○ Utilize forensic tools: Use GCP’s forensic tools for
thorough investigation following an incident and preserve
logs and data for post-incident analysis.
By adopting these best practices, you can use GCP's security features
to protect data and applications while leveraging cloud with
confidence.
Conclusion
In this chapter, we delved into the multi-layered security measures
of GCP, from its fortified data centers to advanced network security
and application-level controls. We discussed Shared Responsibility
Model, a foundational aspect of cloud security where both Google
and the customers play pivotal roles in maintaining a secure cloud
environment. Next, we took an in-depth look at GCP's security
toolkit, including IAM, Cloud Armor, and VPCs. We emphasized the
importance of proactive monitoring and logging, using Cloud
Monitoring and Cloud Audit Logs, as key strategies in the early
detection and management of security incidents.
The discussion around incident response readiness in GCP
illustrated the importance of being prepared with a solid incident
response plan, the right tools, and best practices to effectively
manage and recover from security incidents. We explored how GCP
supports ongoing compliance efforts, featuring tools like the
Compliance Reports Manager and DLP API, and stressed the
importance of regular audits and updates to stay aligned with
evolving compliance standards.
This chapter serves as a comprehensive guide for navigating the
complexities of security and compliance in GCP. It highlights that

security in the cloud is a continuous journey, requiring ongoing
vigilance, adaptation, and a proactive stance. As cloud technologies
evolve, so too do the challenges and strategies in maintaining a
secure and compliant cloud ecosystem.
In the next chapter, we will cover techniques and tools for
deploying and managing applications in GCP. It will include topics
such as IaC, Deployment manager, Workflows, and Cloud Functions.
Multiple choice questions
1. What does IAM in GCP primarily manage?
a. Data encryption protocols
b. Virtual machine sizes
c. User access and permissions
d. Network traffic routing
2. Which GCP service is used for real-time monitoring and
alerting of security incidents?
a. Cloud SQL
b. Cloud Monitoring
c. Cloud Storage
d. Cloud DNS
3. What is the main purpose of using VPC in GCP?
a. To manage Kubernetes clusters
b. To provide isolated network environments
c. To enhance machine learning capabilities
d. To automate software deployments
4. Which compliance regulation focuses on protecting
sensitive patient data in healthcare?
a. GDPR

b. PCI-DSS
c. HIPAA
d. SOC 2
5. What is the primary function of Cloud Audit Logs in GCP?
a. To provide data backup solutions
b. To track user and administrator activities
c. To manage database versions
d. To optimize cloud spending
6. Which of the following is a key feature of Cloud Armor?
a. Data analysis and reporting
b. Protection against DDoS attacks
c. Real-time data transformation
d. Automated resource allocation
7. For what purpose is Cloud VPN primarily used in GCP?
a. Secure connection between on-premises networks and
GCP
b. Data encryption for Cloud Storage
c. Load balancing between multiple compute instances
d. Performance monitoring of applications
8. What is a crucial step in preparing for incident response
in GCP?
a. Setting up a Cloud SQL database
b. Developing an incident response plan
c. Increasing the size of compute instances
d. Disabling firewall rules

9. Which of these practices is recommended for maintaining
compliance in GCP?
a. Regularly changing project names
b. Frequent compliance audits using GCP tools
c. Reducing the number of IAM roles
d. Consolidating all data into a single Cloud Storage bucket
10. What does the DLP API in GCP help with?
a. Automating machine learning workflows
b. Managing Kubernetes deployments
c. Discovering and protecting sensitive data
d. Optimizing cloud resource usage
Case studies
1. ABC Health pvc ltd, a healthcare provider, needed to migrate
its patient data management system to the cloud. Given the
sensitive nature of health data, the company was concerned
about complying with the HIPAA and ensuring the security
and privacy of patient information.
Challenge: Ensuring the protection of PHI.
Maintaining high availability and security in a cloud
environment.
Achieving compliance with HIPAA regulations.
2. XYZ Pay, a fintech company, faced challenges in securing its
online transaction platform against cyber threats while
complying with the Payment Card Industry Data Security
Standard (PCI-DSS).
Challenge:
a. Protecting sensitive credit card information.
b. Ensuring secure and continuous online transactions.

c. Meeting PCI-DSS compliance requirements.
3. TechCorp, 
a 
large 
enterprise 
with 
a 
cloud-native
infrastructure in GCP, encountered a security breach that
potentially compromised sensitive corporate data.
Challenge:
a. Identifying the extent and source of the breach rapidly.
b. Containing the breach to prevent further data loss.
c. Conducting a thorough forensic analysis to understand the
attack vectors.
Answer key
1. c. User access and permissions
2. b. Cloud Monitoring
3. b. To provide isolated network environments
4. c. HIPAA
5. b. To track user and administrator activities
6. b. Protection against DDoS attacks
7. a. Secure connection between on-premises networks and
GCP
8. b. Developing an incident response plan
9. b. Frequent compliance audits using GCP tools
10. c. Discovering and protecting sensitive data
Case studies
1. ABC implemented GCP’s IAM to control access to PHI,
ensuring that only authorized personnel could access sensitive
data. Utilized Google Cloud’s DLP API to automatically
discover, classify, and redact sensitive health data. Enabled
Cloud Audit Logs to maintain detailed records of access and
changes to PHI for compliance reporting and auditing. Set up
regular backups and disaster recovery protocols using GCP
services to ensure data availability and integrity.
2. XYA pay implemented Cloud Armor to protect against DDoS

---

## Sección 78: CHAPTER 8 [Entropy: 0.25]

attacks and other web-based threats. Utilized VPC and Cloud
VPN to create a secure and isolated network environment.
Enabled data encryption both, at rest and in transit to secure
credit card data. Leveraged Cloud Monitoring and Cloud
Logging for real-time security monitoring and incident
response.
3. TechCorp activated their incident response plan, specifically
tailored for their GCP environment. Used GCP’s Security
Command Center to quickly identify affected resources and
assess the impact. Leveraged Cloud Logging and Cloud Audit
Logs for detailed investigation and trace-back of the breach.
Implemented immediate containment measures, such as
isolating 
affected 
VMs 
and 
revoking 
suspicious 
IAM
permissions.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 79: CHAPTER 9 [Entropy: 0.415]

DevOps and Site
Reliability
Engineering
Introduction
DevOps and Site Reliability Engineering (SRE) have emerged as
essential methodologies for streamlining software development and
delivery. Google Cloud Platform (GCP) seamlessly integrates these
practices, enabling organizations to harness the agility and
scalability of cloud infrastructure while maintaining robust security
and operational excellence.
Structure
Following is the structure of the chapter:
• DevOps
• Site Reliability Engineering
Objectives
Want to build and deliver software faster and more reliably?
DevOps and Site Reliability Engineering (SRE) are two powerful
approaches that can help you achieve these goals. This chapter

explores how these practices work together within the Google Cloud
Platform (GCP) ecosystem. By exploring the practical applications of
these methodologies, readers will gain insights into how to
effectively leverage GCP's tools and services to foster a culture of
collaboration, automation, and continuous improvement.
By the end of this chapter, you'll have a comprehensive
understanding of how DevOps and SRE practices are implemented
in GCP. You will be equipped with the knowledge to utilize GCP
tools for building efficient CI/CD pipelines, ensuring system
reliability, and automating cloud infrastructure management, all
while adhering to best practices in DevOps and SRE.
DevOps
DevOps represents a transformative shift in the IT industry, merging
the practices of software Development (Dev) and IT Operations
(Ops). This approach emphasizes collaboration, automation,
continuous integration, and continuous delivery, with a focus on
reducing the software development life cycle and delivering high
software quality.
Background
The concept of DevOps gained traction in the past decade as a
response to the increasing need for agility and efficiency in software
development and deployment. The traditional siloed approach,
where developers and operations teams worked separately, often led
to bottlenecks, miscommunications, and delays in software releases.
With the advent of agile methodologies and the increasing demand
for faster, more reliable software delivery, DevOps emerged as a
solution to bridge the gap between development and operations. It
offered a unified framework where both teams collaborate closely
throughout the entire development lifecycle, from planning and
coding to testing, deployment, and operations.
Some key drivers behind the popularity of DevOps are as follows:
• Rapid technological advancements: The acceleration of
technological innovations necessitated a more agile and
responsive approach to software development.
• Shift to cloud computing: The rise of cloud computing

provided the ideal environment for DevOps practices, offering
scalability, flexibility, and a wide range of tools for
automation.
• Demand for faster go-to-market: In a highly competitive
market, businesses required faster development cycles to stay
ahead, driving the need for more streamlined operations.
• Focus on continuous improvement: DevOps aligns with the
philosophy of continuous improvement, leveraging feedback
and iterative processes to enhance software quality and
performance.
• Increased complexity of software applications: Modern
applications, 
often 
built 
as 
distributed 
systems 
and
microservices, require a more collaborative and integrated
approach to development and management.
DevOps has revolutionized how organizations develop and deploy
software. It has led to the rise of a culture that values automation,
continuous integration, and proactive monitoring, significantly
improving deployment frequency, reducing the failure rate of new
releases, and shortening the lead time between fixes. DevOps is not
just a set of practices; it's a cultural shift that encourages
collaboration, enhances efficiency, and fosters innovation in
software development.
As we continue, we will take a deeper look into how GCP facilitates
DevOps practices and explore the tools and techniques that enable
effective DevOps implementation in the cloud.
Cloud Source Repositories
Google Cloud Source Repositories provides fully-featured, scalable,
and private Git repositories hosted on GCP. It is designed to offer a
collaborative and secure environment for source code storage,
which is integral to any DevOps workflow.
Cloud Source Repositories offers several features, as follows:
• Fully managed Git repositories: Offers the familiarity of Git
with the scalability, performance, and security of GCP.
• Integration with other GCP services: Seamlessly integrates
with Cloud Build for CI/CD pipelines and Cloud Debugger for
real-time debugging.

• Access control and security: Supports Identity and Access
Management (IAM) for controlling access to repositories,
ensuring that only authorized users can modify the code.
• Source code mirroring: Allows mirroring of repositories from
GitHub or Bitbucket, enabling a hybrid approach to source
code management.
Following are the steps for setting up and using Cloud Source
Repositories:
1. Creating a new repository: Repositories can be created
through the GCP Console or using the gcloud command-line
tool. Example command to create a new repository:
sh
gcloud source repos create [REPO_NAME] 
2. Cloning and pushing code: After creating a repository, you
can clone it to your local machine, make changes, and push
these changes back to the repository. Cloning a repository:
sh
gcloud 
source 
repos 
clone 
[REPO_NAME]
[LOCAL_DIRECTORY] 
Standard Git commands (git add, git commit, git push) are
used to push changes to the repository.
3. Integration with IDEs: Cloud Source Repositories can be
integrated 
with 
popular 
Integrated 
Development
Environments (IDEs) like Visual Studio Code, IntelliJ, and
others for seamless development workflows.
Following is an example showcasing usage of Cloud Source
Repositories for a basic Git workflow:
sh
# Clone the repository 
gcloud source repos clone [REPO_NAME] [LOCAL_DIRECTORY] 
# Navigate into your project directory 
cd [LOCAL_DIRECTORY] 
# Make changes to your project, then commit and push 
git add . 
git commit -m "Your commit message"

---

## Sección 80: CHAPTER 9 [Entropy: 0.5]

git push origin master 
Following are the collaborative features:
• Code review and collaboration: Cloud Source Repositories
supports collaborative features like pull requests and code
reviews, similar to platforms like GitHub.
• Connected repositories: Set up automatic synchronization
between Cloud Source Repositories and other Git repositories
like GitHub or Bitbucket, keeping all your code aligned across
different platforms.
Continuous Integration and Delivery
CI/CD is a core principle of DevOps, promoting collaboration and
automation between development and operations teams. By
automating these processes, developers can focus on writing code,
while operations teams can ensure smooth and reliable
deployments.
Picture a software development assembly line. Code gets written,
tested, and deployed in a smooth, automated flow. This is the
essence of Continuous Integration and Continuous Delivery (CI/
CD), a cornerstone of DevOps. Let us break it down:
Following are the steps involved in Continuous Integration
(CI):
• Developers commit their code changes regularly to a shared
repository (e.g., Git).
• Upon each commit, an automated build process kicks in.
• This build process compiles the code, runs unit tests, and
identifies any errors or integration issues early on.
• The 
results 
are 
fed 
back 
to 
developers 
for 
quick
troubleshooting.
Following are the benefits of CI:
• Early detection of bugs: Frequent builds and testing catch
errors early in the development cycle, saving time and effort.
• Improved code quality: Consistent testing helps maintain a
high standard of code quality.
• Faster deployments: By ironing out issues early, deployments
become smoother and faster.

Following are the steps involved in Continuous Delivery (CD):
• Once the code passes CI tests, it's automatically packaged and
deployed to a staging environment.
• This staging environment mimics the production environment,
allowing for final testing and validation.
• If everything functions as expected, the code can be
automatically deployed to production.
Following are the benefits of CD:
• Faster time to market: New features and bug fixes can be
delivered to users quickly and efficiently.
• Reduced risk of errors: Testing in a staging environment
minimizes the chance of introducing problems to production.
• Increased reliability: Frequent deployments allow for
quicker identification and rollback of any issues that might
slip through.
Cloud Build
Google Cloud Build is a serverless Continuous Integration (CI) and
Continuous Delivery (CD) platform that empowers developers to
automate the process of building, testing, and deploying software. It
is fully managed and scales automatically, making it easy to use and
maintain. Cloud Build can be used to build and deploy applications
to a variety of platforms, including Google Kubernetes Engine
(GKE), Google App Engine, and Google Cloud Run.
Cloud Build has a number of key features that make it a powerful
and versatile CI/CD platform as follows:
• Serverless: Cloud Build is a serverless platform, which means
that there is no infrastructure to set up or manage. Cloud
Build scales automatically based on demand, so you only pay
for the resources you use.
• Fully managed: Cloud Build is a fully managed service, which
means that Google takes care of all the infrastructure and
maintenance. You can focus on building and deploying your
applications, without having to worry about managing the
underlying infrastructure.
• Scalable: Cloud Build can scale to handle large workloads. It
can build and deploy applications to thousands of machines in

parallel.
• Flexible: Cloud Build can be used to build and deploy
applications to a variety of platforms, including GKE, Google
App Engine, and Google Cloud Run.
• Secure: Cloud Build is a secure platform that integrates with
Google Cloud's security infrastructure. You can use Cloud
Build to build and deploy applications that are compliant with
a variety of security standards.
Using Cloud Build offers several benefits as follows:
• Increased agility: Cloud Build can help you to increase your
agility by automating the process of building, testing, and
deploying your applications. This can help you to get new
features to your users faster.
• Reduced costs: Cloud Build is a cost-effective solution
because you only pay for the resources you use. There are no
upfront costs or long-term contracts.
• Improved quality: Cloud Build can help you to improve the
quality of your applications by automating the process of
testing and deploying your applications. This can help you to
catch bugs and errors early on.
• Reduced risk: Cloud Build can help you to reduce the risk of
downtime and outages by automating the process of deploying
your applications. This can help you to ensure that your
applications are always available to your users.
Cloud Build supports building and deploying applications from
various sources, including source code repositories, cloud storage
buckets, and Dockerfiles. It can also be triggered by events like code
changes, cron jobs, or manual actions.
To use Cloud Build, you'll need to create a build configuration file.
This file defines the steps that Cloud Build should take to build and
deploy your application. The build configuration file can be written
in YAML or JSON.
Once you have created a build configuration file, trigger a build by
running the gcloud builds submit command. Cloud Build will then
execute the steps defined in the build configuration file and deploy
your application to the specified target environment.
Setting up a basic CI/CD pipeline

Following are the steps for setting up a basic CI/CD pipeline:
1. Create a build configuration file:
• This YAML or JSON file, usually named
cloudbuild.yaml, contains instructions for Cloud Build.
• Example: cloudbuild.yaml for a simple Java application:
steps: 
- name: 'gcr.io/cloud-builders/mvn' 
 args: ['package'] 
- name: 'gcr.io/cloud-builders/docker' 
 args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-app', '.'] 
images: 
- 'gcr.io/$PROJECT_ID/my-app'
2. Triggering builds:
• You can trigger builds automatically by linking Cloud
Build to a source repository like GitHub or Cloud Source
Repositories.
• When code is pushed to the repository, Cloud Build will
automatically start the build process as defined in the
cloudbuild.yaml file.
3. Building a Docker image:
• Cloud Build allows you to build Docker images and push
them to Container Registry or Artifact Registry.
• A step in cloudbuild.yaml can be configured to build
and push an image using the gcr.io/cloud-builders/
docker builder.
4. Deploying to GCP Services:
• After a successful build, you can deploy your application
to services like App Engine, Cloud Run, or Kubernetes
Engine directly from Cloud Build.
Let us consider a scenario where you need to build a Docker image
and push it to Google Container Registry:
yaml
steps: 
- name: 'gcr.io/cloud-builders/docker' 
 args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-app-image', '.'] 
- name: 'gcr.io/cloud-builders/docker' 
 args: ['push', 'gcr.io/$PROJECT_ID/my-app-image']

---

## Sección 81: CHAPTER 9 [Entropy: 0.5]

images: 
- 'gcr.io/$PROJECT_ID/my-app-image'  
Integrating with Source Repositories as follows:
• GitHub integration:
○ You can connect Cloud Build to a GitHub repository to
automatically trigger builds on code commits.
○ This integration requires setting up a trigger in the Cloud
Build console and selecting the repository and branch to
watch.
• Cloud Source Repositories integration:
○ Similar to GitHub, you can connect Cloud Build with Cloud
Source Repositories for automated builds.
• Monitoring builds:
○ You can monitor the progress of your builds directly in the
Cloud Build console.
○ Detailed logs provide insights into each step of the build
process.
Figure 9.1: Creating a new trigger in Cloud-build
Containerization

Containerization empowers DevOps teams to accelerate
development cycles, achieve more reliable deployments, and
efficient resource utilization. It's a powerful technology that breaks
down silos between development and operations, fostering a
collaborative and agile software delivery process.
Imagine a world where your applications run seamlessly across any
environment, from your local development machine to a sprawling
production cluster. That is the power of containerization, a key
technology in the DevOps world.
Following is what a container is:
Think of a container as a self-contained unit that packages your
application's code, configurations, and dependencies—like a
shipping container for your software. It's like a shipping container
for your software, ensuring it runs identically anywhere it goes.
Containers share the underlying operating system of the host
machine but isolate themselves from each other, preventing
conflicts.
Following is why containers are ideal for DevOps:
• Portability: Containers are lightweight and self-contained,
making them easy to move between development, testing, and
production environments. This ensures consistent behavior
regardless of the underlying infrastructure.
• Isolation: Applications running in containers are isolated
from each other, preventing conflicts and ensuring predictable
behavior. This is crucial for maintaining a stable and reliable
software delivery pipeline.
• Scalability: Since containers are lightweight, you can easily
spin up or down additional instances of your application based
on demand. This allows for elastic scaling to meet fluctuating
user traffic.
• Faster deployments: Containerized applications are prepackaged and ready to run, significantly speeding up
deployments compared to traditional methods.
Following are the benefits for DevOps teams:
• Streamlined development workflow: Developers can focus
on writing code without worrying about environment
inconsistencies.

• Simplified testing: Testing becomes more efficient and
reliable with consistent environments across stages.
• Faster deployments: Containerized applications can be
deployed quickly and reliably, accelerating the release cycle.
• Improved resource utilization: Containers are efficient and
require fewer resources compared to virtual machines, leading
to cost savings.
In the context of DevOps on GCP, two crucial services serve as
repositories for your application's building blocks: Container
Registry and Artifact Registry.
Container Registry and Artifact Registry
Container Registry is a service dedicated to storing and managing
container images. It is a fully managed service that scales
automatically based on your needs. Container Registry offers the
following:
• Secure storage for container images: Container Registry
encrypts container images at rest and in transit. It also
supports a variety of access control mechanisms to control
who can access your images.
• Version control for container images: Container Registry
supports version control for container images. This allows you
to track changes to your images and roll back to previous
versions if necessary.
• Replication for container images: Container Registry can
replicate container images to multiple regions. This can
improve the performance of your applications by reducing the
latency of accessing images.
Let us say you want to use Container Registry to store and manage a
container image for a simple web application. Following are the
steps:
1. Build the container image:
a. Create a Dockerfile that defines the steps to build the
container image. For example, the following Dockerfile
builds a container image for a simple web application
that runs on Node.js:
FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]  
b. To build the container image, run the following
command:
docker build -t my-web-app . 
This will create a container image named my-web-app.
2. Push the container image to Container Registry:
a. To push the container image to Container Registry, run
the following command:
gcloud docker -- push gcr.io/[PROJECT_ID]/myweb-app
This will push the my-web-app image to the gcr.io/
[PROJECT_ID] repository.
3. To deploy your container image to a Kubernetes cluster, you
will first need to ensure you have access to the cluster and
have 
configured 
your 
kubectl 
command-line 
tool 
to
communicate with it. Once you have established the
connection, you can use the following command to deploy
your application:
kubectl apply -f deployment.yaml
This will create a Kubernetes deployment that will run the my-webapp container image.
The following code snippets demonstrate how to create a
Kubernetes deployment file deployment.yaml for deploying the
my-web-app container image:
apiVersion: apps/v1
kind: Deployment
metadata:
 name: my-web-app-deployment
spec:

replicas:3
selector:
matchLabels:
app:
my-web-app
template:
metadata: 
labels:
app:my-web-app
spec:
containers: 
-
name:
my-web-app
image: gcr.io/[PROJECT_ID]/my-web-app
 ports:
 - containerPort: 3000
This deployment will create three replicas of the my-web-app pod,
each running the my-web-app container image.
Note: The Google Container Registry (GCR) will be discontinued after March 1
To ensure future compatibility, consider migrating your container images to A
Registry, the recommended service for container image storage and managem
GCP.
Artifact Registry is a service for storing and managing a wider range
of artifacts, including container images, Maven packages, and npm
packages. It is a more general-purpose service than Container
Registry and can be used to manage a variety of artifacts in a single
location. Artifact Registry provides, as follows:
• Support for a wider range of artifacts: Artifact Registry
supports a wider range of artifacts than Container Registry.
This makes it a good choice for organizations that use a
variety of different development tools and languages.
• Repository-level access control: Artifact Registry supports

---

## Sección 82: CHAPTER 9 [Entropy: 0.765]

repository-level access control. This allows you to control who
can access specific repositories in your registry.
• Hosting artifacts in regions: Artifact Registry allows you to
host artifacts in specific regions. This can help you to comply
with data residency requirements.
Following are the steps on how to use Artifact Registry to store and
manage a Maven package for a sample Java application named myjava-app:
1. Open the root directory of your java app my-java-app
2. Build the Maven package: Create a Maven project and build
the Maven package using the Maven command-line
interface (CLI). The following command builds the JAR file
for a sample Java application:
mvn clean package 
This will create a JAR file named target/my-javaapp-1.0.0-SNAPSHOT.jar.
3. Upload the Maven package to Artifact Registry:
a. To upload the Maven package to Artifact Registry, run
the following command:
mvn 
deploy 
-DdeploymentRepository=https://uswest1-maven.pkg.dev/[PROJECT_ID]/my-maven-repo
This will upload the my-java-app-1.0.0-SNAPSHOT.jar JAR
file to the my-maven-repo repository in the us-west1 region of
Artifact Registry.
4. Use the Maven package in another project:
To use the Maven package in another project, add the Artifact
Registry repository to your project's pom.xml file. For example, the
following pom.xml file adds the my-maven-repo repository to a
project:
XML
<repositories>
 <repository>
 <id>my-maven-repo</id>
 <url>https://us-west1-maven.pkg.dev/[PROJECT_ID]/my-maven-

repo</url>
 </repository>
</repositories>
Once the repository is added, you can use the Maven dependency
management system to add the my-java-app dependency to your
project:
XML
<dependency>
 <groupId>[GROUP_ID]</groupId>
 <artifactId>my-java-app</artifactId>
 <version>1.0.0-SNAPSHOT</version>
</dependency>
This will add the my-java-app dependency to your project and allow
you to use the classes and methods in the JAR file.
Following server should be used:
The best service for you will depend on your specific needs. If you
only need to store and manage container images, then Container
Registry is a good choice. If you need to store and manage a wider
range of artifacts, then Artifact Registry is a better choice.
Following is a table that summarizes the key differences between
Container Registry and Artifact Registry:
Feature
Container Registry
Artifact Registry
Supported artifacts
Container images
Container 
images, 
Maven 
p
packages, and other artifacts
Access control
Global access control
Repository-level access control
Region support
Multi-region
Deployment methods
Deployment methods in DevOps are strategies used to deliver
applications and services efficiently and reliably to end users. These
methods are designed to reduce downtime, mitigate risks, and

ensure a consistent and smooth deployment process.
Following are some of the popular deployment methods used in
DevOps.
• Blue/Green deployment: Blue/Green deployment involves
two identical environments: one Blue (active production
environment) and one Green (new version to be deployed).
The new version is deployed to the Green environment and
thoroughly tested. Once verified, traffic is switched from the
Blue environment to the Green environment, often using a
load balancer.
Following are the benefits:
• Minimizes downtime and risk as the switch can be almost
instantaneous.
• Facilitates easy rollback, as the Blue environment is kept as a
backup.
Considerations: Increased code due to double environments.
• Canary deployment: In Canary deployment, the new version
is rolled out to a small subset of users before a full rollout.
Based on the feedback and performance, the new version is
gradually rolled out to more users.
Following are the benefits:
• Reduces the impact of any issues as only a small subset of
users are exposed initially.
• Useful for testing in a real-world setting.
Considerations: Requires careful monitoring and quick response to
issues.
• Rolling deployment: The new version of an application is
rolled out to a small subset of production servers first. Once
the new version is verified to be working correctly on the
subset of servers, it is rolled out to the remaining servers in a
gradual manner. This strategy helps to minimize downtime
and risk, as only a small portion of the production
environment is affected at any given time. The application is
deployed in stages, with each stage replacing a part of the old
version.
Following are the benefits:

• Ensures continuous availability as there is no complete
shutdown.
• Less risky compared to an all-at-once deployment.
 Considerations: May take longer to complete the deployment
process.
• A/B Testing: A/B testing is not just a deployment strategy but
a way to test two or more versions of an application
simultaneously. Traffic is split between different versions, and
metrics are collected to determine which version performs
better.
Following are the benefits:
• Provides valuable insights into user preferences and behavior.
• Helps in making data-driven decisions about the product
features.
Considerations: Requires robust analytics and monitoring tools.
DevOps operations leveraging GCP
Following are the DevOps operations:
• Microservices Architecture: GCP facilitates the deployment
of 
microservices 
architectures, 
offering 
services 
like
Kubernetes Engine (GKE) which is ideal for managing
containerized applications. Microservices in GCP can be
independently deployed, managed, and scaled, aligning with
DevOps goals of agility and scalability.
• Serverless Computing: GCP’s serverless products like Cloud
Functions and Cloud Run allow developers to focus on writing
code without worrying about the underlying infrastructure.
These 
solutions 
automate 
operational 
tasks, 
such 
as
infrastructure provisioning, configuration, and scaling.
• Infrastructure as Code (IaC): Cloud Deployment Manager or
Terraform can be used within GCP to practice Infrastructure as
Code, allowing teams to automate the setup and deployment
of infrastructure using configuration files. IaC promotes
consistent and repeatable deployment processes, a key tenet of
DevOps.
• Monitoring and Logging: Cloud Monitoring and Cloud
Logging provide detailed insights into application and
infrastructure performance. These tools are essential for

---

## Sección 83: CHAPTER 9 [Entropy: 0.5]

proactive monitoring, helping DevOps teams quickly identify
and respond to issues.
• API 
management 
with 
Apigee: 
Apigee, 
GCP’s 
API
management platform, enables developers to design, secure,
deploy, monitor, and scale APIs. This aligns with DevOps
practices by facilitating smoother collaboration between frontend and back-end development teams.
Site Reliability Engineering
SRE is a discipline that incorporates aspects of software engineering
and applies them to infrastructure and operations problems. The
main goals of SRE are to create scalable and highly reliable software
systems. Originating from Google, SRE is considered a vital practice
for maintaining large-scale systems in cloud environments like GCP.
Role of SRE
SRE is a discipline that arose from the challenges of building and
operating increasingly complex and distributed software systems.
SREs are responsible for ensuring that these systems are reliable,
scalable, and performant.
SRE complements DevOps by introducing specific practices focused
on reliability and stability. While DevOps bridges the gap between
development and operations, SRE focuses on balancing the need for
new features (change) with the importance of system stability.
Following are the core principles of SRE:
• Reliability as a feature: Treating reliability as a key
component of the service that needs to be engineered and
maintained.
• Error budgets and risk management: Defining acceptable
levels of risk and downtime (error budgets) to balance new
releases with system stability.
• Automation: Automating repetitive tasks to focus on highvalue activities and reduce human error.
• Performance metrics and monitoring: Using performance
metrics to monitor and improve system reliability.
SREs actively participate in various stages of the DevOps lifecycle,
from planning and development to deployment and operations.

They bring a focus on scalability, automation, and reliability to each
phase, ensuring that systems are both feature-rich and stable.
Fun fact:
Blameless Postmortems: A key aspect of Google SRE culture is
conducting blameless post mortems. This practice involves
analyzing incidents without assigning blame, focusing instead on
learning from failures and preventing future recurrences. It fosters a
culture of transparency and continuous improvement.
SRE practices
SRE is a methodology that bridges the gap between development
and operations. In GCP, SRE practices empower you to build and
maintain highly reliable and scalable cloud applications. Following
are some key principles:
• [Always Be Prepared] Incident management: Robust
incident 
response 
protocols 
are 
essential. 
By 
quickly
identifying, addressing, and learning from system failures, you
minimize downtime and ensure service continuity.
• [Measure What Matters] SLOs and SLIs: Define clear
Service Level Objectives (SLOs) that represent the desired
performance and availability of your services. Track these
SLOs using Service Level Indicators (SLIs) - measurable
metrics that reflect how well you are meeting your objectives.
This data-driven approach allows you to proactively identify
and address potential issues.
• [Rightsizing Your Cloud] Capacity planning: Don't be
caught off guard by unexpected spikes in demand! Leverage
data-driven approaches to predict future resource needs. By
proactively scaling your GCP resources up or down, you
optimize costs and ensure your applications have the resources
they need to perform optimally.
• [Change with Confidence] Change management: In a fastpaced cloud environment, striking a balance between
implementing new features and maintaining system stability is
crucial. Effective change management practices minimize the
risk of disruptions by carefully planning, testing, and
deploying changes.
Following is a roadmap of essential best practices specifically

tailored to the GCP environment, empowering you to excel in
building and maintaining highly reliable, scalable cloud
applications:
• Define and track SLOs: SLOs are a way to define the desired
performance and availability of a service. They should be
based on user needs and should be measurable and
achievable. SREs should track SLOs over time and take action
if they are not being met.
• Define and track SLIs: SLIs are quantifiable measures of the
performance and availability of a service. They should be
aligned with SLOs and should be tracked over time to identify
trends and patterns. SREs should use SLIs to measure the
progress of their initiatives and to identify areas for
improvement.
• Automate toil: Toil is repetitive, manual work that can be
automated. SREs should automate as much of their work as
possible to free up their time to focus on more strategic work.
This can include automating tasks such as provisioning
infrastructure, deploying software, and responding to alerts.
• Monitor everything: SREs should monitor their services
closely to detect and respond to problems quickly. This
includes monitoring metrics such as latency, error rates, and
throughput. SREs should also set alerts for critical metrics so
that they are notified immediately if there is a problem.
• Release engineering: SREs should be responsible for
releasing new software versions to production. This includes
planning releases, deploying software, and monitoring for
problems after deployment. SREs should also work with
developers to ensure that new features are released in a
reliable and scalable way.
• Blameless postmortems: When a problem occurs, SREs
should conduct a blameless postmortem to identify the root
cause of the problem and prevent it from happening again.
Blameless postmortems should focus on learning from the
incident and improving the system, not on assigning blame.
• Continuous learning: SREs should be constantly learning and
evolving their practices. This includes keeping up with new
technologies, learning from other SREs, and attending
conferences and workshops.
• Build a culture of reliability: SREs should foster a culture of

---

## Sección 84: CHAPTER 9 [Entropy: 0.766]

reliability within their team. This means that everyone on the
team should be committed to building and operating reliable
software.
• Be proactive: SREs should not wait for problems to happen
before they take action. They should be proactive in
identifying and addressing potential problems before they
cause outages or performance degradation.
• Be data-driven: SREs should use data to inform their
decisions. This means that they should track metrics, analyze
data, and use data to identify trends and patterns.
• Be collaborative: SREs should work collaboratively with
other teams such as development, operations, and product
management. This helps to ensure that everyone is on the
same page and that problems are resolved quickly and
effectively.
These best practices can help SREs to build and operate reliable,
scalable, and performant software systems on GCP. By following
these practices, SREs can help to ensure that their services are
available to users when they need them and that they perform well.
SRE operations on GCP
Let us explore some practical SRE operations on GCP to illustrate
how various SRE operations can be accomplished. Following are the
examples:
• Example one: Let us assume you want to create a custom
monitoring dashboard and set up alerts for a specific metric ,
for example, CPU usage of a Compute Engine instance.
Following are the steps involved to achieve this objective on
GCP:
1. Choosing your metric:
a. Identify the metric: First, pinpoint the metric you want
to monitor. In our example, we'll focus on CPU usage.
b. Leveraging Cloud Monitoring: Cloud Monitoring offers
two options: you can either create a custom metric for
specific needs or select an existing pre-defined metric like
CPU usage.

2. Building your dashboard:
a. Navigate to Cloud Monitoring: Head over to the Cloud
Monitoring section within the GCP Console.
b. Create your dashboard: Create a new dashboard and
personalize it by adding a dedicated chart to visualize
your chosen CPU usage metric.
Tip: [Automating with the gcloud CLI] For those comfortable with
Following is an example gcloud CLI command to create a dashboar
gcloud monitoring dashboards create --config-from-file=my-dashbo
3. Enabling alerts for proactive action: While monitoring
dashboards provide real-time insights, consider setting up
alert policies for proactive notifications. Following is how:
a. Define alert conditions: Establish a clear trigger for the
alert. For instance, you might choose to be notified if
CPU usage exceeds 80% for a sustained period (e.g., five
minutes).
b. Choose your notification channels: Select how you
want to receive alerts. GCP offers options like email,
SMS, or integration with your preferred messaging
service.
For those interested in exploring the specifics of alert policy
configuration
Following an example configuration snippet:
type: gcp#monitoring#alertPolicy 
displayName: High CPU Usage Alert 
conditions: 
 - displayName: CPU usage condition 
 conditionThreshold: 
 filter: metric.type="compute.googleapis.com/instance/cpu/
utilization" 
 aggregations: 
 - alignmentPeriod: 60s 

 perSeriesAligner: ALIGN_MEAN 
 comparison: COMPARISON_GT 
 thresholdValue: 0.8 
 duration: 300s 
notificationChannels: 
 - [NOTIFICATION_CHANNEL_ID] 
• Example 
two: 
Next 
you 
want 
to 
automate 
release
engineering. You may want to automate the deployment of
new software versions in production. You can use Cloud Build
and Cloud Deployment Manager to accomplish it. This can
help you reduce the risk of downtime and ensure that new
features are released quickly and reliably, as follows:
pipeline:
 agent:
 image: gcr.io/cloud-builders/gcloud
 stages:
 - name: build
 steps:
 - name: 'Build the application'
 id: build
 args: ['gcloud', 'build', '-t', 'my-image-name', '.']
 - name: deploy
 steps:
 - name: 'Deploy the application'
 id: deploy
 args: ['gcloud', 'deploy', '-f', 'deployment.yaml', '-t', 'myimage-name'] 
This YAML file defines a Cloud Build pipeline that builds and
deploys an application. You can use this code as a starting point to
automate the deployment of your applications.
Tip: Automate toil: You can use Cloud Functions to automate tasks such as
provisioning infrastructure, deploying software, and responding to alerts. Th
help you free up your time to focus on more strategic work.
Example:

import google.cloud.functions as functions
 
def provision_infrastructure(request, context):
 # Provision infrastructure here
 print('Provisioning infrastructure...')
 
client = functions.Client()
func = client.function('provision-infrastructure')
func.call()
This Python code defines a Google Cloud Function that automates the
provisioning of infrastructure. You can use this code as a starting point
to automate other tasks.
Example 3: Once your custom monitoring and alerts are in place.
Let us assume you want to automatically restart a Compute Engine
instance when a specific log message is detected. Following are the
steps:
1. Identifying the restart trigger: The first step is to pinpoint
the specific log message that signifies the need for a restart.
This could be a particular error message or a warning
indicating instability.
2. Creating a Cloud Function for action: Here's where Cloud
Functions come in. You'll write a Cloud Function in Python
programmed to trigger upon detecting the designated log
message.
a. Leveraging the Compute Engine API: Within the Cloud
Function, you'll utilize the Compute Engine API to
initiate a restart of the specific Compute Engine instance.
 Following is an example Cloud Function snippet:
from googleapiclient import discovery 
def restart_instance(event, context): 
 project = 'my-gcp-project'
 zone = 'us-central1-a'

 instance = 'my-instance'
 service = discovery.build('compute', 'v1') 
 request = service.instances().reset(project=project,
zone=zone, instance=instance)
 request.execute() 
3. Deploy the function using the gcloud CLI or the GCP Console.
4. Configure it to trigger log entries matching the specified
criteria.
Example 4: Despite implementing custom monitoring and alerts,
automated software releases, and incident response procedures, an
unexpected outage disrupted your business-critical applications.
This incident highlighted the importance of conducting blameless
postmortems to uncover root causes, prevent future occurrences,
and foster a culture of continuous improvement.
Let us say, the outage lasted for approximately 30 minutes, affecting
a significant portion of the user base. During this time, users were
unable to access critical applications, resulting in a loss of
productivity and customer dissatisfaction. The incident also
triggered a cascade of events, impacting other systems and services
that relied on the affected applications.
Blameless postmortems
A blameless postmortem is a structured approach to analyzing an
incident without assigning blame. This approach encourages open
and honest discussions, allowing team members to focus on
identifying root causes and implement ting preventive measures.
Following is how to conduct a Blameless Postmortem:
• Gather data:
○ Collect relevant logs from Cloud Logging and error reports
from applications.
○ Analyze metrics from Cloud Monitoring to identify any
anomalies or performance degradation.
○ Gather data from any other relevant systems, such as
firewalls, load balancers, and network monitoring tools.
• Conduct analysis:

---

## Sección 85: CHAPTER 9 [Entropy: 0.34]

○ Form 
a 
cross-functional 
team 
involving
engineers, operations personnel, and product managers.
○ Review the collected data chronologically to identify the
sequence of events leading up to the outage.
○ Analyze patterns and trends to pinpoint the root cause of
the incident.
○ Encourage open communication and collaboration among
team members.
• Document and share findings:
○ Prepare a detailed incident report that includes a timeline
of events, root cause analysis, impact assessment, and
action items.
○ Share the report with the team and relevant stakeholders to
ensure transparency and accountability.
○ Use 
the 
findings 
to 
update 
documentation, training
materials, and processes.
• Implement improvements:
○ Prioritize action items based on their potential impact and
feasibility.
○ Implement improvements such as updating alerting
thresholds, modifying deployment processes, or introducing
new monitoring tools.
○ Regularly review and update incident response procedures
to incorporate lessons learned from past incidents.
During the postmortem analysis, it was discovered that the alerting
thresholds for CPU utilization were not sensitive enough to trigger
an alert before the outage occurred. This allowed the system to
continue operating under excessive load until it eventually crashed.
To address this issue, the team updated the alerting thresholds to a
more appropriate level. This change will help to identify potential
problems early on and prevent similar outages from happening in
the future.
Fostering culture of Continuous Improvement
Blameless postmortems play a crucial role in fostering a culture of
continuous improvement within an SRE team. By encouraging open

communication, shared ownership, and a focus on learning from
mistakes, blameless postmortems help to prevent future incidents
and ensure the reliability and performance of critical systems.
These are just a few examples of how to perform SRE operations on
GCP. There are many other tools and techniques that you can use to
improve the reliability, scalability, and performance of your GCP
applications.
Conclusion
This chapter explored the synergy between DevOps and SRE on
GCP. We discussed core principles, practices, and the essential GCP
tools that empower your journey.
DevOps practices like CI/CD pipelines and containerization
streamline development and delivery, while SRE principles ensure
robust and scalable infrastructure. By adhering to best practices in
both, you cultivate a collaborative, automated, and continuously
improving environment.
In the next chapter, we will discuss various tools and techniques to
plan for High Availability and Disaster Recovery.
Multiple choice questions
1. What does Google Cloud Build primarily facilitate in
DevOps?
a. Data Analysis
b. Continuous Integration and Continuous Delivery
c. User Authentication
d. Network Configuration
2. In the context of IaC, which GCP service is used to
automate the creation and management of resources?
a. Google Kubernetes Engine
b. Cloud Deployment Manager
c. Cloud Functions

d. BigQuery
3. Which GCP service is central to containerization and
managing containerized applications?
a. Cloud SQL
b. GKE or Cloud Run
c. Cloud Storage
d. Cloud Pub/Sub
4. Observability in GCP DevOps is best achieved using
which of the following tools?
a. Cloud SQL
b. Cloud Build
c. Cloud Monitoring and Cloud Logging
d. Cloud IAM
5. Which practice in DevOps focuses on automating
repetitive tasks to increase efficiency?
a. Continuous Testing
b. Version Control
c. Automation
d. Code Review
6. What is the primary role of SRE in DevOps?
a. To manage software releases
b. To focus exclusively on system security
c. To maintain high system reliability
d. To automate marketing strategies
7. An essential principle of Reliability Engineering is:
a. Quick software delivery

b. High fault tolerance and system stability
c. Frequent change management
d. Emphasis on software aesthetics
8. In the DevOps lifecycle, SRE practices are crucial during:
a. Only the planning phase
b. Only the deployment phase
c. All phases of the lifecycle
d. Only after the product release
Case studies
1. ABC Tech, a leading provider of cloud-based enterprise
software, faced challenges with traditional development and
operations (DevOps) processes, leading to slow-release
cycles, high operational costs, and reduced agility. To address
these issues, ABC Tech embarked on a journey to modernize
its DevOps practices and leverage the power of GCP.
Following are key challenges faced by ABC Tech:
○ Silos between development and operations teams hindered
collaboration and slowed down the release process.
○ Manual deployment processes increased the risk of errors
and inconsistencies.
○ Lack of visibility into infrastructure health made it difficult
to identify and resolve issues proactively.
2. Retail Giant, a rapidly growing e-commerce platform, faced
challenges in scaling its infrastructure to meet increasing
demand and ensuring the reliability of its platform during
peak periods. To address these challenges, Retail Giant
implemented SRE practices on GCP, leveraging its scalability
and reliability capabilities. Retail giant is facing the following
key challenges:
○ Sudden spikes in traffic during peak shopping seasons
overwhelmed 
the 
existing 
infrastructure, leading 
to

performance degradation and outages.
○ Manual scaling processes were slow and reactive, making it
difficult to adapt to fluctuating demand.
○ Lack of automated alerting and incident response
mechanisms hindered the ability to quickly identify and
resolve problems.
Answer key
1. b. Continuous Integration and Continuous Delivery
2. b. Cloud Deployment Manager
3. b. GKE or Cloud Run
4. c. Cloud Monitoring and Cloud Logging
5. c. Automation
6. c. To maintain high system reliability
7. b. High fault tolerance and system stability
8. c. All phases of the lifecycle
Case studies
1. ABC Tech implemented a DevOps approach powered by GCP,
incorporating tools like Google Cloud Build, Google Cloud
Deployment Manager, and Stackdriver Monitoring.
• Automated deployment: Google Cloud Build automated
the software build process, ensuring consistent and
repeatable deployments.
• Infrastructure as Code: Google Cloud Deployment
Manager enabled infrastructure provisioning and
management via code, eliminating manual
configurations.
• Proactive monitoring: Stackdriver Monitoring provided
real-time visibility into infrastructure health, enabling
proactive problem detection and resolution.
2. Retail Giant adopted SRE principles and implemented a
scalable and reliable e-commerce platform on GCP, utilizing
tools like GKE, Cloud Load Balancing, and Cloud Monitoring.
• Containerized infrastructure: GKE provided a scalable
and containerized infrastructure, enabling efficient

---

## Sección 86: CHAPTER 9 [Entropy: 0.28]

resource utilization and rapid scaling.
• Automated load balancing: Cloud Load Balancing
automatically distributed traffic across multiple
instances, ensuring optimal performance during hightraffic periods.
• Proactive monitoring and alerting: Cloud Monitoring
provided real-time insights into infrastructure health and
performance, triggering automated alerts and incident
response mechanisms.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 87: CHAPTER 10 [Entropy: 0.52]

High Availability and
Disaster Recovery
Introduction
Want to ensure your applications stay up and running, even in the
face of unexpected disruptions? In today's always-on world, system
resilience is no longer a luxury—it's a necessity. This chapter equips
you with the knowledge and tools to build robust and resilient
systems on Google Cloud Platform (GCP). We'll delve into the
intricacies of high availability (HA) and disaster recovery (DR),
exploring strategies like regional replication, multi-cloud
deployments, and backup and recovery solutions.
Whether you are a developer, an operations professional, or anyone
invested in the smooth operation of your GCP environment, this
chapter empowers you to safeguard your applications and ensure
continuous uptime for your users. With the increasing reliance on
cloud services, understanding how to design systems that are both
resilient and capable of recovering from disasters is essential.
Structure
Following is the structure of the chapter:
• GCP regions and zones
• Load balancing and auto scaling for high availability

• Data replication and synchronization techniques
• Backup and disaster recovery
• Designing resilient architectures in GCP
Objectives
By the end of this chapter, readers should be able to confidently
design and manage systems in GCP that not only meet the HA
requirements but are also capable of recovering swiftly and
effectively from unforeseen disasters. This knowledge will be
instrumental in ensuring that the systems and services are reliable,
resilient, and consistently available to meet business needs and
customer expectations in the cloud.
With this objective in mind, let us begin our exploration into the
world of HA and DR in GCP.
GCP regions and zones
While planning for DR and HA, understanding the intricacies of
regions and zones is crucial. It is not just a geographical
consideration, it is a strategic decision that can significantly impact
your application's performance, compliance, and cost-efficiency.
Following are some key concepts:
• Regions: Selecting a region in GCP is like choosing the ideal
location for a business. Each region has its unique attributes,
affecting factors such as latency, service availability, and
pricing. For example, if your target audience is primarily in
Europe, choosing a European region would be optimal for
reducing 
latency 
and 
aligning 
with 
data 
residency
requirements.
• Zones: Think of zones as your resilience strategy within a
region. Distributing your resources across multiple zones is
akin to implementing a robust defense mechanism for your
applications. It is a proactive approach to maintaining
continuous service availability, even in the face of partial
failures.
Some fun facts regarding GCP regions and zones are as follows:
• Global footprint: GCP's global footprint is vast, with more

than 40 regions spread across the Americas, Europe, Asia, and
Australia, offering a global network that reduces latency and
improves performance for users worldwide.
• Sustainability goals: Many GCP regions utilize renewable
energy sources, aligning with Google's commitment to
sustainability. This means that the applications you deploy in
these regions are not only efficient but also environmentally
conscious.
• Home of innovation: The europe-west1 region, located in
Belgium, was one of the first to use an advanced cooling
system using seawater, showcasing Google’s innovative
approach to data center cooling and energy efficiency.
• Disaster-resilient design: Some regions are strategically
located to be less susceptible to natural disasters. For example,
the us-central1 region in Iowa benefits from a geographic
location that is generally safe from major natural disasters,
offering a stable environment for critical workloads.
Trivia
Which Google region runs on 100% carbon free energy?
a. europe-west-1 (Belgium)
b. us-central-1 (Iowa)
c. asia-south1 (Mumbai)
d. northamerica-northeast1 (Montréal)
Answer: d. Northamerica-northeast1 (Montreal)
Applying concepts
Now that you understand the concepts of regions and zones in GCP,
following are how they translate into real-world scenarios:
• Achieving HA: Your journey through GCP's regions and zones
is about finding the right balance between performance and
reliability. By deploying across multiple zones, you create a
high-availability environment, much like having backup
systems in place for critical operations.
• Disaster recovery across regions: For more critical
applications, consider deploying across multiple regions. This
strategy is your contingency plan against regional disruptions.
It is analogous to having backup operational sites ready to

take over when needed.
Implementing resilient infrastructure
Having established a strong understanding of regions and zones,
let's now explore specific strategies for implementing a resilient
infrastructure on GCP. This section delves into the core principles of
designing resilient architectures. By embracing these principles, you
can craft fault-tolerant, scalable, and always-on IT systems that can
weather any storm and deliver exceptional performance.
Following are the key design principles for you to consider:
Redundancy
Imagine a meticulously designed building, no single point of failure,
multiple support structures, and a foundation built to withstand
even the most extreme weather conditions. Redundancy in GCP
serves the same purpose for your IT infrastructure. It is the strategic
placement of duplicate components to create a safety net against
potential failures.
Following is how redundancy manifests in GCP:
• Storage redundancy: Think of your data as the blueprints for
your building. Data redundancy replicates this critical
information across multiple storage zones or regions. This
ensures that even if a single zone encounters an outage, your
data remains readily available, preventing disruptions to your
applications and operations.
• Virtual machine redundancy: Just like having multiple
support structures for your building, virtual machine
redundancy 
ensures 
service 
continuity. 
By 
deploying
redundant VMs across zones or regions, you create backups
that can automatically take over if a primary VM fails. This
eliminates downtime and guarantees that your applications
remain accessible to users.
• Network redundancy: Imagine multiple pathways leading to
your building – this is the essence of network redundancy. By
utilizing multiple network paths within GCP, you safeguard
your infrastructure against network disruptions. If a single
path encounters an issue, traffic can seamlessly reroute to the
healthy paths, ensuring uninterrupted connectivity for your

---

## Sección 88: CHAPTER 10 [Entropy: 0.505]

applications.
By incorporating redundancy at various levels, you create a robust
and fault-tolerant infrastructure that can absorb component failures
without compromising system uptime or data integrity.
Fault tolerance
A truly resilient architecture goes beyond simply having backups. It
must be designed to gracefully handle failures and maintain
functionality even in the face of adversity, as follows:
• Microservices architecture: Imagine a traditional monolithic
application as a monolithic building, a single point of failure
that can bring everything crashing down. Microservices
architecture 
dismantles 
this 
rigidity. 
It 
breaks 
down
monolithic 
applications 
into 
smaller, 
independent
microservices, each with a specific function. If one
microservice encounters an issue, the others can continue to
function, preventing a system-wide outage. This modularity
allows your system to isolate and address failures without
impacting overall functionality.
• Circuit breakers: Picture a faulty circuit breaker in your
building, it disrupts the flow of electricity and can potentially
cause damage. Circuit breakers in GCP serve a similar
purpose, but on a software level. These mechanisms
automatically isolate failing services, preventing them from
cascading and impacting healthy components within the
system. By halting communication with failing services, circuit
breakers prevent further disruptions and allow for repairs to
be made without compromising the entire system.
• Self-healing mechanisms: Imagine a building with selfhealing properties, cracks mend themselves, and minor
malfunctions 
automatically 
self-correct. 
Self-healing
mechanisms in GCP take a similar approach. By implementing
automated processes that can detect and rectify failures
without human intervention, you further strengthen your
system's fault tolerance. These mechanisms can automatically
restart VMs, redeploy failed services, or take corrective actions
based on predefined rules, ensuring a faster and more efficient
response to disruptions.
By incorporating these fault tolerance strategies, you design systems
that are inherently more adaptable and robust. They can not only

detect and isolate failures but also take corrective actions, ensuring
continuous operation and data integrity even in the face of
unexpected challenges.
Dependency management
A well-designed and resilient architecture minimizes the impact of
failures not just within its own components, but also by effectively
managing dependencies on external services.
Following is how dependency management strengthens your GCP
architecture:
• Loose 
coupling: 
Imagine 
a 
building 
with 
rigid,
interconnected components – a failure in one can easily
cripple the entire structure. Loose coupling in GCP promotes a
more 
flexible 
approach. 
By 
utilizing 
loosely 
coupled
architectures where services communicate through welldefined interfaces, a failure in one service has minimal impact
on others. This modularity allows services to function
independently and adapt to changes without affecting the
entire system, promoting overall system resilience.
• Dependency versioning: Think of outdated building codes
that no longer meet current safety standards. Uncontrolled
dependency versions can introduce security vulnerabilities and
compatibility issues that can lead to failures. Dependency
versioning in GCP involves managing and controlling the
versions of software dependencies used by your services. This
ensures that your applications remain compatible with knowngood versions of external libraries and minimizes the risk of
unexpected failures caused by dependency conflicts.
Security
Security is an ever-evolving concern, and a resilient architecture
should prioritize robust security measures to protect against
cyberattacks and data breaches. This can include features as
follows:
• Identity and Access Management (IAM): Granular control
over access permissions to GCP resources.
• Encryption: Encrypting data at rest and in transit to
safeguard sensitive information.
• Security monitoring: Continuously monitoring your GCP

environment for suspicious activity and potential threats.
Monitoring and alerting
Proactive monitoring of your GCP infrastructure is crucial for
identifying potential issues before they snowball into major outages.
Configure monitoring tools to send timely alerts when anomalies or
performance deviations are detected. This enables you to address
problems swiftly and prevent them from impacting your
applications or users.
Testing and disaster recovery planning
Your DR plan is only as good as its execution. Regularly test your
DR procedures to ensure they function as intended during a realworld crisis. This includes simulating failure scenarios and
practicing failover processes to identify and rectify any gaps in your
DR plan.
Tip: Consistently testing your deployment's resilience across different zones a
regions is crucial. It is like running regular emergency drills to ensure your s
respond effectively in real crisis situations.
Load balancing and autoscaling for high availability
Imagine you are a IT of a bustling fintech company. Your platform
is like a financial hub in a major city, always busy, always active.
Here, load balancing and auto scaling in GCP are your trusted tools,
ensuring that despite the rush hour traffic, everything runs like
clockwork.
Load balancer
For any application that experiences fluctuating traffic loads,
ensuring smooth and efficient operation is crucial.
Following is where load balancing comes into play:
• Strategizing for the rush hours: Load balancing in GCP is
akin to managing a complex network of city roads. It ensures
that the surge of digital transactions (traffic) is evenly
distributed across your servers (city roads), preventing any
bottlenecks.

• Choosing your routes: Just like picking the right streets for
different traffic volumes, GCP offers several types of load
balancers. Global load balancing is perfect for handling
international transactions, while regional load balancing is
ideal for localized, high-volume trading periods.
• Benefits of an efficient grid: With load balancing, your
fintech platform remains responsive and efficient, handling
high transaction volumes without any hiccups, much like a
well-managed urban traffic system.
Auto scaling
Akin to the real world, your IT applications often experience
fluctuating user demands.
Following is where autoscaling is present:
• Your dynamic response team: Auto scaling in GCP is like
having a responsive traffic control system that dynamically
manages lanes (resources) based on the current traffic (user
demand). It scales up during market spikes and scales down in
quieter times, ensuring optimal resource utilization.
• Implementing market-responsive scaling: Implementing
auto scaling is like programming your system to adjust its
capacity in real-time, mirroring market conditions. The
following command sets up auto-scaling for a managed
instance group named my-instance-group, with a maximum
of 10 instances. It adjusts the number of instances based on
the target CPU utilization of 60%, ensuring that additional
resources are available when needed but scaled down during
quieter periods to optimize costs.
shell
gcloud compute instance-groups managed set-autoscaling "myinstance-group" \ --max-num-replicas 10 \ --target-cpuutilization 0.6 \ --cool-down-period 90 \ --zone us-central1-a 
Maintaining peak performance
Building a resilient and scalable infrastructure is just one piece of
the puzzle. To maintain peak performance and ensure a seamless
user experience, ongoing testing and optimization are crucial as
follows:

---

## Sección 89: CHAPTER 10 [Entropy: 0.421]

• Realtime simulations and drills: Just like a financial
institution conducts regular market simulations, test your load
balancing and auto-scaling setups to ensure they can handle
real-world scenarios effectively.
• Continual analysis and tweaks: Continuously monitor
system performance and adjust configurations to align with
market trends and user behaviors, ensuring your platform
remains agile and responsive.
Exploring the different types of load balancers in GCP
Load balancers play a pivotal role in efficiently distributing network
and application traffic. Understanding the variety of load balancers
available is crucial for optimizing performance and availability. Let
us navigate through the different types, categorized by their usage
and the network layer they operate on, as follows:
• HTTP(S) load balancing (Layer 7)
○ HTTP(S) load balancing is designed for HTTP and HTTPS
traffic.
○ It operates at the application layer (Layer 7) and offers
advanced 
capabilities 
like 
URL-based 
routing, 
SSL
termination, and session affinity.
○ Ideal for global web applications as it provides cross-region
load balancing, routing traffic to the nearest available
instance based on the user’s geographic location.
Usage scenario: A global e-commerce website that needs to
route user requests to the nearest data center to reduce
latency and improve user experience.
• TCP/SSL proxy load balancing (Layer 4)
○ TCP/SSL proxy load balancing is suitable for non-HTTP
traffic, such as gaming, databases, or any TCP-based traffic.
○ It operates at the transport layer (Layer 4) and provides
capabilities like SSL offloading and connection-based load
distribution.
○ Efficient for scenarios where you need to handle heavy TCP
or SSL traffic with minimal delay.
Usage scenario: An online multiplayer game where fast,
efficient distribution of TCP traffic to game servers is crucial.

• UDP load balancing (Layer 4)
○ UDP load balancing is tailored for User Datagram
Protocol (UDP) traffic.
○ It operates at the transport layer, much like TCP/SSL load
balancing, but specifically for handling UDP traffic,
commonly used in DNS, streaming media, and VoIP
services.
○ Useful in scenarios requiring fast, stateless connection
handling.
Usage scenario: A media streaming service that requires
efficient load balancing of streaming content delivered over
UDP.
• Internal load balancing (Layer 7 or Layer 4)
○ Internal load balancing is used for distributing traffic within
a Google Cloud Virtual Private Cloud (VPC).
○ It can operate at both the application layer (Layer 7) for
HTTP load balancing and at the transport layer (Layer 4)
for TCP/UDP traffic.
○ Best suited for applications that need load balancing
between virtual machines or containers in the same GCP
project.
Usage scenario: An internal company application that
requires load balancing between different services hosted in
a private cloud environment.
• Network load balancing (Layer 4)
○ Network load balancing is designed for scenarios where low
latency and high throughput are required.
○ It operates at the transport layer (Layer 4) and is IP-based,
meaning it doesn’t rely on cookies or session data for load
balancing decisions.
○ Ideal for load balancing TCP or UDP traffic where simple
round-robin allocation is sufficient.
Usage scenario: A high-traffic website that requires efficient
distribution of network traffic across a group of servers for
optimal performance.

Choosing right load balancer
The type of load balancer you choose will depend on your specific
needs and the requirements of your applications. Consider factors
such as traffic volume, application protocols, and desired level of
control when selecting a load balancer. GCP provides a
comprehensive portfolio of load balancers to suit a wide range of
use cases, ensuring that you can find the right solution for your
applications.
Data replication and synchronization techniques
Ensuring that your data is consistently available and up-to-date
across different components of your architecture is critical. Data
replication and synchronization in GCP are like the high-speed rail
networks connecting various cities: fast, reliable, and integral to
keeping the system unified. Let us explore how GCP manages these
crucial processes.
Data replication plays a pivotal role in safeguarding the integrity
and availability of critical information. GCP offers a comprehensive
suite of data replication solutions that enable organizations to
protect their valuable data from potential disruptions and maintain
continuous access for their applications.
Replication for high availability and durability
Data replication in GCP is akin to possessing multiple copies of a
crucial document, ensuring that even if one copy is lost, backups
remain accessible. By creating redundant copies of data across
different geographic locations, GCP's replication mechanisms
safeguard against data loss and ensure HA. Services like Cloud SQL,
Cloud Spanner, and Cloud Storage seamlessly replicate data across
multiple zones or regions, providing a robust foundation for data
protection.
Following is an example:
Service
Replication Type
Description
Cloud SQL
Synchronous
replication
Changes are immediately reflected across all re

Cloud Spanner
Strong multi-region
consistency
Data is always consistent across all replicas, ev
of regional outages.
Cloud Storage
Multi-regional
replication
Data is stored in multiple regions, ensuring ava
event of a regional outage.
BigQuery
Regional, Option to
replicate across
region
Users can choose to replicate across regions [h
cloud.google.com/bigquery/docs/data-re
Table 10.1: Comparative overview of data replication options available for
various popular GCP services
Synchronization techniques
Data replication is a important pillar of DR, ensuring you have
copies of your data readily available in geographically separate
locations. But simply copying your data isn't enough. You need a
mechanism to keep those copies consistent, meaning any changes
made to the original data are also reflected in the replicas.
Following is where synchronization techniques come into play. GCP
employs two primary synchronization techniques: real-time
synchronization and asynchronous replication.
Real-time synchronization
Real-time synchronization in GCP ensures that changes made to
data in one location are immediately reflected across all replicas.
This approach is akin to updating a shared online document, where
all participants can view changes in real time. Real-time
synchronization is crucial for applications that demand strict data
accuracy and consistency, such as financial transaction systems and
real-time analytics platforms.
Asynchronous replication
Asynchronous replication involves a slight delay between the
original data modification and its replication to other locations. This
method is akin to sending updates via mail rather than
instantaneously over a phone call. Asynchronous replication is
particularly suitable for scenarios where immediate consistency is
less critical than performance, such as in backup scenarios or batch

---

## Sección 90: CHAPTER 10 [Entropy: 0.475]

processing systems. GCP's asynchronous replication mechanisms
ensure that data is eventually consistent across replicas while
optimizing performance for specific workloads.
Selecting the appropriate replication strategy involves carefully
considering the specific requirements of your application in terms of
data consistency, latency, and throughput.
For applications that demand uncompromising data consistency,
such as financial transaction systems, synchronous replication is the
preferred choice. This ensures that changes made to data in one
location are immediately reflected across all replicas, maintaining a
consistent view of data at all times. Conversely, asynchronous
replication, which introduces a slight delay in replicating data
changes, may be more suitable for large-scale data analysis
workloads where immediate consistency is less critical.
Asynchronous replication prioritizes performance and throughput
over immediate consistency, making it ideal for scenarios where
data consistency can be eventually achieved without compromising
performance.
Tools and services for efficient data replication
GCP provides a comprehensive suite of tools and services to
facilitate seamless data replication and synchronization. These tools
cater to a wide range of data types and application requirements, as
follows:
• Datastore and Firestore: These NoSQL document databases
offer built-in multi-region replication, ensuring that data is
replicated across multiple regions for enhanced availability
and durability.
• Persistent disks: GCP's regional persistent disks provide
automatic replication between two zones within the same
region, safeguarding data against potential zone-level outages.
• Cloud spanner: This globally distributed database offers
strong multi-region consistency, ensuring that data is always
consistent across all replicas, even in the event of regional
outages.
• Cloud storage: This object storage service offers multiregional replication, ensuring that data is stored in multiple
regions for enhanced availability and durability.

• Cloud SQL: This fully managed relational database service
offers synchronous replication between zones within the same
region, ensuring HA and data consistency.
• Pub/Sub: This message-oriented middleware (MOM) offers
real-time message delivery, enabling applications to consume
data streams with low latency and high throughput.
• Cloud Firestore: This NoSQL document database provides
real-time updates to connected clients, ensuring that changes
to data are reflected immediately.
The choice of replication tool depends on the specific characteristics
of your data and application, as follows:
• Data type: GCP offers dedicated replication solutions for both
relational and NoSQL databases, as well as object storage and
MOM.
• Data volume: For large-scale data workloads, consider tools
that prioritize throughput and performance over immediate
consistency, such as Cloud Storage or Cloud Bigtable.
• Data consistency requirements: For applications that
demand 
uncompromising 
data 
consistency, 
prioritize
synchronous replication methods, such as Cloud Spanner or
Cloud SQL.
• Geographic distribution: Understand the data replication
options available for different GCP regions and zones,
considering 
factors 
such 
as 
latency 
and 
availability
requirements.
Data replication and synchronization in GCP are fundamental in
creating a resilient, reliable cloud architecture. By effectively
utilizing these techniques, you ensure that your data remains
secure, consistent, and always available, no matter where your
services are accessed from.
Backup and disaster recovery
In contemporary world, data is the lifeblood of any organization.
Protecting this valuable asset from potential threats and ensuring its
availability in the face of unforeseen circumstances is paramount.
Backup and DR play a crucial role in safeguarding data integrity
and business continuity. GCP offers a range of tools and services to
help you safeguard your data and ensure business continuity.

Backup
Data loss can be a devastating blow to any organization. Imagine
losing critical customer records, financial data, or application code
due to a system failure or cyberattack. The repercussions can be
severe, impacting everything from customer trust to operational
continuity. Fortunately, GCP offers a robust backup option to help
you safeguard your digital assets.
This section discusses the key strategies to implement effective
backup and DR in GCP.
Creating copies for restoration
Backup refers to the process of creating and storing copies of data
that can be restored in case of primary data loss or corruption. This
serves as a critical safeguard against data loss caused by hardware
failures, accidental deletion, cyberattacks, or natural disasters.
• Regular data backups in GCP: Regular backups are essential
for protecting your data stored in GCP services like Cloud
SQL, Datastore, and Compute Engine. GCP offers a variety of
backup options, as follows:
○ Scheduled backups: Automate backups using GCP's
scheduling tools to ensure regular data protection.
○ Managed backup services: Leverage GCP's managed
backup services, such as Cloud Storage, to streamline
backup operations and benefit from secure, scalable, and
reliable storage solutions.
○ API-driven backups: Utilize GCP's APIs to integrate
backup processes into your application workflows and
automate backup creation and management.
• Snapshot and image backups, capturing system states:
Snapshots and images provide more comprehensive data
protection by capturing the entire state of a system at a
specific point in time. This allows for restoring an entire
system, 
including 
operating 
system 
configurations,
applications, and data, to a previous working state. Following
is how snapshots and images can be leveraged in your DR
strategy:
○ Compute engine VM disk snapshots: Create snapshots of
your Compute Engine VM disks to capture point-in-time

recovery points. These snapshots can be used to revert to a
specific state of the VM if necessary.
○ VM instance images: Use images to create complete
backups of VM instances, including the operating system,
application configurations, and all data stored on the
instance. This enables full system restoration in case of
severe failures.
• Multi-region replication: Extending protection across
regions: Multi-region replication enhances data protection by
replicating data across multiple GCP regions. This safeguards
your data from regional outages or disruptions, ensuring
continued access even if one region becomes unavailable.
However, for truly robust protection against large-scale
disruptions, consider incorporating multi-region replication
into your strategy. For example, services like Cloud SQL and
Datastore 
offer 
built-in 
multi-region 
replication
options, automatically replicating data across multiple regions
for enhanced resilience.
Data redundancy
While multi-region replication offers protection against large-scale
disasters, data redundancy within a region provides another crucial
layer of defense against data loss. By storing data redundantly
across multiple facilities within a region, you can ensure that data
remains accessible even if one facility experiences an outage.
Fun fact
Cloud Storage's automatic replication feature stores data
redundantly across multiple zones within a region. This ensures that
data remains accessible even if one facility experiences an outage.
OnVault backups
OnVault is a powerful feature within GCP that enables you to
efficiently and securely store and manage your data in Cloud
Storage. By leveraging OnVault policies, you can automate the
process of transferring data from your on-premises environment or
Google Cloud to a designated Cloud Storage bucket.

---

## Sección 91: CHAPTER 10 [Entropy: 0.5]

Following are the OnVault policy types:
• Snapshot to OnVault: This policy captures snapshots of your

data and then copies them to a Cloud Storage bucket defined
by an OnVault pool.
• Direct to OnVault: This policy allows you to directly send
VMware VM backups to a Cloud Storage bucket defined by an
OnVault pool.
• OnVault to OnVault: This policy replicates data from one
OnVault storage object pool to another.
Following are the key benefits of OnVault:
• Long-term retention: Store data for extended periods,
minimizing the need for manual intervention and reducing
storage costs.
• Data security: Benefit from the robust security measures of
Cloud Storage, ensuring the protection of your sensitive data.
• Scalability: Easily scale your storage capacity to meet
evolving business needs.
• Cost-effectiveness: Optimize storage costs by leveraging
tiered storage options and compression.
Disaster recovery
DR is a critical aspect of business continuity, ensuring that your
organization can quickly restore operations in the event of an
outage or disruption. When choosing a DR solution, it's essential to
consider the trade-offs between cost, Recovery Time Objective
(RTO), and Recovery Point Objective (RPO).
Cold DR
Cold DR represents the most cost-effective DR strategy, as it
involves backing up data and storing it offline. However, this
approach comes with a longer RTO, as it requires restoring data and
provisioning infrastructure before applications can be brought back
online.
Example: An organization might choose cold DR for non-critical
applications that can withstand some downtime. In this scenario,
regular backups would be taken and stored in a secure location,
such as a cloud storage service or an offsite data center. In the event
of an outage, the organization would restore the backups to a new
environment and then restart the applications.

Warm DR
Warm DR offers a balance between cost and recovery time by
keeping key components of the system running in a standby state.
This approach typically involves replicating data to a secondary site
and pre-provisioning infrastructure, such as virtual machines or
containers.
Example: A company that relies on a critical database might opt for
warm DR. In this case, the database would be replicated to a
secondary site, and standby instances would be kept running in a
low-cost configuration. In the event of a primary site failure, the
standby instances could be quickly scaled up to handle the full
workload.
Hot DR
Hot DR provides the fastest RTO by maintaining a fully replicated
production environment in a secondary site. This approach ensures
that applications can be switched over to the secondary site with
minimal downtime.
Example: An e-commerce platform that cannot tolerate any
downtime might implement hot DR. In this case, the entire
production environment, including servers, storage, and
networking, would be mirrored at a secondary site. In the event of a
primary site outage, traffic would be redirected to the secondary
site without any interruption to service.
Deployment manager for DR automation
Google Cloud Deployment Manager simplifies DR automation by
enabling the scripting and automation of backup resource and
configuration deployment. This streamlines the DR process,
ensuring that backup resources are consistently provisioned and
configured in the event of an outage.
Example: A company can use Deployment Manager to create a
template for provisioning a backup environment in GCP. This
template would include resources such as virtual machines, storage
buckets, and networking configurations. When a DR event occurs,
the company can trigger the Deployment Manager template to
automatically spin up the backup environment and configure it for
failover.

Designing a comprehensive DR strategy
DR goes beyond backup and encompasses a comprehensive set of
policies, tools, and procedures to ensure the recovery or
continuation of vital technology infrastructure and systems
following a disaster. A well-defined DR plan should address the
following:
• Identify critical systems: Determine the critical systems that
are essential for business operations and prioritize their
protection.
• Establish recovery objectives: Define the acceptable data
loss tolerance (RPO) and the time within which operations
must be restored (RTO) to minimize business impact.
• Choose DR approach: Select the appropriate DR approach
based on your RPO and RTO requirements, considering cold,
warm, or hot DR strategies.
• Implement DR plan: Document and implement the DR plan,
including procedures for data restoration, failover, and system
testing.
• Regular testing and maintenance: Regularly test and update
the DR plan to ensure its effectiveness and adapt to changing
business needs.
In summary, the choice of DR strategy depends on the
organization's specific needs and risk tolerance. Cold DR is the most
cost-effective option but has a longer RTO. Warm DR offers a
balance between cost and recovery time. Hot DR provides the
fastest RTO but is the most expensive option. Google Cloud
Deployment Manager can automate the DR process and ensure that
backup resources are consistently provisioned and configured.
Testing and validation
Regular testing and validation of DR plans are crucial to ensure
their effectiveness in the event of an actual disaster. By simulating
various disaster scenarios and thoroughly evaluating the
performance of backup and DR strategies, organizations can identify
potential gaps, refine their procedures, and build confidence in their
ability to recover quickly and efficiently.
Several factors underscore the importance of regular DR testing as
follows:

• Verifying plan functionality: DR plans are often theoretical
documents, and testing provides an opportunity to validate
their practicality and identify any areas that may require
refinement or adaptation.
• Ensuring 
recovery 
effectiveness: 
Simulating 
disaster
scenarios allows organizations to assess the effectiveness of
their backup and DR strategies in restoring data, applications,
and systems to a functional state.
• Identifying potential gaps: Testing can uncover potential
weaknesses or gaps in the DR plan, enabling organizations to
address them before they become critical issues in a realworld disaster.
• Building confidence in preparedness: Regular testing instills
confidence in the organization's ability to respond effectively
to unforeseen events, minimizing disruption and downtime.
Simulating disaster scenarios
To effectively test DR plans, organizations should simulate various
disaster scenarios that encompass a range of potential disruptions,
as follows:
• Hardware 
failures: 
Simulate 
hardware 
failures 
by
intentionally shutting down critical servers or storage systems
to test the failover process and data recovery mechanisms.
• Cyberattacks: Replicate the impact of cyberattacks by
launching 
simulated 
ransomware 
attacks 
or 
network
intrusions to assess the organization's cybersecurity measures
and recovery capabilities.
• Natural 
disasters: 
Simulate 
natural 
disasters 
like
earthquakes, floods, or power outages to test the effectiveness
of backup.
Implementing comprehensive backup and DR strategies in GCP is
critical for protecting against data loss and ensuring continuity in
the face of unexpected disasters. By leveraging GCP’s robust cloud
infrastructure and services, you can build a resilient environment
that stands ready to face any challenge.
Designing resilient architectures in GCP
Creating a resilient architecture in GCP is akin to constructing a

---

## Sección 92: CHAPTER 10 [Entropy: 0.37]

building designed to withstand various environmental stresses. In
the digital world, these stresses come as traffic spikes, hardware
malfunctions, software bugs, or even natural disasters. Let us
explore how to architect robust systems in GCP that can thrive amid
these challenges.
Core principles of resilient design in GCP
In today's digital landscape, downtime is the enemy. Resilient IT
system design in GCP embraces a set of fundamental principles that
empower you to build robust and fault-tolerant IT systems.
Following are some of those design principles:
Redundancy and replication
Single points of failure (SPOFs) pose a significant threat to IT
infrastructure, as the failure of a single component can bring down
an entire system. To mitigate this risk, redundancy and replication
are employed to create multiple redundant paths for data and
traffic, ensuring seamless operation even in the event of component
failures.
• Infrastructure redundancy: Diversifying critical components,
Infrastructure redundancy involves deploying critical IT
components, such as servers, storage devices, and network
elements, across multiple zones or regions within GCP. This
approach ensures that if one component fails, another can
assume its role without disrupting service.
Consider a scenario where a critical database server
experiences a hardware malfunction. With infrastructure
redundancy in place, another database server in a different
zone can seamlessly take over, ensuring uninterrupted data
access for applications.
• Data replication: Safeguarding critical data, Data replication
involves replicating critical data across multiple zones or
regions, providing multiple copies of the data in case of a
regional outage or data corruption. GCP services like GCS,
Cloud SQL and Datastore offer built-in multi-region replication
capabilities, automatically synchronizing data across regions
for enhanced data protection.
Imagine a regional outage that disrupts data access in one
zone. With data replication, applications can access the data

from another zone, ensuring data availability and preventing
business disruptions.
By implementing redundancy and replication, organizations can
effectively eliminate SPOFs, bolster IT infrastructure resilience, and
ensure continuous business operations in the face of unforeseen
challenges.
Scalability and flexibility
Resilient IT systems must be able to dynamically adapt to changing
demands, scaling up or down to handle fluctuating traffic or
workloads. GCP's auto-scaling capabilities provide this flexibility,
automatically adjusting resource allocation based on real-time
demand. This is where GCP's auto-scaling capabilities come into
play as follows:
• Auto-scaling groups: Utilize auto-scaling groups to manage
the number of virtual machines (VMs) running your IT
applications. GCP automatically scales up the group when
demand increases and scales it down when demand decreases,
optimizing resource utilization and costs.
• Container-based 
elasticity: 
Leverage 
containerized
applications and Kubernetes Engine to achieve seamless
scalability. Kubernetes automatically scales containers up or
down based on CPU or memory utilization, ensuring that your
applications can handle spikes in traffic without performance
degradation.
Fault isolation and containment
Just as a ship's watertight compartments prevent a localized leak
from sinking the entire vessel, IT systems should be designed to
isolate failures and prevent them from cascading throughout the
entire system. This concept, known as fault isolation and
containment, ensures that the failure of a single component does
not bring down the entire infrastructure.
Following are a few key strategies for achieving fault isolation and
containment in GCP:
• Microservices 
architecture 
(divide 
and 
conquer):
Microservices architecture plays a key role in fault isolation
and containment by breaking down large monolithic
applications 
into 
smaller, 
independent 
services. 
Each

microservice is responsible for a specific function and
communicates with other services through well-defined
interfaces.
Consider a web application that consists of a front-end
service, an API service, and a database service. If the API
service encounters an issue, the front-end service can
continue to display cached content while the API service is
being repaired. This modular design prevents the failure of
one component from disrupting the entire application.
• Circuit breakers (protecting from failure overwhelm):
Circuit breakers act as fail-safe mechanisms that prevent an
overloaded service from overwhelming other components in
the system. When a service reaches a certain threshold of
failures, the circuit breaker automatically opens, blocking
traffic to the failing service.
Imagine a scenario where a critical service experiences a
surge in traffic and becomes unresponsive. To prevent the
failing service from consuming all available resources and
impacting other services, the circuit breaker opens,
redirecting traffic to healthier services. Once the failing
service recovers, the circuit breaker gradually reopens,
allowing traffic to resume.
• Health monitoring and alerting (proactive intervention):
Continuous health monitoring and alerting are crucial for
identifying potential issues before they escalate into major
failures. GCP's monitoring tools provide comprehensive
insights into the health of IT infrastructure and applications,
enabling proactive intervention.
By monitoring key metrics such as CPU utilization, memory
usage, and network traffic, organizations can detect
anomalies and address potential problems before they cause
outages or performance degradation.
Implementing fault isolation and containment strategies, including
microservices architecture, circuit breakers, and health monitoring,
empowers organizations to build resilient IT systems that can
withstand failures and maintain continuous operation.
Designing resilient architectures in GCP requires a combination of
strategic planning, leveraging the right mix of cloud services, and

---

## Sección 93: CHAPTER 10 [Entropy: 0.385]

regular testing. It is about preparing for the worst while optimizing
for the best, ensuring that your systems remain strong and reliable,
no matter what challenges they face.
Best practices for building resilient architectures in GCP
When constructing resilient architectures in GCP, certain strategies
and considerations stand out as best practices. Following is a
breakdown of these key practices:
• Distribute across multiple regions: Spread your application
across various GCP regions. This not only protects against
regional disruptions but also minimizes latency by serving
content from the closest region to your users.
• Implement load balancing: Use GCP’s load balancing
features to evenly distribute incoming traffic across multiple
servers. This approach enhances user experience, especially
during peak traffic periods, and optimizes server utilization.
• Leverage HA features: Opt for GCP services like Cloud SQL
and Cloud Spanner, known for their built-in HA and
replication capabilities.
• Multi-regional storage: Choose multi-regional storage classes
in Google Cloud Storage to replicate data across various
geographical locations, ensuring better data availability and
durability.
• Reliable messaging with cloud Pub/Sub: Adopt Cloud Pub/
Sub for dependable message queuing and delivery, which
maintains message processing even in the event of component
failures.
• Integrate DR planning: Embed DR strategies within your
architecture. Clearly define your RPOs and RTOs to align with
your business requirements.
• Stay updated: Regularly update your systems with the latest
patches and software upgrades. Consistent maintenance is
crucial in warding off vulnerabilities and maintaining system
performance at its peak.
• Vigilant monitoring: Employ tools like Cloud Monitoring and
Cloud Logging for continuous monitoring of system health and
performance.
• Setup alerting mechanisms: Establish alerting protocols to
get timely notifications about potential issues, enabling

proactive issue resolution.
Adhering to these best practices in GCP not only fortifies your
architecture against potential failures but also ensures that it
remains robust, scalable, and responsive to varying loads and
conditions.
Conclusion
As we conclude this chapter, we have navigated through the
intricacies of GCP regions and zones, delved into the dynamics of
load balancing and auto-scaling, and explored the essential
practices of backup and DR strategies. We have also examined the
critical techniques of data replication and synchronization and
rounded off with a deep dive into designing resilient architectures
in GCP. This journey has equipped us with a robust understanding
of building and maintaining highly available and disaster-resilient
systems in the cloud.
In the next chapter, we will focus on Monitoring, Logging, and
troubleshooting in GCP. In next chapter, we will cover the secrets of
effective resource monitoring, delve into the comprehensive logging
mechanisms while understanding proficient troubleshooting
practices.
Multiple choice questions
1. What is the primary purpose of having multiple zones
within a GCP region?
a. To increase the computing power
b. To provide redundancy and failover capabilities
c. To store data backups
d. To reduce operational costs
2. Which GCP service is used for automatic scaling of
resources based on traffic?
a. Google Kubernetes Engine
b. Google Cloud Storage

c. Google Compute Engine
d. Google Cloud Auto Scaling
3. In the context of GCP, what does disaster recovery
primarily focus on?
a. Decreasing compute resource usage
b. Restoring data from backups
c. Ensuring high availability and data integrity during
outages
d. Monitoring application performance
4. What is a benefit of using multi-regional storage in
Google Cloud Storage?
a. Reduced cost of storage
b. Enhanced data processing speed
c. Improved data durability and availability
d. Simplified data encryption
5. Which of the following is true about load balancing in
GCP?
a. It only distributes HTTP and HTTPS traffic
b. It operates solely at the network layer
c. It helps distribute traffic across multiple computing
resources
d. It is used for data replication
6. What is the primary role of Cloud Pub/Sub in a resilient
GCP architecture?
a. To manage database versions
b. To ensure reliable message queuing and delivery
c. To monitor the health of applications

d. To balance the load across web servers
7. Synchronous data replication is essential in scenarios
where:
a. Data consistency is less critical than performance
b. Immediate data consistency is crucial
c. Cost reduction is the primary focus
d. Data is rarely accessed
8. In GCP, what is the primary advantage of implementing a
multi-region deployment strategy?
a. It simplifies code deployment
b. It increases the processing speed of applications
c. It protects against regional outages and reduces latency
d. It helps in complying with local data storage laws only
Case studies
1. A leading renewable energy company sought to optimize its
wind turbine operations and maximize energy production
while ensuring continuous availability of its data analytics
platform. The company was generating vast amounts of data
from its wind turbines and wanted to leverage real-time data
insights to improve efficiency. However, they also needed to
ensure that their data and analytics platform remained
resilient against potential disruptions.
2. A large healthcare provider sought to improve patient care by
leveraging AI to analyze medical images while maintaining
HA of their AI-powered platform. The provider was facing
challenges in manually interpreting medical images, leading
to delays in diagnosis and treatment. They wanted to
implement an AI-powered platform that could provide
accurate diagnoses and maintain availability even in the event
of disruptions.

Answer key
1. b. To provide redundancy and failover capabilities
2. d. Google Cloud Auto Scaling
3. c. Ensuring high availability and data integrity during
outages
4. c. Improved data durability and availability
5. c. It helps distribute traffic across multiple computing
resources
6. b. To ensure reliable message queuing and delivery
7. b. Immediate data consistency is crucial
8. c. It protects against regional outages and reduces
latency
Case studies
1. The company implemented a real-time data analytics platform
on GCP using Google Cloud Dataproc and Cloud BigQuery,
with a robust DR strategy in place. Cloud Dataproc enabled
the company to process large volumes of wind turbine data in
real-time, while Cloud BigQuery provided a scalable data
warehouse for storing and analyzing historical data.
Additionally, the company utilized Cloud Storage for multiregional data replication, ensuring data availability even in
the event of a regional outage.
2. The healthcare provider partnered with a leading AI company
to develop an AI-powered medical imaging analysis platform
on GCP, employing Google Cloud AI services like Cloud
AutoML and Cloud AI Platform. The platform utilized Cloud
Spanner, a globally distributed database, to ensure strong
multi-regional consistency and HA of AI models and patient
data. Additionally, the platform leveraged cloud load
balancing to distribute incoming traffic across multiple
instances, ensuring that the platform could handle surges in
demand and maintain service continuity.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech

---

## Sección 94: CHAPTER 10 [Entropy: 0.25]

happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 95: CHAPTER 11 [Entropy: 0.49]

Logging, Monitoring
and Troubleshooting
Introduction
Want to keep a pulse on your cloud applications and ensure they're
running smoothly? In the dynamic world of cloud computing,
visibility into your systems is key to maintaining optimal
performance and resolving issues quickly. This chapter delves into
the crucial practices within the context of Google Cloud Platform
(GCP). This chapter aims to explore the complexities of Cloud
Monitoring, Cloud Logging, and Cloud Trace, providing a
comprehensive guide on how to effectively utilize these tools to
maintain, analyze, and improve your cloud environment.
Structure
Following is the structure of the chapter:
• Cloud Logging
• Cloud Monitoring
• Cloud Tracing
• Case study
• Best practices

Objectives
By the end of this chapter, readers will be equipped with a deep
understanding of the essential techniques and best practices in
monitoring, logging, and troubleshooting within GCP.
Cloud Logging
Cloud Logging is a crucial component of any cloud-based
infrastructure, including GCP. It allows you to collect, store, and
analyze logs generated by various services and applications running
on GCP. In this section, we will explore the fundamentals of Cloud
Logging, its benefits, and real-world examples.
Logs like Sherlock Holmes
Cloud Logging acts like a brilliant data Sherlock Holmes (fictional
detective created by the Scottish author Sir Arthur Conan Doyle) or
Byomkesh Bakshi (Indian-Bengali fictional detective created by
Sharadindu Bandyopadhyay), collecting logs from your applications,
VMs, and clusters. These logs whisper tales of successes, failures,
and everything in between. But raw logs are like cryptic riddles; we
need to understand them to uncover valuable insights.
Fun fact
The first recorded log message, from June 17, 1945, documented
the successful boot of the ENIAC computer: This is the first
electronic digital computer in the world! Imagine all the
fascinating stories hidden within our modern logs!
Cloud Logging plays a pivotal role in enhancing the observability of
your applications and services. Let us look at some of the core
concepts and components that constitute Cloud Logging, providing
you with a comprehensive understanding of its inner workings, as
follows:
• Logs and log entries: At the heart of Cloud Logging are logs
and log entries. Let us break down these essential elements:
○ Logs: Logs are chronological records of events generated by
various components of your applications and infrastructure.
These events can range from simple informational messages
to critical error reports. In GCP, logs are organized into log

streams, and each log stream represents a specific source of
log data, such as a virtual machine, a Kubernetes cluster, or
an application.
○ Log entries: Log entries are individual records within logs
that capture a single event or message. Each log entry
consists of several key components, including the log
severity level, timestamp, log name, resource, and the
actual log message.
• Log severity levels: Logs in Cloud Logging are classified into
different severity levels to help you quickly identify and
prioritize issues. The common log severity levels are:
○ Default: No assigned severity level. Use this for non-critical
information not directly related to system health.
○ Debug: Detailed debug information, useful for tracing
program execution and identifying potential issues.
○ Info: Routine operational information, indicating normal
activities 
like 
startup, 
shutdown, 
and 
configuration
changes.
○ Notice: Events that are noteworthy but not necessarily
alarming, such as successful service completions or user
logins.
○ Warning: Events that might indicate potential problems,
requiring attention but not immediate action, such as
resource utilization reaching thresholds.
○ Error: Errors that disrupt normal operation and require
immediate attention, such as service failures, unexpected
crashes, or data corruption.
○ Critical: Critical events that cause severe disruption or data
loss, requiring immediate intervention to minimize impact.
○ Emergency: Reserved for system-wide emergencies causing
widespread outages or data loss, demanding the highest
priority response.
• Log-based metrics: One of the powerful features of Cloud
Logging is the ability to create log-based metrics. These
metrics allow you to extract specific information from log
entries and use it for monitoring and alerting purposes. For
example, you can create a metric to count the number of
HTTP 500 error responses in your application logs and set up
an alert to notify you when this count exceeds a certain

threshold.
• Log retention: Cloud Logging offers configurable log
retention policies, enabling you to decide how long you want
to retain log data. You can choose retention periods ranging
from days to years, depending on your compliance and
analysis needs. However, keep in mind that longer retention
periods may incur additional storage costs.
• Integration with Cloud Monitoring and alerting: Cloud
Logging 
seamlessly 
integrates 
with 
Cloud 
Monitoring,
allowing you to create custom dashboards and set up alerting
policies based on log entries and log-based metrics. This
integration enhances your ability to proactively respond to
issues and ensure the health and performance of your
applications.
• Data access and security: Access to log data in Cloud
Logging 
is 
controlled 
through 
Identity 
and 
Access
Management (IAM) roles, ensuring that only authorized users
and services can view or manage logs. Additionally, log data
can be encrypted both in transit and at rest, providing robust
security for your log entries.
• Log export: Cloud Logging provides the flexibility to export
logs to various destinations, including Google Cloud Storage,
BigQuery, and Pub/Sub. This feature enables you to archive
log data for long-term analysis or integrate it with other data
analysis tools.
Log sinks
Log sinks act as dedicated delivery routes for your logs. They are
like postal workers, picking up specific log entries and transporting
them to designated destinations, often outside of Cloud Logging
itself.
Following is a breakdown of how they work:
• Destination decisions: You choose where your logs should
land, such 
as 
BigQuery 
for 
long-term 
storage 
and
analysis, Pub/Sub for real-time processing, or Cloud Storage
for archival purposes.
• Filter for focus: You define precise filters to determine which
logs get routed through a particular sink. This ensures you are
not flooding your destinations with irrelevant data.

---

## Sección 96: CHAPTER 11 [Entropy: 0.632]

• Reliable routing: Sinks handle the efficient and secure
transfer of logs to their destinations, ensuring your data
arrives intact and ready for use.
Enabling logging with gcloud, as follows:
• BigQuery:
○ Create a Cloud Logging sink:
gcloud 
logging 
sinks 
create 
my-bigquery-sink
bigquery.googleapis.com/projects/my-project/datasets/
my-dataset
○ Link the sink to your desired log entries:
gcloud logging sinks update my-bigquery-sink --logfilter='resource.type="cloud_run_revision" 
AND
severity>=WARNING'
• Dataproc:
gcloud dataproc clusters create my-cluster \
--enable-stackdriver-logging \
--logging-sink my-bigquery-sink
• Dataflow:
gcloud dataflow jobs run my-job \
--enable-stackdriver-logging \
--logging-sink my-bigquery-sink
• GKE:
gcloud container clusters create my-cluster \
--enable-stackdriver-logging \
--logging-sink my-bigquery-sink
• Vertex AI:
○ Create a sink for Vertex AI logs:
gcloud 
logging 
sinks 
create 
my-vertex-ai-sink
bigquery.googleapis.com/projects/my-project/datasets/
my-dataset
○ Enable logging in the Vertex AI console:
○ Navigate to the Vertex AI Logs page.
○ Select the job or endpoint.
○ Click Enable Logging and select the sink.

Benefits of Cloud Logging
Cloud Logging offers a wide range of benefits that are instrumental
in improving the observability and reliability of your GCP
environment.
Following are the advantages:
• Centralized log management: Centralized log management
is like having a control center for your logs, where you can
monitor, search, and analyze log data from all your GCP
services and resources in one place. It enables:
○ Enhanced visibility: Centralization allows you to gain a
holistic view of your system's health and performance,
making it easier to identify issues and trends.
○ Streamlined troubleshooting: With logs from different
sources consolidated, you can troubleshoot and diagnose
problems more efficiently.
Refer to the following figure:
Figure 11.1: GCP Cloud Logging dashboard
• Real-time analytics: Imagine having a magnifying glass that
lets you zoom in on your log data as it happens. This
facilitates:
○ Immediate insights: Real-time log analysis empowers you
to detect and respond to critical events as they occur,

reducing downtime and enhancing user experience.
○ Proactive issue resolution: You can set up alerts to notify
you instantly when specific log events match predefined
criteria, enabling proactive issue resolution. Following
figure shows UI for Logging service in GCP:
Figure 11.2: Logging Analytics UI
• Cost-effective scalability: Cloud Logging scales with your
needs, much like adding more storage space as your book
collection grows.
○ Pay-as-you-go model: Cloud Logging's pricing is based on
data volume, meaning you only pay for the logs you
generate and store.
○ Scalability: It can handle petabytes of log data per day,
accommodating the needs of organizations of all sizes.
• Seamless integration:
○ Cloud ecosystem: Cloud Logging seamlessly integrates
with other GCP services, such as Cloud Monitoring and
BigQuery, for comprehensive monitoring and analysis.
○ Customization: 
You 
can 
tailor 
your 
logging 
and
monitoring solutions to fit your specific requirements,
thanks to the flexibility of integration.
• Security and compliance:

○ Access control: IAM roles allow you to control who can
access log data, ensuring data security and compliance.
○ Encryption: Logs are encrypted both in transit and at rest,
safeguarding sensitive information.
Note: It is important to note that while Cloud Logging offers many benefits w
correctly, it may result in high costs as well. Organizations with extremely hi
volumes may see increased costs, so it is essential to manage log retention po
effectively.
Fun fact
Did you know that Google Cloud Logging processes trillions of log
entries each month, making it a critical tool for organizations
handling massive amounts of data?
Aggregated Logging
Cloud Logging offers a feature called Aggregated Logging, which
enables you to collect and store logs from various GCP resources
and applications in a centralized location. This simplifies log
management and analysis by providing a unified view of your logs
across your entire GCP environment.
Following is a breakdown of key concepts related to Aggregated
Logging:
• Centralized log storage: Aggregated logs are stored in a
single location within Cloud Logging, eliminating the need to
manage logs scattered across individual GCP resources. This
centralized approach streamlines log management, search, and
analysis.
• Aggregated sinks: An aggregated sink is a special type of log
sink that plays a crucial role in collecting logs from various
sources. You can configure aggregated sinks to either intercept
or not intercept logs:
○ Intercepting sinks: These sinks capture logs directly from
the source before they are written to the default log storage
location. This ensures all logs are routed to the aggregated
sink for centralized storage and analysis.
○ Non-intercepting sinks: These sinks allow logs to be
written to the default log storage location first and then

forward them to the aggregated sink for centralized storage.
• Log query and viewing: You can leverage the Logs Explorer
tool within the Cloud Logging console to query and view your
aggregated logs. The Logs Explorer provides a powerful
interface for filtering, searching, and analyzing logs from all
your GCP resources.
By effectively utilizing Aggregated Logging, you can gain a
comprehensive understanding of your system's health and
performance across your entire GCP environment. This centralized
approach simplifies log management, facilitates troubleshooting,
and empowers you to make data-driven decisions for optimizing
your GCP resources.
Trivia
Which GCP service seamlessly integrates with Cloud Logging for
comprehensive monitoring and analysis?
Answer: Cloud Monitoring.
Key takeaways
• Cloud Logging is the foundation of effective monitoring and
troubleshooting in GCP.
• Logs consist of log streams, and log entries capture individual
events or messages.
• Severity levels help prioritize and identify issues within logs.
• Log-based metrics enable you to create custom monitoring and
alerting solutions.
• Log retention policies are customizable, but longer retention
may increase storage costs.
• Integration with Cloud Monitoring enhances proactive issue
resolution.
• IAM roles control access to log data, and encryption ensures
data security.
• Log export options enable flexibility in managing log data.
Cloud Monitoring
Cloud Monitoring is an essential component of GCP that goes hand

---

## Sección 97: CHAPTER 11 [Entropy: 0.548]

in hand with Cloud Logging. It enables you to gain insights into the
performance, health, and availability of your applications and
infrastructure. In this section, we will explore the fundamentals of
Cloud Monitoring, its benefits, real-world examples, code snippets,
and engaging trivia questions to captivate your readers.
Understanding Cloud Monitoring
Cloud Monitoring provides a comprehensive view of your GCP
resources and applications through the following key components:
• Metrics: Metrics are the building blocks of effective
monitoring and analysis. They provide quantitative data that
reflects the state, performance, and health of your GCP
resources and applications. Understanding metrics is essential
for fine-tuning your environment and ensuring optimal
performance. Metrics in GCP can be broadly categorized into
two types:
○ Built-in metrics: These metrics are automatically collected
by GCP services and resources. They cover a wide range of
parameters, including CPU utilization, network traffic, and
latency.
○ Custom metrics: Custom metrics are user-defined and offer
the flexibility to track specific aspects of your applications
or services that built-in metrics may not cover. For
example, you can create custom metrics to monitor the
number of orders processed per minute in an e-commerce
application.
• Metric labels: Metric labels provide additional context to
metrics, allowing you to differentiate data within the same
metric type. Labels can represent attributes such as instance
ID, region, or environment type. They make it easier to filter
and group data for analysis.
• Aggregation and granularity: Metrics can be aggregated
over time to provide different perspectives on your data.
Common aggregation functions include sum, average, count,
and rate. Granularity refers to the time intervals at which
metrics are collected and stored, such as one-minute or onehour intervals.
• Dashboards: Dashboards are your command center for
visualizing and analyzing metrics. In GCP, you can create
custom dashboards tailored to your specific monitoring needs.

Here is what you need to know about dashboards:
○ Customization: Custom dashboards empower you to
choose which metrics to display and how they are
presented. You can arrange widgets, charts, and graphs to
provide at-a-glance insights into your environment.
○ Widgets: Widgets are individual components that display
metrics. Common widget types include line charts, bar
charts, and tables. You can configure widgets to show data
from specific metrics and labels.
○ Real-time updates: Dashboards provide real-time updates,
allowing you to monitor your environment as events occur.
This real-time visibility is crucial for identifying and
responding to issues promptly.
Alerts
Alerts are notifications triggered by specific conditions or thresholds
set on metrics. They are your early warning system, allowing you to
take action when specific conditions or thresholds are met.
Following is how alerts work in GCP:
• Conditions: Conditions define the criteria that trigger alerts.
You can set conditions based on metric values, labels, and
aggregation methods. For example, you can create an alert
that triggers when CPU usage exceeds 90% for five
consecutive minutes.
• Notification channels: Alerts can notify you through various
channels, 
such 
as 
email, 
SMS, 
or 
integrations 
with
communication tools like Slack or PagerDuty. This ensures
that you are promptly informed when an alert is triggered.
• Escalation policies: For critical alerts, you can configure
escalation policies that determine who receive notifications
and in what sequence. This ensures that the right people are
informed at the right time.
Uptime checks
Uptime checks are automated tests that verify the availability and
responsiveness of your applications and services. They play a crucial
role in ensuring that your services are accessible to users and help
you proactively identify and address issues.

Understanding uptime checks
Uptime checks involve simulating user interactions with your
applications and services.
Following are the key components and concepts associated with
uptime checks:
• Check types: There are different types of uptimes checks to
suit various use cases:
○ HTTP(S) checks: These checks send HTTP or HTTPS
requests to your web applications, validating that they
respond with the expected status code and in a timely
manner.
○ TCP checks: TCP checks validate the availability of
network services by establishing a TCP connection to a
specified port on a target server.
○ ICMP checks: ICMP checks send ICMP echo requests (ping)
to test the reachability of a target host or IP address.
• Check frequency: You can configure the frequency at which
uptime checks run, such as every minute or at custom
intervals. Frequent checks provide real-time visibility into
service availability.
• Alerting: Uptime checks can be associated with alerting
policies. When a check fails, an alert can be triggered to notify
you and your team, allowing for immediate action.
• Locations: Uptime checks can be performed from various
geographic locations, giving you a global perspective on the
availability of your services. This helps identify regional
issues.
• Integration: Uptime checks seamlessly integrate with other
monitoring components, such as dashboards and alerting
policies, enabling a holistic monitoring experience.
Service Monitoring
Service Monitoring provides a user-centric perspective on the
performance and reliability of your applications. Following is how it
works:
• Synthetic 
monitoring: 
Synthetic 
monitoring 
involves
simulating user interactions with your application to measure

its availability and responsiveness. Uptime checks are
automated tests that verify whether your services are
accessible to users.
• Real user monitoring: Real user monitoring (RUM)
captures data from actual user interactions with your
application. It provides insights into user experience by
tracking metrics like page load times, network latency, and
error rates.
• Integration with metrics and alerts: Service Monitoring
seamlessly integrates with metrics and alerts, allowing you to
correlate user experience data with system-level metrics. This
correlation helps you pinpoint the root causes of performance
issues.
Benefits of Cloud Monitoring
Following are the benefits of using Cloud Monitoring within GCP:
• Comprehensive visibility: Cloud Monitoring provides a
unified view of metrics from various GCP services, allowing
you to monitor the entire stack effectively.
• Real-time alerts: You can set up custom alerts that notify you
when specific conditions are met, enabling proactive issue
resolution.
• Custom dashboards: Create customized dashboards to
monitor the metrics that matter most to your organization,
providing quick access to vital information.
• Integration: Seamlessly integrates with Cloud Logging and
other GCP services, enabling a holistic monitoring and
troubleshooting experience.
• Automated uptime checks: Uptime checks automate the
process of monitoring the availability of your applications,
reducing manual effort.
• User-centric monitoring: Service Monitoring focuses on the
user experience, helping you identify and resolve issues that
impact your users.
Note: Setting up advanced monitoring and alerting configurations may req
level of expertise and can be complex for beginners.

---

## Sección 98: CHAPTER 11 [Entropy: 0.721]

Fun fact
Google Cloud Monitoring processes over a billion time series data
points every minute, making it a formidable tool for monitoring
large-scale applications and services.
Trivia
Which component of Cloud Monitoring allows you to visualize
metrics in real-time?
Answer: Dashboards in Cloud Monitoring enable you to visualize
metrics in real-time.
Cloud Tracing
Cloud computing has revolutionized software development,
enabling us to build complex applications that dance across
microservices, containers, and even continents. But with this
distributed power comes a challenge: tracing requests through this
intricate labyrinth can be daunting. Enter Cloud Tracing, your
personalized Sherlock Holmes for distributed systems, illuminating
the hidden pathways and causal relationships within your
applications.
Following are some key concepts you should know while working
with Cloud Tracing:
• Distributed tracing libraries To enable Cloud Tracing in
your 
applications, 
you 
typically 
start 
by 
integrating
distributed tracing libraries. These libraries provide APIs and
instrumentation for capturing trace data. Google Cloud offers
libraries 
and 
integrations 
for 
popular 
languages 
and
frameworks, including Java, Python, Node.js, Go etc. Below
code snippet shows usage of popular tracing library
opentelemetry.
Code snippet (Java with OpenTelemetry):
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanContext;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.TracerProvider;
import io.opentelemetry.api.trace.TracerProviderBuilder;

import io.opentelemetry.context.Scope;
// Initialize the OpenTelemetry SDK
TracerProvider tracerProvider =
 TracerProvider.builder()
 .build();
GlobalOpenTelemetry.set(tracerProvider);
// Create a tracer
Tracer tracer = GlobalOpenTelemetry.getTracer("your-servicename");
// Start a span
try 
(Scope 
scope 
= 
tracer.spanBuilder("your-operationname").startScopedSpan()) {
 Span currentSpan = Span.current();
 SpanContext spanContext = currentSpan.getSpanContext();
 // Perform your operation here
} catch (Exception e) {
 // Handle exceptions
} finally {
 // End the span when the operation is complete
 Span.current().end();
}
• Trace 
exporters: 
Once 
you 
have 
instrumented 
your
application with tracing libraries, you need to configure trace
exporters to send trace data to the Cloud Tracing service.
Google Cloud provides exporters for various tracing backends,
including Google Cloud Trace.
Following is a code snippet that demonstrates how to set up
a Google Cloud Trace exporter:
import
io.opentelemetry.exporter.trace.google.GoogleCloudTraceExporter;
// Configure and set up the Google Cloud Trace exporter
GoogleCloudTraceExporter.builder()
 .buildAndRegisterGlobal();
• Sampling strategies: Sampling determines which traces and

spans are collected. Google Cloud Trace allows you to
configure sampling strategies to control the amount of trace
data collected. Sampling rates can be adjusted based on your
requirements, ensuring that you capture essential traces
without excessive overhead.
Code snippet (Java with Sampling):
import io.opentelemetry.sdk.trace.samplers.Sampler;
import io.opentelemetry.sdk.trace.samplers.Samplers;
// Configure a sampling strategy (e.g., 50% of traces are
sampled)
Sampler sampler = Samplers.probabilitySampler(0.5);
// Set the sampler in your tracer configuration
tracerProvider =
 TracerProvider.builder()
 .setSampler(sampler)
 .build();
• Trace context propagation: Trace context propagation
ensures that trace information is passed along as requests flow
through various components of your distributed system. It
allows you to correlate spans within a trace, even when they
cross service boundaries.
Code snippet (Python with Flask and OpenTelemetry):
from opentelemetry import trace
from 
opentelemetry.instrumentation.flask 
import
FlaskInstrumentor
# Initialize OpenTelemetry and instrument Flask for trace
context propagation
trace.set_tracer_provider(tracer_provider)
FlaskInstrumentor().instrument_app(app)
• Viewing and analyzing traces: Google Cloud Trace provides
a user interface for viewing and analyzing trace data. You can
access trace details, view the timing of spans, and identify
performance bottlenecks or errors. Additionally, you can link

traces to logs and other monitoring data for comprehensive
analysis.
• GCP console: To view traces in the Google Cloud Console,
navigate to the Trace section under the Observability
category. Here, you can search for specific traces, examine
trace details, and analyze the performance of your distributed
system.
Following are some key benefits of using Cloud Tracing:
• End-to-end visibility: One of the primary benefits of Cloud
Tracing is its ability to provide end-to-end visibility into the
flow of requests and interactions across distributed systems.
This visibility allows you to trace the journey of a single
request as it traverses through various microservices and
components. By examining traces and spans, you can visualize
the entire path of execution, making it easier to identify
bottlenecks, latency issues, and the sequence of actions
involved.
• Root cause analysis: Cloud Tracing is an indispensable tool
for root cause analysis in distributed systems. When
performance problems or errors occur, tracing data allows you
to pinpoint the exact source of the issue. By examining spans
within a trace, you can identify which component or service
contributed to delays or errors. This information is invaluable
for quickly diagnosing and addressing issues, minimizing
downtime, and improving system reliability.
• Performance optimization: Optimizing the performance of
distributed systems is a complex task, but Cloud Tracing
simplifies this process. By analyzing trace data, you can
identify 
performance 
bottlenecks, 
resource-intensive
operations, and areas for optimization. For instance, if a
specific microservice consistently takes longer to respond, you
can focus your optimization efforts on that service, resulting
in enhanced system performance and a better user experience.
• Troubleshooting 
complexity: 
In 
today's 
world 
of
microservices and distributed architectures, troubleshooting
complex issues can be challenging. Cloud Tracing simplifies
this process by allowing you to trace the flow of requests and
transactions across services. When an issue arises, you can
trace it back to its source quickly and efficiently. This
capability is particularly crucial for maintaining the reliability
of modern, intricate applications.

---

## Sección 99: CHAPTER 11 [Entropy: 0.778]

• Sampling efficiency: To prevent overwhelming the tracing
system with excessive data, Cloud Tracing employs sampling.
Sampling involves selectively collecting traces and spans
based on a predefined sampling rate. This ensures that you
capture representative traces without introducing significant
overhead. Sampling strikes a balance between capturing
critical 
data 
and 
minimizing 
the 
impact 
on 
system
performance, making tracing feasible at scale.
Case study on Optimizing an e-commerce platform
Let us dive into a real-world case study where Cloud Logging,
Monitoring, and Tracing are used in conjunction to address a
common scenario, ensuring the reliability and performance of a
cloud-based e-commerce platform.
Background: You manage a thriving e-commerce platform hosted
on Google Cloud. Ensuring a seamless shopping experience for users
is paramount, but you have been encountering performance issues
and want to address them proactively.
Scenario: Users have reported slow page load times and occasional
checkout failures. You need to identify the root causes and take
steps to optimize the platform's performance.
Solution: By leveraging Cloud Logging, Monitoring, and Tracing,
you will gain insights into the platform's behavior, detect issues,
and optimize performance.
Following is a breakdown of how this solution can be implemented:
• Logging and tracing setup
○ Log user interactions: Integrate Cloud Logging into the
platform to log user interactions, including page views,
product searches, and cart additions, as shown:
logger.debug("User 
viewed 
product 
page:
Product_ID={}", productId)
○ Instrument tracing: Instrument your microservices to
capture traces of user interactions, including the checkout
process.
// Java code with OpenTelemetry for tracing
import io.opentelemetry.api.trace.Span;

import io.opentelemetry.api.trace.Tracer;
Tracer 
tracer 
= 
TracerProvider.getTracer("checkoutservice");
Span 
checkoutSpan 
= 
tracer.spanBuilder("checkoutprocess").startSpan();
• Create custom metrics: Define custom metrics to measure
critical aspects of your platform, such as page load times,
database query latencies, and checkout success rates.
Following is how you can leverage custom metrics in GCP:
# YAML configuration for custom metrics
metrics:
 - name: page_load_time
 description: Page load time in milliseconds
 filter: 'resource.type="gae_app" logName="projects/myproject/logs/app"'
 metricDescriptor:
 metricKind: DELTA
 valueType: INT64
 unit: 'ms'
 # Define additional custom metrics for database latencies,
checkout success rate, etc.
• Setup alerts: Configure alerts based on custom metrics to
proactively detect performance issues. For example, create an
alert that triggers when the page load time exceeds a
predefined threshold.
Following is a code snippet demonstrating how to set up an
alert policy using YAML:
# YAML configuration for alerting policy
conditions:
 - displayName: "High Page Load Time"
 filter: 'metric.type="custom.googleapis.com/page_load_time"
AND resource.type="gae_app"'
 aggregations:

 perSeriesAligner: ALIGN_RATE
 crossSeriesReducer: REDUCE_SUM
 threshold: 0.1
 comparison: COMPARISON_GT
 duration: 60s
 alertPolicyService: "<project_id>"
• Create custom dashboards: Build custom dashboards in
Google Cloud Monitoring to visualize key metrics and trace
data. Include widgets for custom metrics, trace latency, and
error rates.
Following is a code snippet demonstrating how to configure
a custom dashboard using YAML:
# YAML configuration for custom dashboard
dashboards:
 - name: "E-commerce Performance Dashboard"
 displayName: "E-commerce Performance Dashboard"
 dashboardWidgets:
 - text: "Page Load Time"
 xyChart:
 dataSets:
 
 
 
 
 
 
 
 
 
 
 
 
- 
timeSeriesQuery:
'metric.type="custom.googleapis.com/page_load_time"
resource.type="gae_app"'
 label: "Page Load Time (ms)"
 minAlignmentPeriod: 60s
 # Include additional widgets for trace latency and error
rates
• Trace analysis: Use Google Cloud Trace to analyze trace data.
Examine traces associated with slow checkout processes to
identify bottlenecks and latency issues.
• Correlate logs, metrics, and traces: Correlate log entries,
custom metrics, and trace information using trace context.
This allows you to trace user interactions, page load times,
and checkout processes together, simplifying root cause
analysis.

Best practices
Following are some best practices for each of these essential cloud
observability components:
• Cloud Logging best practices:
○ Structured logging: Use structured log formats, such as
JSON or key-value pairs, to facilitate easy parsing and
searching of log data. This enhances log analysis and
filtering.
○ Log severity levels: Follow a consistent log severity level
convention (e.g., INFO, WARNING, ERROR) to prioritize
and categorize log entries appropriately.
○ Log retention policies: Set up log retention policies to
control the duration log data is retained. Ensure compliance
with regulatory requirements while optimizing storage
costs.
○ Resource labels: Apply resource labels to log entries,
making it easier to identify the source of logs when dealing
with multi-cloud or multi-environment deployments.
○ Custom logs: Create custom logs for specific application
components or critical events. This allows you to focus on
relevant log data during analysis.
○ Log export to Cloud Storage: Export logs to Google Cloud
Storage for long-term storage, auditing, and compliance
purposes.
○ Monitoring integration: Integrate Cloud Logging with
Cloud Monitoring to create alerts based on log events,
enabling proactive issue detection.
• Cloud Monitoring best practices:
○ Custom metrics: Create custom metrics for applicationspecific performance indicators that are critical to your
business. This provides fine-grained insights.
○ Service-Level Objectives: Define and monitor Service-
Level Objectives (SLOs) for key user-facing services. Set
up alerts based on SLO violations to ensure you meet user
expectations.
○ Automated 
remediation: 
Implement 
automated
remediation actions for common issues. For example,

---

## Sección 100: CHAPTER 11 [Entropy: 0.28]

automatically restart unhealthy instances.
○ Resource hierarchy: Organize monitored resources in a
hierarchical structure to simplify resource management and
access control.
○ Dashboard 
granularity: 
Create 
dashboards 
with
appropriate 
granularity. 
Use 
high-level 
overview
dashboards for management and detailed dashboards for
troubleshooting.
○ Alerting policies: Use alerting policies with proper
thresholds and notification channels. Implement intelligent
alerting with condition-based triggering.
○ Annotations: Annotate incidents with context and actions
taken during remediation. This aids in post-incident
analysis and documentation.
• Cloud Tracing best practices:
○ Instrumentation: 
Instrument 
your 
applications 
and
services with tracing libraries from the start of development
to ensure comprehensive trace data collection.
○ Sampling: Configure sampling rates appropriately to
balance trace data volume and overhead. Consider using
adaptive sampling for dynamic workloads.
○ Distributed context propagation: Ensure that trace
context is propagated consistently across service boundaries
to maintain end-to-end visibility.
○ Trace annotations: Include relevant annotations and
metadata in spans to provide context and details for trace
analysis.
○ Trace sampling for errors: Increase the sampling rate for
traces associated with errors or exceptions to capture
diagnostic information.
○ Long-running operations: Use trace data to identify and
optimize long-running operations, reducing latency and
improving system performance.
○ Integration: 
Integrate 
Cloud 
Tracing 
with 
other
observability tools, such as Cloud Logging and Cloud
Monitoring, to correlate data for troubleshooting.
○ Trace data retention: Configure trace data retention
settings 
based 
on 
your 
analysis 
and 
compliance

requirements.
○ Anomaly detection: Implement anomaly detection on
trace data to identify unusual patterns or deviations from
normal behavior.
○ Documentation: Document trace context propagation
guidelines and best practices for developers and operations
teams.
These best practices help organizations effectively leverage Cloud
Logging, Monitoring, and Tracing to maintain application
reliability, optimize performance, and troubleshoot issues efficiently
in the cloud environment. By following these guidelines, you can
ensure that your cloud-based systems are well-observed and
resilient.
Conclusion
In this chapter, we explored the fundamental concepts and practical
applications of Cloud Logging, Monitoring, and Tracing. We
discussed how these essential observability tools help enhance the
reliability, performance, and troubleshooting capabilities of cloudbased applications. Through a real-world case study, we
demonstrated how to integrate these services to proactively detect
and address issues, create custom metrics, alerts, and dashboards,
and correlate data effectively.
In the next chapter, we will delve into the strategies and best
practices for designing and managing hybrid and multi-cloud
environments, enabling organizations to harness the benefits of
cloud flexibility and redundancy while mitigating risks and
optimizing cost-efficiency.
Multiple choice questions
1. What is the primary purpose of Cloud Logging in a cloudbased environment?
a. Real-time data analysis
b. Storing log data indefinitely
c. Troubleshooting and monitoring

d. Load balancing
2. Which component of Cloud Tracing represents individual
units of work within a trace, such as database queries or
service invocations?
a. Traces
b. Span Context
c. Trace Context
d. Spans
3. What is the primary benefit of structured logging in
Cloud Logging?
a. Reduced log storage costs
b. Enhanced log analysis and filtering
c. Real-time log streaming
d. Integration with third-party logging tools
4. Which of the following is NOT a best practice for Cloud
Monitoring?
a. Create custom metrics for key application performance
indicators.
b. Implement automated remediation for all issues.
c. Define and monitor Service-Level Objectives (SLOs).
d. Use alerting policies with proper thresholds and
notification channels.
5. What is the primary purpose of setting up alerting
policies in Cloud Monitoring?
a. To collect log data
b. To monitor network traffic
c. To proactively detect and respond to issues

d. To analyze trace data
6. What is the key advantage of integrating Cloud Tracing
with Cloud Logging and Cloud Monitoring?
a. Reducing trace data storage costs
b. Simplifying trace context propagation
c. Correlating data for more effective troubleshooting
d. Enabling adaptive trace sampling
7. In Cloud Logging, what is the recommended approach for
managing log data retention?
a. Retain all log data indefinitely
b. Apply a fixed retention period for all logs
c. Define log retention policies based on analysis and
compliance requirements
d. Use log sinks to automatically delete log data
Case studies
1. You are experiencing frequent latency issues in your cloudbased application. Users report slow response times. Describe
how you would leverage Cloud Logging, Monitoring, and
Tracing to identify and address these latency issues. Provide
specific steps and best practices.
2. You manage a multi-cloud environment with resources in
Google Cloud and AWS. Explain how you would implement a
unified 
observability 
strategy 
using 
Cloud 
Logging,
Monitoring, and Tracing across both cloud providers. What
are the key considerations and best practices?
Answer key
1. c. Troubleshooting and monitoring
2. d. Spans

3. b. Enhanced log analysis and filtering
4. b. Implement automated remediation for all issues. (NOT
a best practice)
5. c. To proactively detect and respond to issues
6. c. Correlating data for more effective troubleshooting
7. c. Define log retention policies based on analysis and
compliance requirements
Case studies
1. Implement structured logging to capture user interactions and
performance metrics. Set up custom metrics for page load
times and database latencies. Create alerting policies based on
custom metrics to detect latency spikes. Use trace data to
trace user requests and identify bottlenecks. Correlate log
data, metrics, and traces to pinpoint the root causes.
Implement optimizations based on analysis, such as database
query optimization.
2. Standardize log formats and instrumentation across both
cloud providers. Use Cloud Logging for log aggregation,
applying resource labels for source identification. Configure
log sinks to export logs from both providers to a centralized
location. Set up custom metrics and alerts in Cloud
Monitoring for cross-cloud resources. Instrument applications
with distributed tracing libraries to maintain trace context
across providers. Use trace correlation to analyze cross-cloud
interactions. Ensure consistent sampling rates for traces.
Create dashboards that display metrics, logs, and traces from
both providers for holistic visibility. Train teams on best
practices for multi-cloud observability.
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 101: CHAPTER 12 [Entropy: 0.49]

Hybrid and Multi
Cloud Strategies
Introduction
Want to unlock the full potential of cloud computing while
maintaining flexibility and control? In today's dynamic business
environment, a one-size-fits-all approach to cloud adoption may not
be enough. Hybrid and multi-cloud strategies have emerged as key
approaches to meet the evolving needs of organizations.
This chapter explores the concepts, objectives, and best practices
surrounding these strategies. We will learn strategies for seamlessly
integrating on-premises infrastructure, multiple cloud providers,
and the orchestration of workloads for enhanced agility and risk
mitigation.
Structure
Following is the structure of the chapter:
• Introduction to hybrid and multi-cloud
• Designing hybrid and multi-cloud architectures
• Security in hybrid and multi-cloud environments
• Automation and orchestration
• Best practices and future trends

Objectives
In this chapter, you will take a deep dive into the complexities of
hybrid and multi-cloud environments. This chapter will equip you
with a comprehensive overview of their benefits, challenges, and
best practices. You will grasp the fundamentals and gain a clear
understanding of the core concepts underlying hybrid and multicloud strategies, distinguishing them from traditional cloud
deployments. You will explore the advantages and challenges and
weigh the benefits and drawbacks of both approaches, considering
factors like cost, performance, security, and vendor lock-in. Further,
you will master the best practices and learn how to design,
implement, and manage hybrid and multi-cloud solutions
effectively, leveraging automation, security, and scalability
principles. You will gain real-world insights and explore practical
use cases and case studies to understand how organizations are
harnessing the power of hybrid and multi-cloud environments.
By the end of this chapter, you will be equipped with the knowledge
to make informed decisions about adopting hybrid or multi-cloud
strategies for your organization.
Introduction to hybrid and multi-cloud
Want to leverage the cloud's power while retaining control over
critical data? Navigating the cloud landscape requires
understanding the diverse deployment options available. While
cloud computing has become the dominant force in IT, it's not a
one-size-fits-all solution. Two distinct approaches—hybrid cloud
and multi-cloud—offer unique advantages and challenges. Choosing
the right path for your organization's needs is crucial for
maximizing the benefits of cloud computing and achieving your
business objectives.
Hybrid cloud
Hybrid cloud is a cloud computing model that combines onpremises infrastructure (your private cloud) with public cloud
resources provided by cloud service providers like AWS, Azure, or
Google Cloud. It is like having the best of both worlds, where you
can keep certain workloads and data on your own servers while

utilizing the scalability, agility, and specialized services of the
public cloud.
Following are the key characteristics of hybrid cloud:
• Integration: Hybrid cloud environments require seamless
integration between on-premises and cloud resources. This
integration allows data and applications to move securely
between both environments.
• Data and application mobility: The ability to move
workloads, data, and applications between on-premises and
cloud infrastructure is a fundamental aspect of hybrid cloud.
This mobility facilitates flexibility and optimization.
• Security and compliance: Hybrid cloud addresses security
and compliance concerns by enabling organizations to retain
control over sensitive data on-premises while utilizing the
enhanced security features offered by public cloud providers.
• Cost optimization: Organizations can leverage existing onpremises infrastructure and combine it with cost-effective
cloud resources. This can lead to cost savings without
compromising performance.
• Scalability and agility: Hybrid cloud environments provide
the agility to scale resources up or down based on demand,
ensuring that applications and services remain responsive
during peak times.
Multi-cloud
Multi-cloud is an approach to cloud computing where an
organization uses services and resources from multiple cloud
providers simultaneously. In essence, it is about not putting all your
digital eggs in one basket. Instead of relying exclusively on a single
cloud provider, you strategically distribute your workloads,
applications, and data across various cloud platforms. This approach
allows you to create a diverse ecosystem of cloud services, each
selected for its specific strengths and capabilities.
Following are the key characteristics of multi-cloud:
• Diversity: Multi-cloud environments incorporate services
from different cloud providers, such as AWS, Azure, Google
Cloud, and others. Each provider brings its own set of services,
pricing structures, and geographical coverage.

• Best-of-breed services: Multi-cloud enables you to select the
most suitable cloud service for each workload or application.
You can leverage the specialized features of different
providers to optimize performance and efficiency.
• Flexibility: With multi-cloud, you have the freedom to adapt
to changing requirements. You can easily switch between
providers or combine services to meet your evolving needs.
• Vendor neutrality: It allows you to avoid vendor lock-in,
which can occur when you rely solely on one cloud provider.
This neutrality provides you with more negotiating power and
control over your cloud strategy.
• Resilience and redundancy: Distributing your applications
and data across multiple cloud providers enhances your
overall system's resilience and fault tolerance. If one provider
experiences an outage, your services can continue running
from another.
In summary, multi-cloud embraces the diversity of cloud providers
to create a tailored ecosystem, while hybrid cloud unifies onpremises and cloud resources for enhanced flexibility and control.
Both approaches have their advantages, and the choice between
them depends on an organization's specific needs, regulatory
requirements, technical expertise, and overall cloud strategy.
Hybrid and multi-cloud offer powerful options for optimizing your
cloud deployment. Choosing the right path depends on your unique
needs and technical capabilities. Weigh your options carefully,
embrace the flexibility, and unlock the full potential of the cloud
ecosystem to empower your business.
Designing hybrid and multi-cloud architectures
Creating effective hybrid and multi-cloud architectures is not just
about combining different cloud services and on-premises resources
haphazardly. It requires careful planning, thoughtful design, and a
strategic approach to ensure that the resulting architecture meets
the organization's goals for flexibility, scalability, security, and cost
efficiency.
Following are the key considerations for designing hybrid and
multi-cloud architectures:
• Workload analysis: Start by assessing your organization's

---

## Sección 102: CHAPTER 12 [Entropy: 0.475]

workloads. Determine which applications and data are
suitable for the cloud, which should remain on-premises, and
which could benefit from a combination of both.
• Data integration: Plan how data will flow between onpremises 
systems 
and 
various 
cloud 
providers. 
Data
integration is a critical aspect, and you will need to consider
issues like data consistency, latency, and security.
• Security and compliance: Security is a top priority. Define
how you will secure data and applications across different
environments. Ensure compliance with industry regulations
and internal policies.
• Interoperability: 
Design 
your 
architecture 
with
interoperability in mind. Ensure that on-premises systems and
cloud services can communicate seamlessly. Standardized APIs
and protocols are essential.
• Cost Management: Cost optimization is crucial. Carefully
plan your resource allocation to avoid over-provisioning or
underutilization. Monitor and adjust your resources as needed
to control costs effectively.
• Redundancy and high availability: Ensure that your
architecture provides redundancy and high availability.
Distribute workloads across multiple regions and providers to
minimize the risk of downtime.
• Scalability: 
Design 
for 
scalability 
to 
handle 
varying
workloads. Use auto-scaling features in the cloud to adapt to
changing demand automatically.
• Disaster recovery: Develop a robust disaster recovery plan
that encompasses both on-premises and cloud resources. Test
your disaster recovery procedures regularly to ensure they
work as intended.
• Cloud service selection: Choose cloud services that align
with your specific use cases. Consider factors such as
performance, cost, and integration capabilities when selecting
cloud providers and services.
• Monitoring and management: Implement comprehensive
monitoring and management tools that provide visibility into
the entire hybrid and multi-cloud environment. This includes
monitoring performance, security, and compliance.
Following are the common hybrid and multi-cloud architectural

patterns:
• Hub-and-spoke: In this pattern, a central hub connects to
multiple spokes, representing different cloud providers or onpremises data centers. The hub serves as a control point for
data and application routing.
• Multi-cloud federation: Organizations use multiple cloud
providers independently but establish federation mechanisms
to manage user identities and access consistently across all
clouds.
• Data replication and backup: Data is replicated or backed
up across multiple cloud providers for data redundancy and
disaster recovery.
• Hybrid database: Some data resides in on-premises
databases, while other data is stored in cloud databases.
Hybrid databases allow applications to access both types of
data seamlessly.
• Content Delivery Networks: Content Delivery Networks
(CDNs) are used to cache and deliver content from the nearest
edge location, enhancing the performance of globally
distributed applications.
• Serverless and microservices: Architectures based on
serverless computing and microservices can be distributed
across 
different 
clouds 
to 
optimize 
performance 
and
scalability.
Effective hybrid and multi-cloud architecture design is essential for
realizing the benefits of flexibility, scalability, and cost efficiency.
Organizations must carefully assess their needs, security
requirements, and workload characteristics to create architectures
that align with their goals and optimize their cloud investments.
Let us delve into two real-world case studies that illustrate how
organizations strategically harness hybrid and multi-cloud
architectures to overcome challenges, boost agility, and optimize
their cloud investments.
Case study 1: ABC Corp Healthcare's hybrid healing
journey
ABC Corp Healthcare, a network of clinics dedicated to patient care,
faced a pivotal moment in its digital transformation journey. Their

patient care system, deeply rooted in on-premises infrastructure,
had served them well in maintaining control over sensitive medical
data. However, it became evident that they needed a more flexible
and scalable solution to meet the demands of a dynamic healthcare
landscape.
During flu seasons and public health crises, the sudden influx of
patients and data strained their on-premises infrastructure. Scaling
to accommodate the surge in appointments, medical records, and
diagnostic data was not only cumbersome but also slow. Innovation
was hampered by the lengthy deployment processes for new
applications, which meant that doctors could not access the latest
AI-powered diagnostics tools promptly. Additionally, the high
maintenance costs of their on-premises setup were becoming
increasingly unsustainable.
Recognizing these challenges, ABC Corp Healthcare decided to
embark on a hybrid cloud journey, strategically integrating Google
Cloud Platform (GCP) into their existing architecture. GCP's cloud
services offered a lifeline, providing scalable compute and storage
capabilities that seamlessly expanded and contracted with patient
demand. It was akin to having a flexible safety net during flu
outbreaks, ensuring that their systems never buckled under the
weight of increased patient data and appointment traffic.
One of the paramount concerns for ABC Corp was the security and
privacy of patient records. They wanted to ensure that sensitive
medical information remained securely protected within their onpremises infrastructure. The solution came in the form of a Virtual
Private Network (VPN) that established a secure and encrypted
communication link between their on-premises data center and the
Google Cloud.
The hybrid cloud approach transformed ABC Corp Healthcare's
operations in several profound ways. During flu seasons or public
health emergencies, they could effortlessly scale their virtual
machines on GCP, ensuring that their system remained responsive
and reliable. The deployment of new applications, equipped with
innovative AI tools for diagnosis, became a swift and efficient
process. Doctors now had access to powerful insights that improved
patient care.
Perhaps most notably, the pay-as-you-go model of GCP offered

---

## Sección 103: CHAPTER 12 [Entropy: 0.445]

significant cost savings compared to the fixed expenses associated
with their on-premises infrastructure. This newfound agility and
cost-efficiency empowered ABC Corp Healthcare to navigate the
ever-changing healthcare landscape with confidence, knowing that
their digital infrastructure could adapt to any challenge.
Case study 2: XYZ Corp multi-cloud shopping spree
XYZ Corp, a global retail giant with a formidable presence in the
physical world, found itself grappling with a different kind of
challenge. They had long relied on a single cloud provider (JTP
Cloud) for their cloud infrastructure, but this dependence came with
limitations. XYZ Corp lacked bargaining power and found
themselves restricted in terms of technology choices. Furthermore,
their resources were often underutilized in one region and
inaccessible to others, leading to inefficiency and wasted potential.
The management of multiple JTP environments independently
added complexity to their operations.
In response, XYZ Corp boldly embraced a multi-cloud strategy,
leveraging the strengths of both GCP and Amazon Web Services
(AWS). Their mission-critical applications found a secure and
scalable home in GCP, while regional workloads benefited from the
localized strengths of AWS in specific markets.
To simplify the management of resources across this diverse cloud
landscape, XYZ Corp adopted a centralized platform, Anthos.
Anthos provided a single pane of glass for monitoring and
controlling resources across both GCP and AWS, making it easier to
manage their multi-cloud environment efficiently.
The impact of this multi-cloud approach was transformative. XYZ
Corp gained the flexibility to choose the best cloud provider for
each workload based on performance, cost, and regional
requirements. They could now allocate resources dynamically,
ensuring that underutilized resources in one region could be
seamlessly shared with others, maximizing efficiency and reducing
waste. The centralized management provided by Anthos streamlined
their operations, reducing overhead and saving costs.
Perhaps one of the most significant advantages of this multi-cloud
strategy was XYZ Corp's newfound freedom from vendor lock-in.
They were no longer tethered to a single provider, which meant

greater flexibility and stronger negotiating power when it came to
cloud services.
In conclusion, the strategic adoption of a multi-cloud approach
allowed XYZ Corp to optimize its cloud resources, improve
efficiency, and enhance its competitive edge in the highly
competitive world of e-commerce. This case study showcases how
multi-cloud can be a game-changer for organizations looking to
maximize their cloud investments while minimizing risks associated
with vendor lock-in.Top of Form
Security in hybrid and multi-cloud environments
Ensuring the security of your hybrid and multi-cloud environments
is absolutely critical. With data distributed across various platforms
and providers, and data flows traversing public and private
networks, the attack surface becomes more complex. To maintain
the confidentiality, integrity, and availability of your systems and
data, a comprehensive security strategy is essential.
Security is paramount in hybrid and multi-cloud environments.
Following are the key security considerations that form the
foundation of a robust security strategy:
• Data encryption: Encrypt data at rest and in transit. Leverage
encryption services provided by cloud providers and ensure
that encryption keys are managed securely.
• Identity and Access Management: Implement robust
Identity and Access Management (IAM) policies to control
who has access to resources. Enforce the principle of least
privilege to minimize the risk of unauthorized access.
• Network security: Use firewalls, network segmentation, and
Virtual Private Clouds (VPCs) to isolate and protect
resources. Implement network monitoring and intrusion
detection systems.
• Authentication 
and 
authorization: 
Implement 
strong
authentication 
mechanisms, 
including 
multi-factor
authentication (MFA). Define clear authorization policies to
determine what users and applications can do within your
environment.
• Compliance: Ensure that your hybrid and multi-cloud
deployments adhere to regulatory compliance requirements

relevant to your industry. Cloud providers offer compliance
certifications that can help meet these standards.
• Logging and monitoring: Implement comprehensive logging
and 
monitoring 
solutions. 
Centralize 
logs 
from 
all
environments to detect and respond to security incidents
promptly.
• Incident response plan: Develop an incident response plan
that outlines procedures for identifying, reporting, and
mitigating security incidents. Regularly test and update this
plan.
• Patch management: Keep all systems and software up to date
with security patches. This applies to both on-premises and
cloud-based resources.
• Data Loss Prevention: Implement Data Loss Prevention
(DLP) policies to prevent unauthorized data exfiltration or
leakage. Use content inspection and policy enforcement
mechanisms.
• Third-party security: Assess the security practices of thirdparty vendors and services integrated into your hybrid and
multi-cloud environments. Ensure they meet your security
standards.
Common security challenges
While hybrid and multi-cloud environments offer numerous
benefits, they also present unique security challenges.
Following are the common security challenges that organizations
encounter and how to address them effectively:
• Visibility: Maintaining visibility across multiple cloud
providers and on-premises resources can be challenging.
Implementing centralized monitoring and security solutions is
crucial.
• Identity management: Managing identities consistently
across hybrid and multi-cloud environments can be complex.
Implement Single Sign-On (SSO) and IAM solutions to
streamline identity management.
• Compliance: 
Ensuring 
compliance 
across 
diverse
environments and meeting specific regulatory requirements
can be daunting. Cloud providers offer compliance tools and
services to simplify this task.

---

## Sección 104: CHAPTER 12 [Entropy: 0.515]

• Data protection: Protecting data consistently across onpremises and cloud environments requires a unified approach
to encryption, access control, and DLP.
• Misconfigurations: Misconfigurations in cloud resources can
lead to security vulnerabilities. Regularly audit configurations
and use security automation tools to enforce best practices.
• Vendor lock-in: Avoiding vendor lock-in while maintaining
security can be challenging. Use standardized security
practices and ensure data portability.
Automation and orchestration
Managing hybrid and multi-cloud environments can be complex.
Manually configuring and deploying resources across different
platforms often leads to inconsistencies, errors, and wasted time.
Automation and orchestration play pivotal roles in streamlining
operations, enhancing efficiency, and ensuring consistency. These
practices allow organizations to harness the full potential of cloud
resources while maintaining control, scalability, and security across
diverse infrastructure landscapes. Many of the topics discussed here,
such as identity management, security, disaster recovery,
compliance, network security, etc., have been covered in detail in
previous chapters.
In the intricate landscape of hybrid and multi-cloud environments,
mastering automation and orchestration is the key to achieving
seamless resource management, scalability, and operational
excellence.
Following are some key aspects of automation and orchestration in
the context of hybrid and multi cloud:
• Infrastructure as Code: Implement Infrastructure as Code
(IaC) principles to define and provision infrastructure using
code. Tools like Terraform and Cloud Deployment Manager
enable the automated creation and management of resources.
• Configuration management: Use configuration management
tools like Ansible, Puppet, or Chef to automate the
configuration and maintenance of servers and applications
across hybrid environments.
• Workflow automation: Build automated workflows that span
across cloud providers and on-premises resources. Tools like

Apache Airflow and Kubernetes can help orchestrate complex
processes.
• Monitoring and remediation: Automate the monitoring of
cloud resources and trigger automated remediation actions in
response to predefined conditions or security incidents.
• Scaling and load balancing: Set up auto-scaling policies and
load balancers to automatically adjust resources based on
demand, ensuring optimal performance and cost-efficiency.
• Backup and disaster recovery: Automate backup processes
and disaster recovery plans to safeguard data and ensure
business continuity.
• Security automation: Implement security automation to
detect and respond to threats in real-time. Tools like Security
Information and Event Management (SIEM) systems can
help automate threat detection and incident response.
• Compliance automation: Utilize automation to enforce
compliance policies and audit configurations regularly to
ensure adherence to security standards.
Following are the benefits of efficient automation and orchestration
in hybrid/multi cloud architecture:
• Efficiency: Automation reduces manual tasks, accelerates
resource provisioning, and minimizes errors, leading to
improved operational efficiency.
• Consistency: Automated processes ensure that configurations
are consistent across hybrid and multi-cloud environments,
reducing security risks.
• Scalability: Automation allows for easy scaling of resources to
meet changing demands without human intervention.
• Cost optimization: By optimizing resource allocation and
eliminating unnecessary manual tasks, automation can lead to
cost savings.
• Faster response: Automated monitoring and remediation
enable rapid response to security incidents and performance
issues.
While automation and orchestration bring transformative
advantages, navigating the intricate terrain of hybrid and multicloud environments is not without its unique set of challenges and
considerations, as follows:

• Navigating the complexities of a diverse landscape:
○ Heterogeneous environments: Orchestrating workflows
across disparate cloud providers and on-premises systems
presents unique challenges. Tasks often involve distinct
APIs, tools, and security models, requiring careful planning
and integration strategies.
○ Visibility and control: Maintaining clear visibility into
automated processes and enforcing consistent controls
across multiple environments can be difficult. Centralized
monitoring and governance frameworks are essential to
ensure compliance and mitigate risks.
○ Data governance: Automation must uphold data privacy
and compliance requirements, especially when handling
sensitive information across different jurisdictions and
cloud providers.
• Building secure and reliable automation:
○ Security by design: Incorporate security measures at the
foundation of automation initiatives. Implement robust
authentication, authorization, and encryption mechanisms
to protect sensitive data and resources.
○ Vulnerability management: Regularly assess automation
scripts and tools for potential vulnerabilities and implement
timely patching to safeguard against exploitation.
○ Least privilege principle: Enforce the principle of least
privilege for automated processes, granting only the
minimum permissions necessary to execute tasks.
• Developing the right skillset:
○ Cross-cloud expertise: Organizations need individuals
skilled in automation tools and best practices, as well as indepth knowledge of different cloud platforms and their
unique APIs and security models.
○ Collaboration 
and 
communication: Effective
collaboration 
between 
automation 
engineers, cloud
architects, security teams, and developers is crucial for
seamless integration and risk mitigation.
• Ensuring seamless integration:
○ API compatibility: Verify that automation tools and scripts
can effectively interact with the diverse APIs of different

cloud providers and on-premises systems.
○ Data exchange standards: Establish clear data exchange
standards and protocols to ensure smooth data flow and
prevent compatibility issues.
• Continuous monitoring and validation:
○ Proactive 
monitoring: Implement 
comprehensive
monitoring solutions to track the performance and health of
automated processes, identify anomalies, and trigger alerts
for timely intervention.
○ Regular testing and validation: Conduct regular testing
and validation of automated workflows to ensure they
function as intended and maintain compliance with security
and governance requirements.
• Additional considerations:
○ Standardization: Promote standardization of automation
tools 
and 
practices 
across 
hybrid 
and 
multi-cloud
environments to streamline management and reduce
complexity.
○ Governance: Establish clear governance frameworks to
define roles, responsibilities, and approval processes for
automation initiatives.
○ Change 
management: Implement 
robust 
change
management procedures for automated processes to ensure
controlled updates and minimize disruption.
In hybrid and multi-cloud environments, automation and
orchestration are essential components of a successful cloud
strategy. These practices enable organizations to harness the full
potential of cloud resources while maintaining control, efficiency,
and security across diverse infrastructure landscapes.
Best practices
• Strategy and planning:
○ Clearly define your goals: What are you hoping to achieve
by adopting a hybrid or multi-cloud strategy? Cost
savings, increased agility, improved performance, or data
sovereignty? Understanding your priorities will guide your
approach.

---

## Sección 105: CHAPTER 12 [Entropy: 0.295]

○ Evaluate your existing infrastructure: Analyze your
current on-premises systems and cloud deployments to
identify opportunities for optimization and integration.
○ Consider business requirements: Different applications
and workloads have diverse needs. Match them to the most
suitable 
cloud 
environment 
based 
on 
factors 
like
latency, security, and cost.
○ Understand vendor lock-in: Avoid becoming overly
reliant on a single cloud provider. Design your architecture
for portability and leverage multi-cloud tools when
possible.
○ Develop a governance framework: Establish clear policies
and procedures for managing, securing, and governing your
hybrid/multi-cloud environment.
• Architectures design:
○ Focus on business continuity: Design your architecture
for resilience, with redundancy and disaster recovery plans
in place across cloud and on-premises environments.
○ Optimize 
for 
performance: Consider
latency, bandwidth, and 
resource 
availability 
when
choosing cloud providers and designing your network
topology.
○ Security by design: Integrate security principles from the
start, including 
data 
encryption, access 
controls, and
intrusion detection systems.
○ Embrace 
microservices: Break 
down 
monolithic
applications 
into 
smaller, interconnected 
services 
for
increased agility and scalability across clouds.
○ Utilize containers: Leverage containerization technologies
like Docker and Kubernetes to facilitate application
portability and deployment across hybrid environments.
• Security in hybrid and multi-cloud environments:
○ Zero trust model: Implement a Zero Trust security model
where trust is never assumed, and verification is required
from anyone trying to access resources.
○ Risk assessment: Begin with a thorough risk assessment to
understand your organization's unique security needs and
challenges in the hybrid and multi-cloud landscape.

○ Identity and Access Management: Implement robust IAM
policies, including the principle of least privilege, to control
access to resources effectively.
○ Encryption: Prioritize encryption for data at rest and in
transit, and ensure secure key management practices are in
place.
○ Network segmentation: Use network segmentation and
VPCs to isolate resources and protect against unauthorized
access.
○ Compliance monitoring: Continuously monitor and audit
your hybrid and multi-cloud environments to ensure
compliance 
with 
relevant 
industry 
standards 
and
regulations.
○ Incident response: Develop a robust incident response
plan that outlines steps for identifying, reporting, and
mitigating security incidents promptly.
○ Third-party assessments: Regularly assess the security
practices of third-party vendors and services integrated into
your environment to mitigate potential risks.
○ Security training: Invest in security training and
awareness programs for your teams to stay vigilant against
emerging threats.
○ Security automation: Leverage automation for threat
detection, incident response, and routine security tasks to
enhance your security posture.
• Automation and orchestration:
○ Start small and scale gradually: Begin with automating
simple 
tasks 
and 
workflows, then 
gradually 
extend
automation to more complex processes.
○ Clear objectives: Define clear objectives for automation
and orchestration initiatives, aligning them with your
business goals.
○ Comprehensive 
strategy: 
Develop 
a 
comprehensive
strategy that considers the scope, scale, and complexity of
your hybrid and multi-cloud environment.
○ Tool selection: Choose automation and orchestration tools
that fit your organization's needs and integrate well with
your existing infrastructure.

○ Standardize processes: Streamline workflows before
automation to prevent unnecessary complexity.
○ Version control: Apply version control to automation code
and scripts to track changes and maintain consistency.
○ Collaboration: Foster collaboration between IT operations,
development, and other relevant teams to ensure effective
communication.
○ Security integration: Integrate security into all aspects of
automation and orchestration, following secure coding
practices and conducting regular security testing.
○ Continuous monitoring: Set up monitoring and alerting
systems to track the performance and health of automated
processes and address issues promptly.
○ Thorough 
documentation: 
Maintain 
detailed
documentation for all automated processes and workflows,
keeping it accessible and up-to-date.
○ Team education: Invest in training and development to
ensure your team has the skills and knowledge needed for
successful automation implementations.
○ Cost management: Monitor and manage the costs
associated with automation to ensure it remains costeffective.
○ Review and optimization: Periodically review and
optimize your automation and orchestration processes to
improve efficiency.
○ Agility: Be prepared to adapt your automation strategy as
your organization's needs and technologies evolve.
Conclusion
In this chapter, we explored hybrid and multi-cloud strategies. We
learned that the hybrid cloud creates a bridge between on-premises
infrastructure and public cloud services, offering flexibility and
security. In contrast, multi-cloud empowers organizations to
leverage the strengths of various cloud providers for diverse needs.
We emphasized the importance of security in these environments
and discussed key considerations, such as identity management,
encryption, and compliance monitoring. We also highlighted the

benefits and best practices of automation and orchestration.
As you navigate the cloud ecosystem, whether through hybrid or
multi-cloud approaches or by embracing automation, remember
that these strategies offer immense potential for your organization.
By adhering to best practices, you can harness this potential
effectively.
Multiple choice questions
1. What is the primary benefit of a hybrid cloud approach?
a. Flexibility and scalability
b. Best-of-breed services
c. Avoiding vendor lock-in
d. None of the above
2. Which strategy empowers organizations to pick and
choose services from various cloud providers?
a. Hybrid cloud
b. Single cloud
c. Multi-cloud
d. On-premises
3. What is one key aspect of automation in hybrid and
multi-cloud environments?
a. Monitoring and remediation
b. Compliance automation
c. Standardization of processes
d. Identity and Access Management
4. Why is it important to implement version control for
automation scripts?
a. To track changes and maintain consistency

---

## Sección 106: CHAPTER 12 [Entropy: 0.25]

b. To monitor resource usage
c. To improve network security
d. To reduce latency
5. What is the Zero Trust security model based on?
a. Trusting all internal users by default
b. Trusting all external users by default
c. Not trusting any users or resources by default
d. Trusting all cloud providers by default
6. Which cloud strategy offers the flexibility of public
clouds while maintaining control over sensitive data onpremises?
a. Multi-cloud
b. Single cloud
c. Hybrid cloud
d. On-premises
Answer key
1. a. Flexibility and scalability
2. c. Multi-cloud
3. a. Monitoring and remediation
4. a. To track changes and maintain consistency
5. c. Not trusting any users or resources by default
6. c. Hybrid cloud
Join our book’s Discord space
Join the book's Discord Workspace for Latest updates, Offers, Tech
happenings around the world, New Release and Sessions with the
Authors:
https://discord.bpbonline.com

---

## Sección 107: CHAPTER 13 [Entropy: 0.515]

Exam Preparation and
Tips
Introduction
Ready to become a certified Google Cloud Professional Cloud
Architect? This chapter is your roadmap to success. We'll guide you
through the certification process, providing expert insights and
practical strategies to help you ace the exam. From core
architectural principles to real-world implementation scenarios,
you'll gain the knowledge and confidence to design, develop, and
manage robust and scalable solutions on GCP.
Beyond mere exam preparation, this chapter aims to provide a
nuanced understanding of the core competencies expected of a GCP
Professional Cloud Architect. You will explore the exam objectives
in detail, decluttering complex concepts through real-world case
studies and best practices. Whether you are a seasoned IT
professional or a newcomer to the cloud realm, this roadmap caters
to your individual needs and aspirations.
Structure
Following is the structure of the chapter:
• Understanding Professional Cloud Architect certification
• Study resources and material

• Mock tests and practice exercises
• Exam day strategies
• Post-exam steps
Objectives
By the end of this chapter, you will be acing GCP certification exam
validates your expertise and opens doors to exciting career
opportunities. This chapter equips you with the essential tools,
resources, and knowledge to confidently navigate the exam process.
We will delve into various aspects to ensure you are fully prepared.
We will learn the exam format and objectives. We will begin by
thoroughly dissecting the exam format, including question types,
duration, and scoring criteria. Additionally, we will explore the
specific objectives evaluated by each GCP certification, ensuring
you understand the core knowledge areas you need to master. You
will be able to identify the best study materials by selecting the
right study materials is paramount for exam success. We'll navigate
various resources offered by Google, including official
documentation, hands-on labs, and video tutorials. We will also
explore valuable third-party resources like practice exams and study
guides to create a well-rounded learning plan. You will understand
the study strategies by developing a personalized study strategy is
crucial for efficient knowledge retention. We will explore various
techniques to maximize your learning potential, such as time
management methods, active learning approaches, and knowledge
consolidation strategies. You will know about mock tests and
practice exercises, Practice makes perfect! We will emphasize the
importance of utilizing mock tests and practice exercises to simulate
the actual exam experience. These tools will help you identify your
strengths and weaknesses, allowing you to focus your efforts on
areas requiring additional attention. Finally, you will master exam
question techniques which is beyond simply possessing knowledge,
exam success often hinges on effective test-taking strategies. We'll
equip you with valuable tips and techniques for approaching
different question formats, managing exam time efficiently, and
avoiding common pitfalls.
By following this comprehensive roadmap, you will transform exam
preparation from a daunting task into a confident stride towards

GCP certification success.
Understanding Professional Cloud Architect
certification
The GCP Professional Cloud Architect certification exam is designed
to assess your knowledge and expertise in designing, developing,
and managing robust, secure, scalable, highly available, and
dynamic solutions to drive business objectives on GCP.
The key aspects of the exam are as follows:
• Format: The exam is primarily multiple-choice and multipleselect format. It is conducted either online or in a test center.
• Duration: The exam typically lasts two hours (120 minutes).
• Language: Offered in English, Japanese, Spanish, and
Portuguese.
• Scope: The exam covers a broad range of topics related to
cloud architecture on GCP, from designing and planning a
cloud solution architecture to managing and provisioning the
cloud solution infrastructure.
Certification objectives
The exam tests a variety of skills and knowledge areas, broadly
categorized into the following domains:
• Designing and planning a cloud solution architecture:
Involves analyzing and defining technical and business
processes, designing for security and compliance, and
analyzing and optimizing technical and business processes.
• Managing and provisioning a solution infrastructure:
Focuses on configuring network topologies, ensuring data
storage and database services are optimally implemented, and
managing the cloud solution infrastructure.
• Designing for security and compliance: Tests your ability to
design for security, ensure compliance, and manage access and
security.
• Analyzing 
and 
optimizing 
technical 
and 
business
processes: Involves analyzing and defining technical and
business processes, and ensuring solutions and operations are
optimized for cost and performance.

• Managing 
implementation: 
Tests 
skills 
in 
advising
development/operation teams and ensuring solution and
operations reliability.
Expanding on Exam Preparation: Deepen your knowledge and
hone your skills
To become a real cloud guru and truly excel in the exam, it is highly
recommended to go beyond surface-level knowledge. Strive for a
thorough grasp of core GCP concepts and how they interconnect
within each domain. Following are some effective strategies to
achieve this:
• Comprehensive understanding:
○ Go 
beyond 
surface 
knowledge. Aim 
for 
thorough
understanding of core concepts and their interrelationships
within each domain.
○ Dive into white papers, research papers, and technical blog
posts to gain deeper insights into specific areas.
○ Attend webinars and online conferences hosted by Google
Cloud specialists to acquire fresh perspectives and industry
trends.
○ Consider enrolling in comprehensive training courses that
offer structured learning paths and hands-on labs.
• Practical experience:
○ Hands-on experience is your best weapon. Do not be afraid
to roll up your sleeves and experiment with GCP in your
own environment.
○ Build personal projects, participate in hackathons, and
contribute to open-source projects within the GCP
ecosystem.
○ Familiarize yourself with deploying applications to the
cloud, managing virtual machines and containers, and
implementing security best practices.
○ Leverage platforms like Qwiklabs or Google Cloud Shell to
gain access to GCP resources for experimentation without
financial commitment.
• Resources for preparation:
○ Official exam guide: This document provided by Google is

---

## Sección 108: CHAPTER 13 [Entropy: 0.445]

your definitive source of information on the exam
content, format, and weighting of each domain. Treat it as
your roadmap and analyze it thoroughly.
○ GCP documentation: Extensive documentation covering
every aspect of GCP services, APIs, and best practices is
readily available from Google. Use it as your reference bible
and actively search for relevant topics as you delve deeper
into specific areas.
○ Case studies: Learn from real-world scenarios showcased
by Google. Analyze how successful companies leverage GCP
to address specific challenges and derive inspiration for
your own preparation.
○ Best 
practices: Familiarize 
yourself 
with 
Google's
recommended 
best 
practices 
for 
cloud
architecture, security, operations, and 
cost
optimization. These insights will equip you to make
informed decisions during the exam.
○ Community resources: Join online forums, engage with
fellow 
GCP 
enthusiasts, and 
participate 
in
discussions. Learn from others' experiences, share your own
challenges, and stay updated on the latest developments in
the GCP ecosystem.
• Bonus tips:
○ Take practice exams and online quizzes to assess your
knowledge and identify areas for improvement.
○ Create study groups with fellow GCP aspirants to motivate
each other and share learning resources.
○ Develop a personalized study plan and allocate dedicated
time for consistent preparation.
○ Do not underestimate the importance of good sleep and
stress management; a clear mind performs optimally.
Remember, the key to exam success lies in building a strong
foundation of theoretical knowledge coupled with practical
experience. Leverage the diverse resources at your disposal, stay
focused, and maintain a positive attitude throughout your
preparation journey.
Study resources and material

Preparing for the GCP Professional Cloud Architect certification
requires a blend of theoretical knowledge and practical experience.
Official resources and hands-on practice
A strong foundation in GCP concepts is essential for exam success.
This foundation goes beyond rote memorization of individual
services. It's essential to understand how these services work
together to design, deploy, and manage secure, scalable, and costeffective solutions on GCP. We will explore two crucial aspects of
building this foundation that will enable you to not only ace the
exam but also thrive in your GCP career, as follows:
• Google Cloud documentation: This vast repository of
knowledge is your go-to for in-depth exploration of every GCP
service, API, and best practice. Dive into specific sections
relevant to the Cloud Architect exam, such as:
○ Cloud Architecture: 
https://cloud.google.com/architecture
○ Designing for Security and Compliance: 
https://cloud.google.com/security/compliance
○ Managing Solutions and Operations: 
https://cloud.google.com/solutions
• Coursera and Pluralsight courses: Google partners with
these e-learning platforms to offer structured courses tailored
for the Cloud Architect exam. Benefit from expert-led content
and interactive learning experiences.
• Qwiklabs: This hands-on lab platform provides a real-world
environment to practice GCP skills and solidify your
understanding. Engage in guided labs across various cloud
technologies.
• Google Cloud skills boost: Accessible directly within the GCP
console, this platform offers curated learning tracks, hands-on
labs, and skill assessments to accelerate your learning journey.
• Google Cloud certification exam guide: This official
document outlines the exam's format, topics covered, and
provides sample questions. Download it for a comprehensive
overview of the exam structure and expectations.
The hands-on practices are as follows:

• GCP free tier and projects: Utilize the free tier to gain handson experience without financial commitment. Experiment with
building 
simple 
web 
applications, deploying 
serverless
functions, or exploring data analytics services.
• GitHub 
repositories: Immerse 
yourself 
in 
open-source
projects 
built 
on 
GCP. Analyze 
well-documented
code, contribute to existing projects, or create your own to
showcase your skills and understanding. Here are a few
popular repositories to explore:
○ GoogleCloudPlatform/terraform-google-examples: 
https://github.com/GoogleCloudPlatform/terraformgoogle-examples
○ GoogleCloudPlatform/python-docs-samples: 
https://github.com/GoogleCloudPlatform/python-docssamples
○ GoogleCloudPlatform/java-docs-samples: 
https://github.com/GoogleCloudPlatform/java-docssamples
Books, online resources, and community support
While official Google Cloud resources provide a solid foundation,
going beyond them can significantly enrich your exam preparation
and broaden your understanding of GCP.
Following are some valuable third-party resources, online
communities, and book recommendations to enrich your learning
experience further:
• Supplementing your knowledge:
○ Official Google Cloud Certified Professional Cloud
Architect Study Guide by Dan Sullivan: This wellregarded study guide provides comprehensive coverage of
the exam domains, offering clear explanations, practice
questions, and valuable insights.
○ Online forums and study groups: Platforms like Reddit's
r/GoogleCloud, LinkedIn 
groups, and 
dedicated 
forum
channels like GCPZone or Cloud Academy can be valuable
sources of peer-to-peer learning. Connect with fellow
aspirants, share experiences, and benefit from the wisdom

of experienced cloud architects.
• Testing your readiness:
○ Whizlabs 
and 
Braincert: These 
platforms 
offer
comprehensive practice exams that mimic the format and
difficulty of the real test. Use them to evaluate your
knowledge, identify weak areas, and build test-taking
confidence.
○ Cloud 
Assess 
and 
MeasureUp: Explore 
additional
platforms providing practice exams alongside detailed score
reports and performance analysis. They offer another angle
to assess your preparedness and refine your study strategy.
• Engaging with the community:
○ GCP meetups and user groups: Immerse yourself in the
local GCP community by attending in-person meetups or
online sessions. Network with industry professionals, learn
from expert talks, and participate in interactive discussions.
○ Online tech communities: Connect with a broader
network of cloud enthusiasts via platforms like Stack
Overflow, the GCP Community Slack channel, or specific
Discord 
servers 
catering 
to 
GCP 
architects. Ask
questions, share challenges, and tap into the collective
knowledge of the community.
• Staying informed and inspired:
○ GCP's official YouTube channel: This channel hosts a
wealth of technical videos, webinars, and live sessions
covering various GCP topics. Subscribe and delve into
specific playlists geared towards cloud architects, like the
Architecting on Google Cloud series.
○ Independent educators and experts: Individuals like A
Cloud 
Guru, Linux 
Academy, or 
Julian 
Wood 
have
established impressive YouTube channels and online course
platforms. Their 
engaging 
tutorials, exam 
preparation
tips, and insightful presentations can keep you motivated
and informed.
Using a combination of these resources will give you a well-rounded
preparation, covering both the theoretical aspects of the exam
syllabus and the practical application of GCP skills. Make sure to
allocate time to each aspect of your study, balancing reading,
watching tutorials, and, most importantly, applying this knowledge

---

## Sección 109: CHAPTER 13 [Entropy: 0.49]

in practical scenarios.
Mock tests and practice exercises
Preparing for the GCP Professional Cloud Architect certification
involves more than just understanding theoretical concepts; it is
also about applying that knowledge in a test-like environment. This
is where mock tests and practice exercises play a crucial role.
Following are the reasons why mock tests matter:
• Exam familiarity: They are your dress rehearsal for the real
deal. You will experience the question formats, answer
types, and even the time constraints firsthand, reducing
potential surprises on the actual exam day.
• Self-assessment 
sensei: Mock 
tests 
act 
like 
insightful
mirrors, reflecting your strengths and weaknesses in each
domain. Identify areas where your knowledge shines and
pinpoint topics needing extra attention.
• Time management masterclass: With each practice test, you
will sharpen your time management skills. Learn to prioritize
questions, allocate time strategically, and avoid the dreaded
feeling of rushing through the exam.
• Anxiety antidote: By taking multiple mock tests, you will
gradually become accustomed to the exam environment. This
familiarity breeds confidence, reducing anxiety and allowing
you to approach the real exam with a calm and focused mind.
Following are the ways for finding quality mock tests:
• Official GCP practice exam: Start with the practice exam
provided by Google. It is designed to mirror the format of the
actual certification exam.
• Online platforms: Websites like Whizlabs, BrainCert, and
Udemy offer mock tests that are crafted to simulate the exam
environment closely.
• Study guides and books: Some study guides include practice
tests as part of their resources.
Mock tests are undeniably valuable for assessing your knowledge
base, but true mastery comes from applying theoretical knowledge
to solve real-world problems. Here's where hands-on practice
becomes crucial. Qwiklabs, a Google Cloud-sponsored platform,

provides an exceptional environment for precisely this purpose as
follows:
• Qwiklabs:
○ Step into a simulated GCP environment: Qwiklabs offers
a vast library of hands-on labs covering various GCP
services and tasks. Think virtual machine deployment, data
analysis pipelines, or containerized applications – all
practiced in a safe and controlled environment.
○ Learn by doing, refine by iterating: Each lab guides you
through specific steps, allowing you to experiment, make
mistakes, and 
learn 
from 
them 
without 
real-world
consequences. Iterate 
on 
your 
solutions, refine 
your
skills, and build real-world confidence.
○ Challenge yourself with diverse scenarios: Choose from
beginner-friendly to advanced labs, tackling increasingly
complex scenarios that mimic real-world challenges faced
by Cloud Architects. Test your ability to design, deploy, and
manage solutions in a realistic context.
• GCP projects:
○ Conceptualize, build, and deploy: Unleash your inner
architect! Craft your own GCP projects, from simple web
applications to complex data pipelines. Choose your
tools, design the architecture, and bring your vision to life.
○ Grapple 
with 
real-world 
constraints: Manage
budgets, optimize resource utilization, and troubleshoot
issues – the practical challenges of implementing solutions
in GCP become your learning fuel. You will gain invaluable
experience in decision-making and problem-solving, skills
crucial for the Architect role.
○ Showcase your expertise by building a portfolio: As you
complete projects, document your processes, and analyze
your results. This portfolio not only demonstrates your
skills to potential employers but also serves as a tangible
testament to your practical GCP knowledge.
• GitHub projects:
○ Dive into open-source goodness: Explore a wealth of
GCP-related projects on GitHub. Contribute to existing
projects, learn 
from 
code 
written 
by 
experienced
architects, and gain insights into different approaches and

best practices.
○ Sharpen your problem-solving skills: Collaborate with
other developers to tackle project challenges. Learn from
their perspectives, refine your communication skills, and
gain valuable experience in working as part of a team – an
essential skill for any Cloud Architect.
○ Stay updated and inspired: Immerse yourself in the
dynamic world of open-source GCP development. Explore
trending projects, discover new tools and technologies, and
constantly challenge yourself to learn and grow.
Remember, successful architects understand that theoretical
knowledge is just the foundation. By actively engaging in practical
exercises, you elevate your learning experience, build the
confidence to apply your skills in real-world scenarios, and truly
prepare yourself for the challenges and rewards of a career as a GCP
Professional Cloud Architect.
Taking a mock test is just the first step, the real learning magic
happens afterwards.
Following is how to transform every test into a springboard for
success:
• Review answers:
○ Do not simply glance at your score and move on. Dive into
the details. Thoroughly review each answer, especially the
ones marked wrong. Analyze why you chose those
options, identify knowledge gaps, and pinpoint areas where
your understanding might be shaky.
○ Revisit the relevant study materials. Do not be afraid to
revisit sections of the documentation, reread chapters in
your study guide, or rewatch specific video lectures to
solidify your understanding and ensure the same mistake
does not trip you up again.
• Track progress:
○ Scores are more than just numbers; they are valuable data
points reflecting your progress. Keep track of your scores in
each mock test, noting improvements in specific domains or
consistent weaknesses in others. This data becomes your
personalized roadmap, highlighting areas where you are
excelling and pinpointing topics requiring extra attention.

○ Celebrate 
your 
progress. Acknowledge 
your
improvements, no matter how small. It takes dedication
and effort to climb the knowledge ladder, and recognizing
your own growth can keep you motivated and focused on
your goal.
• Focus on weak areas:
○ Do not get stuck in a loop of repeating the same
mistakes. Use your mock test results to strategically allocate
your study time. Dedicate more focus to topics where your
scores consistently lag behind. Do not neglect your
strengths, but prioritize filling those knowledge gaps and
ensuring you are well-rounded in all domains covered by
the exam.
○ Experiment with different learning methods. If traditional
reading is not cutting it, try hands-on labs, interactive
quizzes, or video tutorials. Find the learning style that
resonates 
with 
you 
and 
makes 
information
stick, transforming weak areas into your new areas of
expertise.
From feedback to action
Mock tests offer more than just a score; they offer invaluable
insights into your strengths and weaknesses.
Following is how to weave those insights into the fabric of your
study plan:
• Revisit your learning resources: Use the feedback from your
mock tests to reassess your chosen study materials. If there are
specific books or websites that seem less effective for certain
topics, consider 
exploring 
alternative 
resources 
or
supplementing your existing ones with targeted content that
addresses your specific needs.
• Rethink your study strategies: If your current study
approach is not yielding the desired results, do not be afraid
to experiment. Maybe you need to break down complex topics
into smaller chunks, create flashcards for key concepts, or join
a study group for peer-to-peer learning. Find the strategies
that work best for you and maximize your learning efficiency.

---

## Sección 110: CHAPTER 13 [Entropy: 0.53]

• Seek guidance and support: Do not hesitate to reach out to
mentors, instructors, or 
online 
communities 
for

help. Discussing 
your 
challenges 
and 
weaknesses 
with
experienced professionals can offer valuable insights and
guidance, propelling you on your journey to mastery.
Remember, analyzing mock test results and incorporating feedback
into your study plan is an iterative process. Each test offers a new
opportunity for growth, so embrace the learning journey, be willing
to adapt, and continuously refine your approach. With dedication
and a strategic focus on your weak areas, you will transform those
red marks into green lights, confidently facing the GCP Professional
Cloud Architect certification and paving the way for a successful
career in the cloud.
Exam day strategies
The day of your GCP Professional Cloud Architect exam is crucial.
How you approach this day can significantly impact your
performance.
Following are strategic tips to help you maximize your success on
the exam day:
• Night before the exam:
○ Rest well: Ensure you get a good night's sleep. Being wellrested is essential for peak mental performance.
○ Review key points: Briefly go over your notes, focusing on
key concepts and areas you found challenging. Avoid deep
diving into new topics.
Prepare your documents: Make sure you have all necessary
IDs and documents ready for the exam. Check the exam
guidelines for any specific items you need to bring.
• During the exam:
○ Read with intent: Read each question thoroughly, paying
close attention to keywords and details. Avoid rushing
through questions, as you might miss crucial information.
○ Time keeper: Stay aware of the time allotted for the
exam. Allocate your time strategically, moving through
questions efficiently without spending too long on any
single one.
○ Master 
of 
elimination: For 
multiple-choice
questions, employ elimination techniques. Cross out options

that are clearly incorrect, narrowing down your choices and
increasing your chances of selecting the right answer.
○ Flag and return: If you encounter a question that stumps
you, do not panic. Mark it for review and move on to other
questions. You can revisit flagged questions later if time
permits.
○ Mindfulness in action: If you feel overwhelmed or
anxious, take a brief moment to breathe deeply and
refocus. Engage in positive self-talk, reminding yourself of
your preparation and ability to succeed.
• After completing the exam:
○ Review 
and 
reflect: If 
time 
allows, review 
your
answers, especially those you marked for review. Doublecheck calculations and ensure you have addressed all parts
of each question.
○ Finish with confidence: Once you have completed the
exam 
to 
the 
best 
of 
your 
ability, submit 
it
confidently. Avoid dwelling on past questions or secondguessing your choices.
• Post-exam:
○ Review and reflect: Regardless of the outcome, take time
to reflect on the exam experience. Identify areas where you
excelled and areas that could benefit from further
study. This reflection aids in future exam preparation and
continuous learning.
○ Celebrate your efforts: Acknowledge the hard work and
dedication you put into preparing for the exam. Celebrate
your perseverance and commitment to growth.
Remember, the key to succeeding on the exam day is a combination
of thorough preparation, effective time management, and
maintaining a calm, focused mindset. Approach the exam with
confidence, knowing that you have prepared diligently.
Post-exam steps
Acing the GCP Professional Cloud Architect exam is a remarkable
achievement. But regardless of the outcome, this is just the
beginning of your journey as a GCP professional. Keeping that in
mind, following are some next steps to take:

1. Awaiting results:
• Result timeline: Typically, results for the GCP certification
exams are released shortly after the exam. Check the specific
timeline provided by Google for your exam.
• Check email and certification account: Results are usually
sent via email or can be accessed through your certification
account.
2. Once you pass:
• Celebration: First and foremost, take a moment to celebrate
your accomplishment. It is a significant achievement that
deserves recognition.
• Certificate and digital badge: You will receive a digital
certificate and badge from Google. Make sure to add these to
your professional profiles, such as LinkedIn, to enhance your
professional credibility.
• Continuing education: Look into continuing education
opportunities. GCP is constantly evolving, and staying up-todate with the latest technologies and certifications can benefit
your career.
• Networking: 
Join 
cloud 
computing 
or 
GCP-specific
professional groups and forums. Networking with other
professionals can open up opportunities for learning and
career advancement.
• Applying knowledge: Start applying your new knowledge
and skills in your current role, or look for new roles that
leverage your GCP expertise.
3. If you do not pass:
• Analyzing performance: Review the feedback provided by
the exam to understand areas of weakness. This insight is
invaluable for your study plan.
• Revising study plan: Adjust your study plan to focus on areas
where you need improvement. Consider different learning
materials or methods that might work better for you.
• Practice more: Engage in more hands-on practice, especially
in areas you found challenging.
• Schedule a retake: Once you feel ready, schedule a retake of
the exam. Make sure to give yourself enough time to prepare

thoroughly.
4. Feedback and reflection:
• Exam feedback: Provide feedback about your exam
experience if prompted. This can help improve the process for
future test-takers.
• Reflect on the learning journey: Regardless of the outcome,
reflect on what you have learned throughout your preparation
journey. Every learning experience is valuable.
5. Future steps:
• Continued learning: Stay engaged with the cloud community
and keep learning. Attend webinars, workshops, and stay
updated with GCP blogs and documentation.
• Plan your next certification: If you are interested in
furthering your cloud credentials, consider planning for
another certification.
Completing the GCP Professional Cloud Architect certification exam
is a journey, not just a destination. Whether celebrating your
success or preparing for a retake, use this experience as a stepping
stone for your continuous growth in the cloud computing field.
Remember, every professional journey is a blend of lifelong learning
and adaptation.
Conclusion
You have officially conquered the last chapter of this GCP
Architect's Handbook. We have tag-teamed through the core
concepts of GCP, explored its coolest services, and prepped you to
design, deploy, and manage winning cloud solutions.
Think of this handbook as your personal GCP dojo, a place to train,
learn, and become a certified architect extraordinaire. In first 2
chapters, we began with understanding cloud computing
fundamentals and why GCP stands out. Chapters 3-6 explored GCP's
core services. We tackled the building blocks (compute, storage) in

---

## Sección 111: Chapter 3, Compute and Storage, followed by data storage, [Entropy: 0.25]

processing, and analysis in Chapter 4, Data & Analytics. Chapter 5,
ML & AI unveiled the exciting world of machine learning, and

---

## Sección 112: Chapter 6, Networking in GCP ensured you can design secure and [Entropy: 0.28]

scalable network infrastructures.

Security was a major focus. Chapter 7, IAM covered Identity and
Access Management, while Chapter 8, Security & Compliance
explored GCP's security features and compliance considerations.
Chapters 9 and 10 addressed operational aspects. Chapter 9, DevOps
& SRE examined how GCP integrates with DevOps and SRE
principles, and Chapter 10, HA & DR covered achieving high
availability and disaster recovery.
For proactive management, Chapter 11, Monitoring, Logging, and
Troubleshooting equipped you with the tools to identify and resolve
issues. Chapter 12, Hybrid and Multi-cloud Strategies explored
integrating GCP with other environments.
To conclude, the cloud world is like a never-ending buffet – there's
always something new to try. Keep your skills sharp by following
Google Cloud's updates, joining online communities, and checking
out content from GCP gurus.
The knowledge and skills you've acquired position you to excel in
the exciting world of cloud architecture. Leverage your newfound
expertise to tackle real-world challenges, design innovative
solutions, and contribute to the success of your organization's cloud
journey. With dedication and a thirst for knowledge, you can
become a Google Cloud expert, shaping the future of cloud
technology.
This concludes the GCP Architect's Handbook. I hope it has served
as a valuable resource on your path to cloud mastery. Best of luck in
your GCP endeavors.

Appendix
Multiple choice questions
1. Which 
of 
the 
following 
is 
not 
a 
fundamental
characteristic of Cloud Computing?
a. Scalability
b. Resource pooling
c. IaaS
d. Single-tenancy
2. Google Compute Engine does not provide which type of
cloud computing service?
a. SaaS
b. PaaS
c. IaaS
d. DaaS
3. Which GCP service is used for real-time analytics and
event processing?
a. Dataproc
b. BigQuery
c. Dataflow
d. Vertex AI

4. Which GCP service is a fully managed data warehouse
that enables large-scale SQL queries?
a. Datastore
b. BigQuery
c. Dataproc
d. Cloud Storage
5. What does SRE stand for in a cloud computing context?
a. Software Runtime Environment
b. Secure Reliable Encryption
c. Site Reliability Engineering
d. Simple Resource Estimation
6. Which GCP service is integral to implementing CI/CD
pipelines?
a. Cloud Build
b. Cloud Functions
c. Cloud SQL
d. Cloud Dataproc
7. Which GCP feature helps manage identity and access for
users and services?
a. Cloud IAM
b. Cloud DNS
c. Cloud CDN
d. Cloud SQL
8. In Google Cloud Platform, VPC stands for?
a. Virtual Private Cloud

b. Verified Public Connectivity
c. Variable Performance Computing
d. Virtualized Processing Cluster
9. Which GCP service provides a managed environment for
deploying containerized applications with high level of
control over infrastructure?
a. Compute Engine
b. App Engine
c. Kubernetes Engine
d. Bigtable
10. Cloud CDN in GCP is used for?
a. Data warehousing
b. Content delivery optimization
c. Machine learning tasks
d. Database management
11. Cloud Monitoring in GCP is primarily used for?
a. Data analysis
b. Security scanning
c. Performance tracking
d. Code deployment
12. For analyzing and exporting logs, which GCP service is
used?
a. Cloud Logging
b. Cloud Monitoring
c. Cloud DNS
d. Cloud IAM

13. Which service provides a fully managed NoSQL document
database in GCP?
a. BigQuery
b. Cloud Spanner
c. Cloud Bigtable
d. Firestore
14. Cloud SQL in GCP is best suited for?
a. Large-scale machine learning
b. Real-time analytics
c. Managing relational databases
d. Data streaming
15. GCP's Dataflow service is used for?
a. Stream and batch data processing
b. Secure file storage
c. Interactive query service
d. IoT device management
16. The primary use of GCP's Pub/Sub is for?
a. Data storage
b. Event-driven messaging
c. Virtual networking
d. User authentication
17. In GCP, ensuring high availability often involves:
a. Single-zone deployment
b. Manual scaling
c. Multi-region deployment

d. Fixed resource allocation
18. Disaster recovery in GCP is primarily concerned with:
a. Data analytics
b. Cost optimization
c. Business continuity
d. User authentication
19. Which resource is most beneficial for hands-on practice
when preparing for the Cloud Architect exam?
a. GCP documentation
b. Qwiklabs
c. Online forums
d. Flashcards
20. Which GCP product is a scalable database service suitable
for web applications?
a. Cloud Spanner
b. Cloud SQL
c. BigQuery
d. Firestore
21. GCP's Cloud Functions is an example of what kind of
computing?
a. IaaS
b. PaaS
c. Serverless Computing
d. SaaS
22. Which GCP service is designed for object storage and
retrieval?

a. Cloud SQL
b. Cloud Storage
c. Cloud Spanner
d. Compute Engine
23. In GCP, which service is primarily used for container
orchestration?
a. Kubernetes Engine
b. App Engine
c. Compute Engine
d. Cloud Run
24. Which GCP tool is best suited for real-time data
processing and analytics?
a. BigQuery
b. Dataflow
c. Dataproc
d. Bigtable
25. For managing large-scale clusters for Big Data processing,
which GCP service would you use?
a. Cloud SQL
b. Dataproc
c. Cloud Spanner
d. Dataflow
26. What does GCP’s AI Platform primarily offer?
a. Database management
b. Cloud storage solutions
c. Machine learning and AI tools

d. Web application hosting
27. Which service in GCP is best for developing, deploying,
and managing custom machine learning models?
a. AutoML
b. Vertex AI Platform
c. TensorFlow
d. BigQuery ML
28. What is the primary function of GCP’s Cloud IAM?
a. Data analytics
b. Resource management
c. Identity and Access Management
d. Network configuration
29. To comply with data encryption standards, which GCP
feature would you leverage?
a. Cloud Storage
b. Cloud IAM
c. Cloud Key Management Service
d. Cloud Security Scanner
30. What is the main purpose of GCP’s Virtual Private Cloud
(VPC)?
a. Data processing
b. Providing a private network space
c. Web hosting
d. Machine learning tasks
31. Cloud CDN in GCP is used for?
a. Data storage

b. Network optimization and content delivery
c. Machine learning tasks
d. Identity management
32. Which GCP service is primarily used for log management
and analysis?
a. Cloud Monitoring
b. Cloud Logging
c. Cloud Functions
d. Cloud Trace
33. Cloud Trace is a tool used for?
a. Managing cloud storage
b. Monitoring network traffic
c. Analyzing and optimizing application performance
d. Handling user identity and access
34. App Engine in GCP is an example of:
a. IaaS
b. PaaS
c. SaaS
d. Serverless Computing
35. Which GCP service is primarily built to allows developers
to build and deploy functions that respond to events?
a. Kubernetes Engine
b. Cloud Functions
c. Compute Engine
d. Cloud Endpoints

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
