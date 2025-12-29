# Arisako - Trustless Social Savings on Base

<div align="center">

**Tabungan Sosial Terpercaya dengan Smart Contract**

[![License:  MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with OnchainKit](https://img.shields.io/badge/Built%20with-OnchainKit-blue)](https://onchainkit.xyz)
[![Base Network](https://img.shields.io/badge/Network-Base-0052FF)](https://base.org)


</div>

---

## 📖 Tentang Arisako

**Arisako** (Arisan Community / Social Loop) adalah platform **Tabungan Sosial Terpercaya** yang mendigitalisasi tradisi arisan Indonesia menggunakan teknologi blockchain. Dengan menggabungkan nilai gotong-royong dengan keamanan Smart Contract, Arisako memberikan solusi alternatif pembiayaan mikro yang adil, transparan, dan bebas riba.

### 🎯 Masalah yang Diselesaikan

- ❌ **Krisis Kepercayaan**:  Arisan konvensional rawan "Bandar Kabur"
- 💸 **Jebakan Pinjol**: Bunga tinggi 10-30% dari pinjaman online
- 🎲 **Ketidakadilan**: Sistem kocokan acak tidak mempertimbangkan kebutuhan mendesak
- 🏦 **Eksklusivitas Keuangan**: Rakyat kecil sulit akses perbankan/DeFi

### ✨ Solusi Arisako

- ✅ **Smart Contract Escrow**: Dana dikunci oleh kode, bukan admin
- 🤖 **AI-Powered Priority**: Fairness Scheduler berdasarkan kebutuhan
- 🤝 **Social Collateral**: Digital Vouching untuk inklusivitas
- ☪️ **Sharia Compliance**: Bebas riba & Ujrah-based

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Web3**: OnchainKit, Wagmi, Viem
- **State Management**: Zustand
- **UI Components**: Radix UI

### Smart Contract
- **Language**: Solidity ^0.8.24
- **Framework**: Hardhat
- **Libraries**: OpenZeppelin Contracts
- **Network**: Base L2 (Sepolia Testnet)

### Backend & Integrations
- **Database**:  Supabase (PostgreSQL)
- **AI**: x via OpenRouter
- **Stablecoin**: IDRX (Rupiah Stablecoin)
- **Authentication**:  SIWE (Sign-In with Ethereum)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ dan pnpm
- MetaMask atau Coinbase Wallet
- Git

### 1. Clone Repository

```bash
git clone https://github.com/HusniAbdillah/arisako.git
cd arisako
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env.local
```

Isi `.env.local` dengan kredensial Anda:

```bash
# Minimal configuration untuk development
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=your_model_name
```

### 4. Setup Database

```bash
# Jalankan Supabase migrations
pnpm supabase db push
```

### 5. Compile Smart Contracts

```bash
pnpm compile
```

### 6. Run Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. 

---

## 📁 Struktur Proyek

```
arisako/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   └── group/             # Group management
├── components/            # React components
│   ├── arisan/           # Arisan-specific components
│   ├── wallet/           # Wallet components
│   ├── ai/               # AI-related components
│   └── ui/               # Reusable UI components
├── contracts/            # Smart contracts
│   ├── core/            # Main contracts
│   ├── interfaces/      # Contract interfaces
│   └── libraries/       # Helper libraries
├── lib/                  # Utilities
│   ├── ai/              # OpenAI integration
│   ├── supabase/        # Database client
│   ├── web3/            # Web3 utilities
│   └── utils/           # Helper functions
├── hooks/                # Custom React hooks
├── contexts/             # React contexts
├── types/                # TypeScript types
├── scripts/              # Deployment scripts
│   ├── deploy/          # Deployment scripts
│   └── utils/           # Script utilities
├── test/                 # Smart contract tests
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
└── public/              # Static assets
```

---

## 📜 Smart Contract Development

### Compile Contracts

```bash
pnpm compile
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage
```

### Deploy to Testnet

```bash
# Start local node
pnpm node

# Deploy to local
pnpm deploy:local

# Deploy to Base Sepolia
pnpm deploy: sepolia
```

### Verify Contract

```bash
pnpm verify:sepolia <CONTRACT_ADDRESS>
```

---

## 🧪 Testing

### Frontend Tests

```bash
# Run unit tests
pnpm test:unit

# Run in watch mode
pnpm test: watch
```

### Smart Contract Tests

```bash
# Run Hardhat tests
pnpm test

# With gas reporting
REPORT_GAS=true pnpm test
```

---

### Development Workflow

1. Buat branch fitur (`git checkout -b feat/AmazingFeature`)
2. Commit perubahan (`git commit -m 'feat: Add AmazingFeature'`)
3. Push ke branch (`git push origin feat/AmazingFeature`)
4. Buat Pull Request

---

## 🗺️ Roadmap

- [x] **Phase 1**: Setup Project & Infrastructure
- [ ] **Phase 2**: Smart Contract Development
  - [ ] AriasakoPool.sol (Main Contract)
  - [ ] VestingManager.sol (Vesting Mechanism)
  - [ ] SocialVouching.sol (Digital Vouching)
- [ ] **Phase 3**: Frontend Integration
  - [ ] Wallet Connection
  - [ ] Group Creation & Management
  - [ ] Payment Flow
- [ ] **Phase 4**: AI Features
  - [ ] Trust Score Analysis
  - [ ] Fairness Scheduler
- [ ] **Phase 5**: Testing & Audit
- [ ] **Phase 6**:  Mainnet Deployment

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Team & Contact

**Arisako Team**

**Links**
- Website: [arisako.vercel.app](https://arisako.vercel.app)
- GitHub: [github.com/HusniAbdillah/arisako](https://github.com/HusniAbdillah/arisako)
- Twitter: [@ArisakoApp](https://twitter.com/ArisakoApp) (soon)

---

## 🙏 Acknowledgments

- [OnchainKit](https://onchainkit.xyz) - Web3 components
- [Base](https://base.org) - L2 blockchain
- [IDRX](https://www.rupiah.io) - Rupiah stablecoin
- [Supabase](https://supabase.com) - Backend infrastructure

---

<div align="center">

Made with ❤️ for Indonesian communities

**#BuildOnBase #TrustlessSocialSavings #Web3ForGood**

</div>