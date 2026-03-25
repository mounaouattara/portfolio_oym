import { Project, Concept, CategorizedTool, Competency, TimelineEvent } from './types';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: '2025',
    title: 'Data Scientist',
    description: 'Autorité de Régulation des Télécommunications (ARCEP). Analyse de données et automatisation intelligente.',
    side: 'right'
  },
  {
    year: '2024',
    title: 'Data Scientist',
    description: 'Institut de la Vision, INSERM. Optimisation d\'architectures CNN et Transformers pour données expérimentales.',
    side: 'left'
  },
  {
    year: '2024',
    title: 'Master Data Science',
    description: 'Sorbonne Université. Spécialisation en Apprentissage Statistique et Intelligence Artificielle.',
    side: 'right'
  },
  {
    year: '2021',
    title: 'Licence Informatique',
    description: 'Sorbonne Université. Fondamentaux de l\'informatique, algorithmique et bases de données.',
    side: 'left'
  },
  {
    year: '2019',
    title: 'Fullstack Dev',
    description: 'IKIGAI. Développement d\'applications analytiques et interfaces de visualisation interactive.',
    side: 'right'
  }
];

export const CONCEPTS: Concept[] = [
  // Data Science
  { name: 'XGBoost', category: 'Data Science', description: 'Gradient Boosting framework for high-performance supervised learning.' },
  { name: 'Autoencoders', category: 'Data Science', description: 'Neural networks for unsupervised learning, typically for dimensionality reduction or anomaly detection.' },
  { name: 'Statistical Modeling', category: 'Data Science', description: 'Using statistical assumptions to generate predictive models of data.' },

  // ML Engineering
  { name: 'LLMs', category: 'ML Engineering', description: 'Large Language Models, deep learning models with billions of parameters, trained on vast text data.' },
  { name: 'RAG', category: 'ML Engineering', description: 'Retrieval-Augmented Generation, a technique to provide external knowledge to LLMs.' },
  { name: 'CNNs', category: 'ML Engineering', description: 'Convolutional Neural Networks, primarily used for image processing and computer vision.' },
  { name: 'ETL', category: 'ML Engineering', description: 'Extract, Transform, Load: a data integration process for transferring data between systems.' },
  { name: 'CI/CD for ML', category: 'ML Engineering', description: 'Continuous Integration/Delivery practices tailored for machine learning systems.' },

  // Infrastructure
  { name: 'Docker', category: 'Infrastructure', description: 'Platform for developing, shipping, and running applications in containers.' },
  { name: 'Kubernetes', category: 'Infrastructure', description: 'Open-source system for automating deployment, scaling, and management of containerized applications.' },
  { name: 'AWS SageMaker', category: 'Infrastructure', description: 'Amazon\'s cloud machine learning platform to build, train, and deploy ML models.' },
  { name: 'MLflow', category: 'Infrastructure', description: 'Open-source platform to manage the ML lifecycle, including experimentation, reproducibility, and deployment.' },

  // Core Principles
  { name: 'A/B Testing', category: 'Core Principles', description: 'A randomized experimentation process to compare two versions of a variable.' },
  { name: 'Agile/Scrum', category: 'Core Principles', description: 'Iterative approach to project management and software development.' },
  { name: 'System Design', category: 'Core Principles', description: 'The process of defining the architecture, components, and data for a system to satisfy specified requirements.' },
];

export const TOOLKIT: CategorizedTool[] = [
    {
        category: 'Langages & Développement',
        tools: [
            { name: 'Python', level: 95 }, { name: 'SQL', level: 90 }, { name: 'TypeScript', level: 80 }, { name: 'Bash', level: 85 }, { name: 'R', level: 80 }, { name: 'Java', level: 75 },
        ],
    },
    {
        category: 'Data Science & ML',
        tools: [
            { name: 'Pandas', level: 95 }, { name: 'Scikit-learn', level: 95 }, { name: 'PyTorch', level: 90 }, { name: 'TensorFlow', level: 85 }, { name: 'XGBoost', level: 90 }, { name: 'NumPy', level: 90 }, { name: 'Keras', level: 85 },
        ],
    },
    {
        category: 'MLOps & Infrastructure',
        tools: [
            { name: 'Docker', level: 85 }, { name: 'MLflow', level: 80 }, { name: 'Airflow', level: 75 }, { name: 'AWS', level: 80 }, { name: 'Databricks', level: 85 },
        ],
    },
    {
        category: 'Bases de Données',
        tools: [
            { name: 'PostgreSQL', level: 90 }, { name: 'MySQL', level: 85 }, { name: 'MongoDB', level: 80 },
        ],
    },
    {
        category: 'Visualisation & BI',
        tools: [
            { name: 'Power BI', level: 95 }, { name: 'Matplotlib', level: 90 }, { name: 'Seaborn', level: 90 }, { name: 'Plotly', level: 85 }, { name: 'Streamlit', level: 90 },
        ],
    },
];

export const PROJECTS: Project[] = [
  {
    date: '2025-06-01',
    title: 'Analyse Environnementale Satellitaire',
    description: 'Développement d\'un pipeline de segmentation d\'images multispectrales basé sur une architecture U-Net optimisée avec attention spatiale. Entraîné sur PyTorch avec augmentation de données complexe. Précision de segmentation: 91% IoU et 94% Accuracy sur des zones urbaines denses.',
    category: 'IA & ML',
    tags: ['CNN', 'U-Net', 'Attention Mechanism', 'PyTorch', 'Remote Sensing'],
    link: '#',
    github: 'https://github.com/mounaouattara',
    liveUrl: 'en attente',
    hardSkills: ['PyTorch', 'Computer Vision', 'U-Net', 'Python', 'OpenCV', 'GDAL'],
    softSkills: ['Analyse de données', 'Résolution de problèmes', 'Rigueur scientifique', 'Optimisation algorithmique'],
    workflow: [
        { stage: 'Data Engineering', tools: ['Python', 'GDAL', 'OpenCV'] },
        { stage: 'Model Design', tools: ['PyTorch', 'U-Net', 'Attention'] },
        { stage: 'Hyperparameter Tuning', tools: ['Optuna', 'Weights & Biases'] },
        { stage: 'Evaluation', tools: ['IoU', 'F1-Score', 'Accuracy'] },
    ]
  },
  {
    date: '2025-03-01',
    title: 'Détection de Fraude Financière Temps-Réel',
    description: 'Système de détection d\'anomalies sur flux de transactions massifs utilisant des modèles de classification supervisée (XGBoost, LightGBM) et non-supervisée (Isolation Forest). Traitement de données déséquilibrées via SMOTE-Tomek. Performance: 92% AUC-ROC et réduction de 40% des faux positifs.',
    category: 'Data Science',
    tags: ['XGBoost', 'LightGBM', 'Scikit-learn', 'Anomaly Detection', 'SMOTE'],
    link: '#',
    github: 'https://github.com/mounaouattara',
    liveUrl: 'en attente',
    hardSkills: ['Scikit-learn', 'XGBoost', 'LightGBM', 'Statistical Analysis', 'Feature Engineering'],
    softSkills: ['Esprit critique', 'Attention aux détails', 'Communication technique', 'Gestion du risque'],
    workflow: [
        { stage: 'EDA & Feature Engineering', tools: ['Pandas', 'Seaborn', 'Scipy'] },
        { stage: 'Model Selection', tools: ['XGBoost', 'LightGBM', 'Random Forest'] },
        { stage: 'Imbalance Handling', tools: ['SMOTE', 'Tomek Links'] },
        { stage: 'Deployment Strategy', tools: ['Docker', 'Flask'] },
    ]
  },
  {
    date: '2025-06-01',
    title: 'Automatisation Intelligente & RPA Cognitive',
    description: 'Architecture hybride combinant Robotic Process Automation (RPA) et modèles de NLP (BERT) pour l\'extraction d\'entités nommées et la classification automatique de documents juridiques. Réduction de 50% de la charge opérationnelle et amélioration de 25% de la vitesse de traitement.',
    category: 'IA & ML',
    tags: ['Power Automate', 'BERT', 'NLP', 'RPA', 'Python'],
    link: '#',
    github: 'https://github.com/mounaouattara',
    liveUrl: 'en attente',
    hardSkills: ['Power Automate', 'RPA', 'Python', 'HuggingFace', 'BERT'],
    softSkills: ['Optimisation de processus', 'Gestion de projet', 'Autonomie', 'Vision stratégique'],
    workflow: [
        { stage: 'Process Discovery', tools: ['Process Mining'] },
        { stage: 'Cognitive NLP', tools: ['HuggingFace', 'BERT'] },
        { stage: 'RPA Integration', tools: ['Power Automate', 'Python'] },
        { stage: 'Monitoring', tools: ['Power BI'] },
    ]
  },
  {
    date: '2024-04-01',
    title: 'Deep Learning & Transfer Learning',
    description: 'Optimisation de modèles pré-entraînés (ResNet, EfficientNet) via Fine-Tuning et Layer Freezing pour la classification de données médicales expérimentales. Augmentation de 30% de la précision par rapport aux modèles de base grâce à une stratégie de scheduler de learning rate cyclique.',
    category: 'IA & ML',
    tags: ['TensorFlow', 'ResNet', 'EfficientNet', 'Fine-tuning', 'Transfer Learning'],
    link: '#',
    github: 'https://github.com/mounaouattara',
    liveUrl: 'en attente',
    hardSkills: ['TensorFlow', 'Keras', 'Transfer Learning', 'Fine-tuning', 'Python'],
    softSkills: ['Curiosité technologique', 'Adaptabilité', 'Travail d\'équipe', 'Veille scientifique'],
    workflow: [
        { stage: 'Model Selection', tools: ['ResNet', 'EfficientNet'] },
        { stage: 'Fine-Tuning', tools: ['TensorFlow', 'Keras'] },
        { stage: 'Data Augmentation', tools: ['Albumentations'] },
        { stage: 'Validation', tools: ['Cross-Validation'] },
    ]
  },
  {
    date: '2019-05-01',
    title: 'Plateforme d\'Analytics Prédictive',
    description: 'Conception et déploiement d\'une application full-stack de visualisation interactive pour le pilotage de KPIs en temps réel. Intégration de modèles de prédiction de séries temporelles (Prophet) pour anticiper les tendances de marché.',
    category: 'Web Dev',
    tags: ['Angular', 'TypeScript', 'Node.js', 'Prophet', 'D3.js'],
    link: '#',
    github: 'https://github.com/mounaouattara',
    liveUrl: 'en attente',
    hardSkills: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'D3.js', 'Prophet'],
    softSkills: ['Design UX/UI', 'Pensée analytique', 'Orientation utilisateur', 'Architecture logicielle'],
    workflow: [
        { stage: 'Frontend Architecture', tools: ['Angular', 'TypeScript', 'D3.js'] },
        { stage: 'Backend & API', tools: ['Node.js', 'Express'] },
        { stage: 'Predictive Engine', tools: ['Python', 'Prophet'] },
        { stage: 'Data Storage', tools: ['MongoDB'] },
    ]
  },
];

export const CATEGORY_PRIORITY: { [key: string]: number } = {
    'Data Science': 1,
    'IA & ML': 2,
    'Data Analysis': 3,
    'Data Engineering': 4,
    'Web Dev': 5,
};

export const CORE_COMPETENCIES: Competency[] = [
    {
        category: 'Science des Données',
        description: 'Développer des modèles prédictifs pour résoudre des problèmes complexes et extraire de la valeur des données.',
        tasks: [
            'Modélisation prédictive (Classification, Régression)',
            'Modèles de base (SVM, Forêts Aléatoires, XGBoost)',
            'Analyse Statistique & Inférentielle',
            'Analyse Exploratoire (EDA)',
            'Feature Engineering & Selection',
            'Entraînement & Fine-tuning de modèles',
        ],
    },
    {
        category: 'Deep Learning & IA Générative',
        description: 'Concevoir et déployer des architectures neuronales avancées pour des tâches de vision et de langage.',
        tasks: [
            'Deep Learning (PyTorch, TensorFlow)',
            'Computer Vision (CNNs)',
            'NLP & Text Processing (Transformers)',
            'IA Générative (LLMs, RAG)',
            'Détection d\'anomalies (Autoencoders)',
            'Bases de données vectorielles (FAISS)',
        ],
    },
    {
        category: 'Analyse de Données & Business Intelligence',
        description: 'Transformer les données brutes en informations exploitables pour guider les décisions stratégiques.',
        tasks: [
            'Définition de KPI & Métriques',
            'Tableaux de bord (Power BI, Streamlit)',
            'Tests A/B',
            'Segmentation Client (K-Means)',
            'Analyse de survie (Churn)',
            'Visualisation de données (Plotly, Seaborn)',
        ],
    },
    {
        category: 'Ingénierie des Données & Big Data',
        description: 'Construire et maintenir des pipelines de données pour le traitement à grande échelle.',
        tasks: [
            'Pipelines ETL/ELT',
            'Traitement de données distribuées (Spark)',
            'Traitement en flux (Kafka)',
            'Orchestration de workflows (Airflow)',
            'Data Warehousing (Delta Lake)',
            'Programmation Orientée Objet (Python)',
        ],
    },
    {
        category: 'Déploiement & MLOps',
        description: "Industrialiser le cycle de vie du Machine Learning, de l'expérimentation au monitoring en production.",
        tasks: [
            'MLOps & Pipelines CI/CD',
            'Conteneurisation (Docker)',
            'Orchestration (Kubernetes)',
            'Déploiement & Serving de modèles',
            'Conception d\'API (Flask)',
            'Monitoring de modèles (Grafana)',
            'Architecture Cloud (AWS, GCP)',
        ],
    },
    {
        category: 'Développement Full-Stack',
        description: 'Construire des applications web complètes pour servir les solutions de données et de ML.',
        tasks: [
            'Développement Backend (Node.js)',
            'Développement Frontend (Angular, TypeScript)',
            'Conception de systèmes distribués',
            'Gestion de bases de données (SQL, NoSQL)',
            'Proof of Concept (PoC) & MVP',
            'Déploiement Web (Nginx)',
        ],
    },
];