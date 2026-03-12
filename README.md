# 🎓 Student Dashboard — Containerized React App

A React frontend containerized with a **multi-stage Docker build** and deployed via **GitHub Actions CI/CD**.

---

## 📁 Project Structure

```
mar12/
├── public/index.html
├── src/
│   ├── App.js          ← Main React component
│   ├── App.css
│   └── index.js
├── Dockerfile          ← Multi-stage build (node → nginx)
├── nginx.conf          ← Nginx config with React Router support
├── .dockerignore
├── .gitignore
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml  ← GitHub Actions CI/CD pipeline
```

---

## 🐳 Docker Commands

```bash
# Build the image
docker build -t student-dashboard .

# Run locally on port 80
docker run -p 80:80 student-dashboard

# Tag as versioned release
docker tag student-dashboard your-dockerhub-user/student-dashboard:v1.0-frontend

# Push to Docker Hub
docker push your-dockerhub-user/student-dashboard:v1.0-frontend
```

Visit → **http://localhost**

---

## 🚀 CI/CD – GitHub Actions

| Trigger | Action |
|---------|--------|
| Push to `main` | Build image → Push to Docker Hub → Deploy to PaaS |

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |
| `RENDER_DEPLOY_HOOK_URL` | (Optional) Render deploy hook |
| `RAILWAY_TOKEN` | (Optional) Railway token |
| `FLY_API_TOKEN` | (Optional) Fly.io token |

---

## ☁️ PaaS Deployment Options

### Option A — Render (Free tier)
1. New → **Web Service** → Connect GitHub repo
2. Environment: **Docker**
3. Auto-deploy from `main` ✅

### Option B — Railway
```bash
npm install -g @railway/cli
railway login && railway up
```

### Option C — Fly.io
```bash
brew install flyctl
fly launch && fly deploy
```

---

## 🔄 Rollback

```bash
# Pull previous image version
docker pull your-dockerhub-user/student-dashboard:v1.0-frontend

# Run rolled-back version
docker run -p 80:80 your-dockerhub-user/student-dashboard:v1.0-frontend
```

---

## 🔒 HTTPS

- **Render / Railway / Fly.io** provide free automatic HTTPS out of the box.
- Custom domain: add your domain in the PaaS dashboard → SSL is auto-provisioned via Let's Encrypt.

---

## 📦 Image Size

| Stage | Base | Size |
|-------|------|------|
| Builder | `node:18-alpine` | ~350 MB (discarded) |
| Final  | `nginx:stable-alpine` | **~25 MB** ✅ |
