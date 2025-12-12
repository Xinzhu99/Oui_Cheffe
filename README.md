# Projet personnel
# OuiCheffe : Planificateur de Repas & Liste de Courses Intelligente
## 📖 À Propos
OuiCheffe simplifie la planification des repas hebdomadaires et génère automatiquement une liste de courses consolidée.

**Fonctionnalités** :
- Catalogue de recettes avec ajustement des portions
- Planification de menu hebdomadaire
- Génération automatique de liste de courses (consolidation intelligente des quantités)
- Ajout manuel d'ingrédients supplémentaires
## 🏗️ Stack Technique
- **Frontend** : React, Next.js, Tailwind
- **Backend** : Next.js Server Actions
- **Base de données** : PostgreSQL + Drizzle ORM
- **UI** : Design mobile-first, CSS moderne

## 💡 Points Techniques Clés

### 1. Modélisation de la Base de Données
Schéma relationnel optimisé pour gérer :
- Relations many-to-many entre recettes et ingrédients
- Quantités par portion de base
- Workflow de liste de courses (`active` → `locked` → `finalized`)

### 2. Algorithme de Consolidation
L'algorithme agrège les quantités d'ingrédients identiques de plusieurs recettes en tenant compte du nombre de portions.


### 3. Interface Mobile-First
Design pensé pour une utilisation en magasin avec navigation par onglets et micro-interactions.

## 🎯 Roadmap

**MVP (en cours)**
- [x] Modélisation BDD
- [x] Maquette UI mobile
- [x] Server Actions (CRUD)
- [ ] Intégration frontend ↔ backend
- [ ] Déploiement

**À venir**
- Authentification utilisateur et partage des listes
- Génération de recettes via l'IA Gen
- 
## 👩‍💻 Auteure

**Xinzhu** - Développeuse Fullstack Junior

- Portfolio : [xinzhu.fr](https://xinzhu.fr)
- GitHub : [@Xinzhu99](https://github.com/votre-username)

---

*Projet développé pour répondre à un besoin personnel et enrichir mon portfolio.*