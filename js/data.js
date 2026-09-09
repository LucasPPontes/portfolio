const portfolioData = {
  pt: {
    header: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      getInTouch: "Entre em contato"
    },
    hero: {
      badge: "DATA ENGINEER",
      titleLine1: "ENGENHARIA DE DADOS, BI E",
      titleGradient: "ARQUITETURAS ESCALÁVEIS",
      description: "Parceiro estratégico de negócios na conversão de dados brutos em inteligência acionável. Desenvolvo arquiteturas em nuvem e pipelines de alta performance projetados para dar suporte ao crescimento escalável, permitindo que a liderança tome decisões baseadas em dados sólidos e acionáveis.",
      viewProjects: "Ver projetos",
      getInTouch: "Entre em contato"
    },
    about: {
      badge: "QUEM SOU EU",
      title: "Sobre Mim",
      subtitle: "Dados são minha linguagem — transformo complexidade em clareza.",
      cardTitle: "Minha Trajetória",
      paragraphs: [
        "Sou Lucas Pontes, profissional de dados com mais de 4 anos de experiência na área. Formado em Análise e Desenvolvimento de Sistemas, migrei para dados durante um estágio, quando percebi o impacto que essa área poderia ter nas decisões de negócio. Complementei a formação com uma pós em Ciência de Dados e Big Data Analytics, unindo a base de engenharia de software à profundidade analítica exigida por projetos de dados modernos.",
        "Hoje construo pipelines ETL/ELT, automatizo processos com Python e oriento workflows com Airflow e dbt, sempre com mentalidade DataOps — tratando confiabilidade, observabilidade e reprodutibilidade como pilares centrais de cada solução. Busco desafios que unam essa base de engenharia à construção de dados como produto: pipelines testáveis, monitoráveis e confiáveis o suficiente para sustentar decisões críticas de negócio."
      ],
      highlights: [
        {
          title: "Linguagens e Bancos de Dados",
          description: "Python, SQL e SAP HANA para manipulação, consulta otimizada e modelagem de dados em ambientes analíticos e transacionais."
        },
        {
          title: "Engenharia de Dados & DataOps",
          description: "Pentaho, Airflow, dbt, Docker e Linux para construção de pipelines ETL/ELT automatizados, orquestração de fluxos e garantia de observabilidade com mentalidade DataOps."
        },
        {
          title: "Business Intelligence",
          description: "Power BI e SAP Analytics Cloud para desenvolvimento de dashboards executivos interativos, modelagem dimensional (Star Schema e Snowflake) e criação de relatórios gerenciais."
        },
        {
          title: "Big Data & Cloud",
          description: "AWS, Databricks, Apache Spark e Terraform para processamento distribuído de grandes volumes de dados, criação de Data Lakes escaláveis e automação de infraestrutura na nuvem."
        }
      ]
    },
    projects: {
      badge: "PROJETOS",
      title: "Projetos",
      subtitle: "Desafios reais transformados em soluções práticas através de projetos independentes.",
      viewDetails: "Ver detalhes",
      github: "GitHub"
    },
    contact: {
      badge: "CONTATO",
      title: "Entre em Contato",
      subtitle: "Tem um projeto em mente, quer trocar uma ideia sobre dados ou explorar oportunidades de colaboração? Estou disponível e adoraria ouvir você!",
      sendEmail: "Enviar e-mail",
      linkedin: "LinkedIn",
      github: "GitHub"
    },
    footer: {
      name: "Lucas Pontes"
    }
  },
  en: {
    header: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      getInTouch: "Get in touch"
    },
    hero: {
      badge: "DATA ENGINEER",
      titleLine1: "DATA ENGINEERING, BI AND",
      titleGradient: "SCALABLE ARCHITECTURES",
      description: "Strategic business partner converting raw data into actionable intelligence. I design high-performance cloud architectures and pipelines built to support scalable growth, empowering leadership to make decisions grounded in solid, actionable data.",
      viewProjects: "View projects",
      getInTouch: "Get in touch"
    },
    about: {
      badge: "WHO I AM",
      title: "About Me",
      subtitle: "Data is my language — turning complexity into clarity.",
      cardTitle: "My Journey",
      paragraphs: [
        "I am Lucas Pontes, a data professional with over 4 years of experience in the field. Holding a degree in Systems Analysis and Development, I transitioned to data during an internship when I realized the impact this field could have on business decisions. I complemented my education with a postgraduate degree in Data Science & Big Data Analytics, combining a software engineering foundation with the analytical depth required by modern data projects.",
        "Today, I build ETL/ELT pipelines, automate processes with Python, and orchestrate workflows with Airflow and dbt, always with a DataOps mindset — treating reliability, observability, and reproducibility as core pillars of every solution. I seek challenges that combine this engineering foundation with building data as a product: pipelines that are testable, monitorable, and reliable enough to power critical business decisions."
      ],
      highlights: [
        {
          title: "Languages & Databases",
          description: "Python, SQL, and SAP HANA for data manipulation, query optimization, and data modeling across analytical and transactional environments."
        },
        {
          title: "Data Engineering & DataOps",
          description: "Pentaho, Airflow, dbt, Docker, and Linux for building automated ETL/ELT pipelines, workflow orchestration, and DataOps observability."
        },
        {
          title: "Business Intelligence",
          description: "Power BI and SAP Analytics Cloud for developing interactive executive dashboards, dimensional modeling (Star & Snowflake Schema), and managerial reporting."
        },
        {
          title: "Big Data & Cloud",
          description: "AWS, Databricks, Apache Spark, and Terraform for distributed processing of massive datasets, scalable Data Lake creation, and cloud infrastructure automation."
        }
      ]
    },
    projects: {
      badge: "PROJECTS",
      title: "Projects",
      subtitle: "Real-world challenges transformed into practical solutions through independent projects.",
      viewDetails: "View details",
      github: "GitHub"
    },
    contact: {
      badge: "CONTACT",
      title: "Get in Touch",
      subtitle: "Have a project in mind, want to discuss data, or explore collaboration opportunities? I am available and would love to hear from you!",
      sendEmail: "Send email",
      linkedin: "LinkedIn",
      github: "GitHub"
    },
    footer: {
      name: "Lucas Pontes"
    }
  },
  projects: [
    {
      id: "project-1",
      badge: "Airflow & Data Warehouse",
      image: "images/project-warehouse.jpg",
      githubUrl: "https://github.com/LucasPPontes/pipeline_datawarehouse",
      tags: ["Apache Airflow", "Data Warehouse", "Python", "PostgreSQL", "FastAPI"],
      title: {
        pt: "Data Warehouse & Pipelines ETL com Apache Airflow",
        en: "Data Warehouse & ETL Pipelines with Apache Airflow"
      },
      description: {
        pt: "Arquitetura de Data Warehouse em PostgreSQL alimentada por 5 DAGs automáticas no Apache Airflow 3.3, integrando dados de ERP e API RESTful em FastAPI.",
        en: "PostgreSQL Data Warehouse architecture powered by 5 automated Apache Airflow 3.3 DAGs, consolidating ERP schemas and FastAPI REST endpoints."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Dados operacionais de ERP fragmentados em múltiplos setores (vendas, financeiro, RH, jurídico, atendimento), tornando lenta e complexa a geração de relatórios consolidados para a diretoria."
          },
          solution: {
            title: "A Solução",
            description: "Construção de uma arquitetura centralizada de dados que automatiza a coleta, limpeza e consolidação de informações de diferentes setores da empresa em relatórios analíticos confiáveis."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Pipelines de dados automatizados e agendados no Apache Airflow.",
              "Consolidação de dados operacionais multi-setoriais em um banco de dados analítico central.",
              "API segura com controle de acesso para consumo dos dados."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Centralização dos indicadores da empresa em um único repositório confiável, eliminação de relatórios manuais e suporte à tomada de decisão estratégica."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Operational ERP data fragmented across multiple departments (sales, finance, HR, legal, support), causing slow and complex consolidated reporting."
          },
          solution: {
            title: "The Solution",
            description: "Building a centralized data architecture that automates collecting, cleaning, and consolidating enterprise data into reliable analytical reports."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "Automated and scheduled data pipelines managed with Apache Airflow.",
              "Multi-department operational data consolidation into a central analytical warehouse.",
              "Secure REST API with access control for data consumption."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "Centralization of enterprise KPIs into a single reliable repository, elimination of manual reporting bottlenecks, and enhanced decision-making."
          }
        }
      }
    },
    {
      id: "project-3",
      badge: "Engenharia de Dados em Tempo Real",
      image: "images/iot-sensor-telemetry.png",
      githubUrl: "https://github.com/LucasPPontes/iac-real-time-data-pipeline",
      tags: ["Python", "FastAPI", "Docker", "Terraform", "LocalStack", "AWS Lambda", "AWS Kinesis", "AWS S3"],
      title: {
        pt: "IoT Sensor Telemetry - Pipeline de Dados em Tempo Real",
        en: "IoT Sensor Telemetry - Real-Time Data Pipeline"
      },
      description: {
        pt: "Pipeline de Engenharia de Dados em tempo real containerizado para telemetria de sensores IoT, com simulação de anomalias em FastAPI, streaming via AWS Kinesis/Firehose e IaC com Terraform no LocalStack.",
        en: "Containerized real-time data engineering pipeline for IoT sensor telemetry, featuring anomaly simulation in FastAPI, AWS Kinesis/Firehose streaming, and Terraform IaC on LocalStack."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Coletar e processar continuamente volumes massivos de dados de telemetria de sensores industriais com anomalias operacionais em tempo real, mantendo baixo custo e testabilidade local."
          },
          solution: {
            title: "A Solução",
            description: "Arquitetura serverless e streaming de dados containerizada que simula sensores industriais, agenda coletas periódicas e entrega dados brutos higienizados em um Data Lake no Amazon S3."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Simulação de sensores IoT com injeção automática de anomalias operacionais (picos de temperatura, falhas de pressão e valores nulos).",
              "Pipeline de streaming serverless integrando EventBridge, AWS Lambda, Amazon Kinesis e Data Firehose para ingestão contínua no S3 Data Lake.",
              "Infraestrutura como Código (IaC) totalmente automatizada via Terraform e executada 100% localmente em contêineres Docker via LocalStack."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Monitoramento de alta performance para ativos industriais, detecção precoce de falhas críticas e redução drástica nos custos de desenvolvimento em nuvem através de emulação local."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Continuously ingesting and processing high-volume IoT industrial telemetry data with real-time operational anomalies while maintaining zero cloud costs during local development."
          },
          solution: {
            title: "The Solution",
            description: "Containerized serverless streaming data architecture simulating industrial IoT devices, scheduling periodic ingestion, and persisting raw telemetry into an Amazon S3 Data Lake."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "IoT sensor simulation with automated anomaly injection (critical spikes, pressure drops, null values).",
              "Serverless streaming pipeline combining EventBridge, AWS Lambda, Amazon Kinesis, and Data Firehose into an S3 Data Lake.",
              "Fully automated Infrastructure as Code (IaC) via Terraform running 100% locally in Docker containers via LocalStack."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "High-performance industrial asset monitoring, early critical fault detection, and significant cloud development cost savings via local emulation."
          }
        }
      }
    },
    {
      id: "project-4",
      badge: "Big Data & GenAI",
      image: "images/spark-agritech-genai.png",
      githubUrl: "https://github.com/LucasPPontes/agritech-spark-genai",
      tags: ["Apache Spark", "PySpark", "Python", "Streamlit", "GenAI", "Docker"],
      title: {
        pt: "Modelagem de Crescimento Agrícola com Apache Spark, Streamlit e GenAI",
        en: "Agricultural Growth Modeling with Apache Spark, Streamlit & GenAI"
      },
      description: {
        pt: "Plataforma de Big Data Analytics e IA Generativa (Google Gemini / OpenAI) containerizada com Apache Spark 3.5.3 para modelagem de crescimento de culturas agrícolas e geração automática de diagnósticos agronômicos.",
        en: "Containerized Big Data Analytics & Generative AI platform (Google Gemini / OpenAI) powered by Apache Spark 3.5.3 for crop growth modeling and automated agronomic insights."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Processamento demorado de dados do campo (clima, solo e desenvolvimento de lavouras) e falta de análises automatizadas para orientação de manejo agrícola."
          },
          solution: {
            title: "A Solução",
            description: "Plataforma de análise de dados agrícolas e inteligência artificial que avalia o crescimento de lavouras e gera diagnósticos agronômicos automatizados para apoiar a tomada de decisão no campo."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Processamento rápido de grandes volumes de dados agrícolas.",
              "Painel visual interativo com evolução do crescimento por tipo de cultura e solo.",
              "Assistente de Inteligência Artificial para geração automática de relatórios agronômicos."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Agilidade na análise de safras, prevenção de perdas no campo e decisões estratégicas embasadas em dados e recomendações de IA."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Slow processing of field data (weather, soil, crop development) and lack of automated recommendations for agricultural management."
          },
          solution: {
            title: "The Solution",
            description: "Agricultural data analytics and artificial intelligence platform that tracks crop growth and generates automated agronomic diagnostics to support field decision-making."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "Fast processing of large agricultural datasets.",
              "Interactive dashboard showing growth evolution per crop and soil type.",
              "AI Assistant generating automated agronomic diagnostics and insights."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "Accelerated crop data analysis, crop yield protection, and data-driven farming strategy."
          }
        }
      }
    },
    {
      id: "project-8",
      badge: "IA Generativa & RAG",
      image: "images/rag.png",
      githubUrl: "https://github.com/LucasPPontes/rag-assistant",
      tags: ["Python", "FastAPI", "Streamlit", "MinIO", "ChromaDB", "Google Gemini", "OpenAI", "Docker"],
      title: {
        pt: "Assistente RAG com MinIO, FastAPI e Streamlit",
        en: "RAG Assistant with MinIO, FastAPI & Streamlit"
      },
      description: {
        pt: "Pipeline de Retrieval-Augmented Generation (RAG) para leitura, indexação vetorial no ChromaDB e busca semântica em PDFs armazenados no MinIO S3, integrado a LLMs (Gemini/OpenAI) e FastAPI.",
        en: "Retrieval-Augmented Generation (RAG) pipeline for PDF document indexing in ChromaDB, S3 object storage in MinIO, and semantic search powered by Gemini/OpenAI & FastAPI."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Dificuldade em extrair informações precisas e consultar grandes volumes de documentos contratuais e relatórios em PDF de forma rápida e confiável."
          },
          solution: {
            title: "A Solução",
            description: "Sistema RAG completo containerizado que armazena os PDFs no MinIO S3, realiza busca por similaridade vetorial no ChromaDB e gera respostas fundamentadas com citações das fontes originais."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Armazenamento de objetos S3 via MinIO containerizado e indexação vetorial por blocos de texto no ChromaDB.",
              "Integração com LLMs (Google Gemini e OpenAI) com validação de chave de API em tempo real e citação explícita das fontes extraídas.",
              "Interface conversacional em Streamlit com upload direto de PDFs e backend REST assíncrono em FastAPI."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Agilidade extrema no consumo de inteligência documental, eliminação de alucinações via contexto RAG estruturado e facilidade na análise de contratos corporativos."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Difficulty extracting precise answers and searching across large volumes of PDF contract documents and corporate reports quickly and accurately."
          },
          solution: {
            title: "The Solution",
            description: "Containerized RAG system storing PDFs in MinIO S3, executing vector similarity search in ChromaDB, and delivering grounded LLM answers with original document source citations."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "S3 object storage via containerized MinIO and chunked text vector indexing in ChromaDB.",
              "LLM integration (Google Gemini and OpenAI) with real-time API key validation and explicit source document citations.",
              "Conversational Streamlit web UI featuring direct PDF uploads and asynchronous FastAPI REST backend."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "Extreme efficiency in document intelligence retrieval, elimination of LLM hallucinations via grounded RAG context, and streamlined contract analysis."
          }
        }
      }
    },
    {
      id: "project-5",
      badge: "Engenharia de Dados & Analytics Financeiro",
      image: "images/automacao-financeira.png",
      githubUrl: "https://github.com/LucasPPontes/corefin_analytics",
      tags: ["FastAPI", "PostgreSQL", "Streamlit", "Docker", "Python", "Plotly"],
      title: {
        pt: "CoreFin Analytics - Painel de Finanças Corporativas",
        en: "CoreFin Analytics - Corporate Finance Dashboard"
      },
      description: {
        pt: "Pipeline de Engenharia de Dados e Analytics Financeiro em Arquitetura Medalhão (Bronze, Silver, Gold no PostgreSQL), com API REST em FastAPI e painel interativo em Streamlit.",
        en: "Data Engineering & Financial Analytics Pipeline based on Medallion Architecture (Bronze, Silver, Gold in PostgreSQL), with FastAPI REST server and Streamlit interactive dashboard."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Fragmentação e ausência de padronização nos dados financeiros corporativos (tesouraria, DRE e contas a pagar/receber), dificultando a consolidação executiva e o acompanhamento de indicadores."
          },
          solution: {
            title: "A Solução",
            description: "Solução de engenharia de dados que organiza as informações em camadas graduais de limpeza e agregação, oferecendo relatórios executivos centralizados em um painel interativo."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Pipeline em 3 camadas de dados no PostgreSQL para tratamento, deduplicação e criação de indicadores estratégicos.",
              "Painel web interativo em Streamlit com navegação multi-páginas e visualizações gráficas de KPIs, DRE Gerencial, Fluxo de Caixa e Matriz de Risco.",
              "Servidor de aplicação em FastAPI para automação das rotinas de transformação e integração de serviços em contêineres Docker."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Consolidação e confiabilidade nas métricas financeiras corporativas, garantindo visibilidade executiva em tempo real e agilidade na tomada de decisão."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Data fragmentation and lack of standardization across corporate financial sources (treasury, P&L, and payables/receivables), impeding executive consolidation."
          },
          solution: {
            title: "The Solution",
            description: "Data engineering solution organizing financial data into progressive cleansing and aggregation layers, delivering centralized executive insights via an interactive dashboard."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "Three-layer data pipeline in PostgreSQL for cleansing, deduplication, and strategic metric calculations.",
              "Interactive Streamlit web dashboard featuring multi-page navigation and visual metrics for KPIs, Managerial P&L, Cash Flow, and Risk Matrix.",
              "FastAPI application server orchestrating automated data transformations and containerized Docker services."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "Unified and highly reliable corporate financial metrics, delivering real-time executive visibility and strategic agility."
          }
        }
      }
    },
    {
      id: "project-2",
      badge: "CRM & Gestão de SLA",
      image: "images/dash-crm-executive.png",
      githubUrl: "https://github.com/LucasPPontes/crm-sla-analytics-hub",
      tags: ["Posit Shiny", "Python", "FastAPI", "Plotly", "Pandas", "Docker"],
      title: {
        pt: "Hub Executivo Unificado: CRM & Acompanhamento de SLA",
        en: "Unified Executive Hub: CRM & SLA Tracking"
      },
      description: {
        pt: "Painel analítico reativo em Posit Shiny e FastAPI unificando inteligência de vendas (CRM, MRR, Funil) e gestão operacional de atendimento e SLA (MTTA/MTTR, franquia de horas e contratos).",
        en: "Reactive analytics dashboard built with Posit Shiny and FastAPI unifying sales intelligence (CRM, MRR, Pipeline) and operational SLA & support contract management."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Informações comerciais de vendas e dados operacionais de atendimento desconectados, dificultando o controle de contratos, retenção de clientes e identificação de estouro de franquias de horas."
          },
          solution: {
            title: "A Solução",
            description: "Painel executivo unificado reativo desenvolvido com Posit Shiny e FastAPI que integra em 8 visões o acompanhamento do ciclo de vendas, saúde do cliente e suporte operacional."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Módulo CRM com indicadores de receita recorrente (MRR/ARR), funil por estágios e matriz de saúde do cliente (NPS/Health Score).",
              "Módulo de SLA e Contratos com métricas de tempo de resposta (MTTA/MTTR), acompanhamento de burn rate de horas e estimativa de faturamento extra.",
              "Interface reativa com navegação por navbar modular, alternância instantânea de temas Dark/Light Mode e gráficos Plotly autoajustáveis."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Visibilidade 360° da saúde de clientes, eliminação da perda de receita com horas extras não faturadas e agilidade no acompanhamento operacional."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Disconnected sales performance figures and customer support metrics, making contract management, client retention, and hour quota overage tracking difficult."
          },
          solution: {
            title: "The Solution",
            description: "Unified reactive executive dashboard built with Posit Shiny and FastAPI integrating 8 dedicated views for sales cycle tracking, client health, and support operations."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "CRM module featuring recurring revenue metrics (MRR/ARR), pipeline stage tracking, and customer health matrices (NPS/Health Score).",
              "SLA & Contracts module monitoring response times (MTTA/MTTR), hour burn rates, and extra billing estimates.",
              "Reactive interface with modular navbar navigation, instant Dark/Light mode theme toggle, and auto-adjusting Plotly visual charts."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "Full 360° client health visibility, elimination of unbilled overage hour revenue loss, and streamlined operational monitoring."
          }
        }
      }
    },
    {
      id: "project-6",
      badge: "Business Intelligence",
      image: "images/dash-vendas-powerbi.png",
      githubUrl: "https://github.com/LucasPPontes/dashboard_vendas",
      tags: ["Power BI", "Star Schema", "DAX", "Modelagem Dimensional"],
      title: {
        pt: "Dashboard de Vendas & Performance de Mercado",
        en: "Sales & Market Performance Dashboard"
      },
      description: {
        pt: "Dashboard executivo em Power BI com modelagem Star Schema (fato_vendas + 4 dimensões), análise estratégica comercial, evolução temporal de faturamento e lucro, performance regional e ranking de produtos.",
        en: "Executive Power BI dashboard featuring Star Schema dimensional modeling (fact_sales + 4 dimensions), commercial strategy insights, time intelligence revenue/profit evolution, and regional performance."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Informações comerciais espalhadas em planilhas diversas, dificultando a análise de lucratividade por produto, região ou equipe de vendas."
          },
          solution: {
            title: "A Solução",
            description: "Painel executivo interativo que consolida vendas, margens de lucro e desempenho por equipe e região, permitindo decisões comerciais rápidas e direcionadas."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Visão geral de faturamento, margem de lucro e volume de pedidos.",
              "Ranking dos produtos mais vendidos e categorias mais lucrativas.",
              "Comparativo de vendas por região e acompanhamento de metas da equipe."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Identificação rápida das melhores oportunidades de mercado, otimização de estoque e aumento da eficiência da equipe comercial."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Commercial data scattered across multiple spreadsheets, hindering profitability analysis by product, region, or sales rep."
          },
          solution: {
            title: "The Solution",
            description: "Interactive executive dashboard consolidating sales, profit margins, and team performance by region for fast, targeted commercial decisions."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "Consolidated view of revenue, profit margin, and total order volume.",
              "Interactive ranking of top-selling products and profitable categories.",
              "Regional sales performance comparison and sales rep target tracking."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "Fast identification of top market opportunities, inventory optimization, and increased sales team efficiency."
          }
        }
      }
    },
    {
      id: "project-7",
      badge: "Gestão & Qualidade",
      image: "images/dash-acompanhamento-projetos.png",
      githubUrl: "https://github.com/LucasPPontes/dashboard_projetos",
      tags: ["Power BI", "DAX", "Snowflake Schema", "Data Warehouse"],
      title: {
        pt: "Dashboard de Acompanhamento de Projetos",
        en: "Project Tracking & Management Dashboard"
      },
      description: {
        pt: "Dashboard completo em Power BI com arquitetura multidimensional Snowflake Schema para acompanhamento de desenvolvimento de software, burndown de sprints e rastreamento de defeitos.",
        en: "Comprehensive Power BI dashboard built on a multidimensional Snowflake Schema for software development management, sprint burndown tracking, and defect/quality monitoring."
      },
      summary: {
        pt: {
          challenge: {
            title: "O Desafio",
            description: "Falta de visibilidade sobre o ritmo de entrega do desenvolvimento de software, consumo de orçamento de horas e quantidade de erros encontrados em testes."
          },
          solution: {
            title: "A Solução",
            description: "Painel gerencial para acompanhamento do progresso de projetos de software, controle do orçamento de horas executadas e rastreamento da qualidade das entregas."
          },
          highlights: {
            title: "Principais Recursos",
            items: [
              "Acompanhamento em tempo real do ritmo de conclusão das tarefas da equipe.",
              "Controle comparativo entre horas estimadas e horas efetivamente trabalhadas.",
              "Monitoramento da incidência de bugs e tempo médio de solução."
            ]
          },
          impact: {
            title: "Impacto no Negócio",
            description: "Garantia de previsibilidade nas entregas, transparência com os clientes e constante melhoria da qualidade do software."
          }
        },
        en: {
          challenge: {
            title: "The Challenge",
            description: "Lack of visibility over software development release pace, hour budget consumption, and defect rates in testing cycles."
          },
          solution: {
            title: "The Solution",
            description: "Management dashboard for monitoring software project progress, hour budget consumption, and delivery quality tracking."
          },
          highlights: {
            title: "Key Highlights",
            items: [
              "Real-time team task completion velocity tracking.",
              "Comparative control of estimated vs. actual logged hours.",
              "Defect monitoring and mean resolution time tracking."
            ]
          },
          impact: {
            title: "Business Impact",
            description: "Delivery predictability, complete stakeholder transparency, and continuous software release quality improvement."
          }
        }
      }
    }
  ]
};
