import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  isBanned: boolean;
  credits: number;
  isPremium: boolean;
  premiumUntil: string | null;
  joinedAt: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  originalImage: string; // Base64 or URL
  cleanedImage: string;  // Base64 or URL
  removalsCount: number;
  processedAt: string;
  isSavedProject: boolean;
}

export interface SystemSettings {
  premiumEnabled: boolean;
  dailyFreeLimit: number;
  monthlyFreeLimit: number;
  premiumPrice: number;
  trialDays: number;
  adsEnabled: boolean;
  uploadLimitMB: number;
  adLocations: {
    sidebar: boolean;
    banner: boolean;
    interstitial: boolean;
  };
  homepageHeroTitle: string;
  logoUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ServerLog {
  id: string;
  timestamp: string;
  type: 'info' | 'warn' | 'error' | 'security';
  message: string;
}

export interface Advertisement {
  id: string;
  name: string;
  type: 'banner' | 'responsive' | 'image' | 'html' | 'adsense' | 'third_party' | 'affiliate';
  contentCode: string; // HTML, Script, iframe, or custom block
  imageUrl: string; // Dynamic path or external URL
  destinationUrl: string; // Redirect path
  placement: 'homepage' | 'article' | 'sidebar' | 'header' | 'footer' | 'between_content' | 'popup';
  priority: number; // For prioritizing multiple ads on the same slot
  enabled: boolean;
  startDate: string | null; // ISO Date format or null
  endDate: string | null; // ISO Date format or null
  impressions: number;
  clicks: number;
  deviceTarget?: 'all' | 'desktop' | 'mobile';
  geoTarget?: string;
  abTestGroup?: 'none' | 'A' | 'B';
}

interface DatabaseSchema {
  users: User[];
  projects: Project[];
  settings: SystemSettings;
  blogs: BlogPost[];
  faqs: FAQ[];
  logs: ServerLog[];
  ads: Advertisement[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Default initial data
const initialData: DatabaseSchema = {
  users: [
    {
      id: 'admin-1',
      email: 'ujjawalkumarbhagat983@gmail.com', // Bootstrapped admin from runtime metadata
      passwordHash: 'admin123', // Clean, simple password for preview authentication
      role: 'admin',
      isBanned: false,
      credits: 9999,
      isPremium: true,
      premiumUntil: null,
      joinedAt: new Date().toISOString(),
    },
    {
      id: 'guest-user',
      email: 'guest@cleanpixel.ai',
      passwordHash: 'guest123',
      role: 'user',
      isBanned: false,
      credits: 5,
      isPremium: false,
      premiumUntil: null,
      joinedAt: new Date().toISOString(),
    }
  ],
  projects: [],
  settings: {
    premiumEnabled: true,
    dailyFreeLimit: 5,
    monthlyFreeLimit: 50,
    premiumPrice: 19.99,
    trialDays: 7,
    adsEnabled: true,
    uploadLimitMB: 20,
    adLocations: {
      sidebar: true,
      banner: true,
      interstitial: false,
    },
    homepageHeroTitle: 'Intelligent AI Photo Cleanup & Object Removal',
    logoUrl: '/logo.svg',
  },
  blogs: [
    {
      id: 'blog-1',
      title: 'The Evolution of AI-Powered Photo Inpainting',
      summary: 'How neural networks changed the way we edit photographs and remove unwanted elements.',
      content: 'Digital photo editing has undergone a massive paradigm shift. Traditional cloning and healing tools required tedious manual precision, shifting pixels from one sector of an image to another. Today, deep learning inpainting models can semantically understand an entire image, generating realistic textures and structural elements that never existed before to replace unwanted details seamlessly.',
      publishedAt: '2026-07-15T12:00:00Z',
    },
    {
      id: 'blog-2',
      title: 'Best Practices for Clean Watermark Removal',
      summary: 'A guide on how to safely and legally clean images that you own or have permission to edit.',
      content: 'Watermarks serve as crucial indicators of intellectual property. However, content creators frequently lose access to original unwatermarked files or need to clean up promotional graphics for which they hold the copyright. When removing watermarks, ensure you have explicit legal permission or hold full authorship rights over the underlying imagery to respect licensing rules.',
      publishedAt: '2026-07-16T15:30:00Z',
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is CleanPixel AI?',
      answer: 'CleanPixel AI is an advanced, modern web tool powered by cutting-edge intelligence that helps you automatically or manually remove unwanted objects, people, power lines, text, blemishes, and authorized watermarks from your photos in seconds.'
    },
    {
      id: 'faq-2',
      question: 'Is watermark removal legal?',
      answer: 'Yes, provided you are the copyright holder, have explicit authorization, or own the image. Our platform enforces an active owner-authorization warning and security logs to verify user permissions and prevent copyright abuse.'
    },
    {
      id: 'faq-3',
      question: 'What file formats and sizes are supported?',
      answer: 'We support JPG, JPEG, PNG, and WEBP formats up to 20MB. Standard users can clean up high-resolution files, while Premium subscribers enjoy HD outputs and batch file processing.'
    }
  ],
  logs: [
    {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      type: 'info',
      message: 'CleanPixel AI database initialized successfully.'
    }
  ],
  ads: [
    {
      id: 'ad-1',
      name: 'CleanPixel Premium Upgrade Promo',
      type: 'image',
      contentCode: '',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      destinationUrl: '#upgrade',
      placement: 'header',
      priority: 10,
      enabled: true,
      startDate: null,
      endDate: null,
      impressions: 42,
      clicks: 4
    },
    {
      id: 'ad-2',
      name: 'DesignCraft AI - Affiliate Banner',
      type: 'affiliate',
      contentCode: '<div class="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-center shadow-lg"><h4 class="font-bold text-sm tracking-wide">DesignCraft AI Creative Suite</h4><p class="text-xs text-indigo-100 mt-1">Stunning vectors and layout generation in seconds with AI. Claim your 25% partner discount today!</p><a href="https://ai.studio/build" target="_blank" class="inline-block mt-3 px-4 py-1.5 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs font-bold transition-all">Explore Sister App</a></div>',
      imageUrl: '',
      destinationUrl: 'https://ai.studio/build',
      placement: 'sidebar',
      priority: 5,
      enabled: true,
      startDate: null,
      endDate: null,
      impressions: 28,
      clicks: 3
    },
    {
      id: 'ad-3',
      name: 'CleanPixel Mobile Companion App',
      type: 'responsive',
      contentCode: '',
      imageUrl: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=1200&q=80',
      destinationUrl: 'https://ai.studio/build',
      placement: 'footer',
      priority: 8,
      enabled: true,
      startDate: null,
      endDate: null,
      impressions: 110,
      clicks: 12
    }
  ]
};

export class LocalDB {
  private static init() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  }

  private static read(): DatabaseSchema {
    this.init();
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading DB, returning initial data', e);
      return initialData;
    }
  }

  private static write(data: DatabaseSchema) {
    this.init();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  // --- Users Operations ---
  static getUsers(): User[] {
    return this.read().users;
  }

  static getUserById(id: string): User | undefined {
    return this.read().users.find(u => u.id === id);
  }

  static getUserByEmail(email: string): User | undefined {
    return this.read().users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  static createUser(email: string, passwordHash: string): User {
    const db = this.read();
    const newUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase(),
      passwordHash,
      role: 'user',
      isBanned: false,
      credits: db.settings.dailyFreeLimit,
      isPremium: false,
      premiumUntil: null,
      joinedAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    this.addLogInternal(db, 'info', `New user registered: ${email}`);
    this.write(db);
    return newUser;
  }

  static updateUser(id: string, updates: Partial<User>): User {
    const db = this.read();
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    db.users[index] = { ...db.users[index], ...updates };
    this.write(db);
    return db.users[index];
  }

  static deleteUser(id: string) {
    const db = this.read();
    db.users = db.users.filter(u => u.id !== id);
    db.projects = db.projects.filter(p => p.userId !== id);
    this.write(db);
  }

  // --- Projects Operations ---
  static getProjects(userId?: string): Project[] {
    const db = this.read();
    if (userId) {
      return db.projects.filter(p => p.userId === userId);
    }
    return db.projects;
  }

  static createProject(userId: string, title: string, originalImage: string, cleanedImage: string, removalsCount: number): Project {
    const db = this.read();
    
    // Check and deduct credit if not premium
    const user = db.users.find(u => u.id === userId);
    if (user && !user.isPremium && user.role !== 'admin') {
      if (user.credits <= 0) {
        throw new Error('Insufficient credits. Please upgrade or wait for daily reset.');
      }
      user.credits -= 1;
    }

    const newProject: Project = {
      id: 'p-' + Math.random().toString(36).substr(2, 9),
      userId,
      title,
      originalImage,
      cleanedImage,
      removalsCount,
      processedAt: new Date().toISOString(),
      isSavedProject: true,
    };
    
    db.projects.push(newProject);
    this.addLogInternal(db, 'info', `User ${userId} processed an image with ${removalsCount} removals.`);
    this.write(db);
    return newProject;
  }

  static deleteProject(projectId: string, userId: string) {
    const db = this.read();
    db.projects = db.projects.filter(p => !(p.id === projectId && p.userId === userId));
    this.write(db);
  }

  // --- Settings ---
  static getSettings(): SystemSettings {
    return this.read().settings;
  }

  static updateSettings(updates: Partial<SystemSettings>): SystemSettings {
    const db = this.read();
    db.settings = { ...db.settings, ...updates };
    this.addLogInternal(db, 'info', `System settings updated.`);
    this.write(db);
    return db.settings;
  }

  // --- Blogs & FAQs ---
  static getBlogs(): BlogPost[] {
    return this.read().blogs;
  }

  static addBlog(title: string, summary: string, content: string): BlogPost {
    const db = this.read();
    const blog: BlogPost = {
      id: 'b-' + Math.random().toString(36).substr(2, 9),
      title,
      summary,
      content,
      publishedAt: new Date().toISOString(),
    };
    db.blogs.push(blog);
    this.write(db);
    return blog;
  }

  static deleteBlog(id: string) {
    const db = this.read();
    db.blogs = db.blogs.filter(b => b.id !== id);
    this.write(db);
  }

  static getFAQs(): FAQ[] {
    return this.read().faqs;
  }

  static addFAQ(question: string, answer: string): FAQ {
    const db = this.read();
    const faq: FAQ = {
      id: 'f-' + Math.random().toString(36).substr(2, 9),
      question,
      answer,
    };
    db.faqs.push(faq);
    this.write(db);
    return faq;
  }

  static deleteFAQ(id: string) {
    const db = this.read();
    db.faqs = db.faqs.filter(f => f.id !== id);
    this.write(db);
  }

  // --- Logs Operations ---
  static getLogs(): ServerLog[] {
    return this.read().logs;
  }

  static addLog(type: 'info' | 'warn' | 'error' | 'security', message: string) {
    const db = this.read();
    this.addLogInternal(db, type, message);
    this.write(db);
  }

  private static addLogInternal(db: DatabaseSchema, type: 'info' | 'warn' | 'error' | 'security', message: string) {
    const log: ServerLog = {
      id: 'l-' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      type,
      message,
    };
    db.logs.unshift(log);
    if (db.logs.length > 500) {
      db.logs = db.logs.slice(0, 500); // Caps logs size
    }
  }

  // --- Advertisement Operations ---
  static getAds(): Advertisement[] {
    const db = this.read();
    if (!db.ads) {
      db.ads = [];
      this.write(db);
    }
    return db.ads;
  }

  static getActiveAds(placement?: string): Advertisement[] {
    const db = this.read();
    let ads = db.ads || [];
    const now = new Date();
    
    // Filter active and scheduled ads
    ads = ads.filter(ad => {
      if (!ad.enabled) return false;
      if (placement && ad.placement !== placement) return false;
      if (ad.startDate && new Date(ad.startDate) > now) return false;
      if (ad.endDate && new Date(ad.endDate) < now) return false;
      return true;
    });

    // Sort by priority descending
    return ads.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  static createAd(ad: Omit<Advertisement, 'id' | 'impressions' | 'clicks'>): Advertisement {
    const db = this.read();
    if (!db.ads) db.ads = [];
    const newAd: Advertisement = {
      ...ad,
      id: 'ad-' + Math.random().toString(36).substr(2, 9),
      impressions: 0,
      clicks: 0
    };
    db.ads.push(newAd);
    this.addLogInternal(db, 'info', `Advertisement created: ${newAd.name} [Placement: ${newAd.placement}]`);
    this.write(db);
    return newAd;
  }

  static updateAd(id: string, updates: Partial<Advertisement>): Advertisement {
    const db = this.read();
    if (!db.ads) db.ads = [];
    const index = db.ads.findIndex(ad => ad.id === id);
    if (index === -1) throw new Error('Advertisement not found');
    db.ads[index] = { ...db.ads[index], ...updates };
    this.addLogInternal(db, 'info', `Advertisement updated: ${db.ads[index].name}`);
    this.write(db);
    return db.ads[index];
  }

  static deleteAd(id: string) {
    const db = this.read();
    if (!db.ads) db.ads = [];
    const ad = db.ads.find(a => a.id === id);
    if (ad) {
      this.addLogInternal(db, 'security', `Advertisement deleted: ${ad.name}`);
    }
    db.ads = db.ads.filter(ad => ad.id !== id);
    this.write(db);
  }

  static recordAdImpression(id: string) {
    const db = this.read();
    if (!db.ads) db.ads = [];
    const ad = db.ads.find(ad => ad.id === id);
    if (ad) {
      ad.impressions = (ad.impressions || 0) + 1;
      this.write(db);
    }
  }

  static recordAdClick(id: string) {
    const db = this.read();
    if (!db.ads) db.ads = [];
    const ad = db.ads.find(ad => ad.id === id);
    if (ad) {
      ad.clicks = (ad.clicks || 0) + 1;
      this.write(db);
    }
  }

  // --- Backup & Restore ---
  static exportBackup(): string {
    return JSON.stringify(this.read(), null, 2);
  }

  static importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.users) && Array.isArray(parsed.projects)) {
        this.write(parsed);
        this.addLog('info', 'Database successfully restored from backup.');
        return true;
      }
      return false;
    } catch (e) {
      console.error('Backup restoration failed', e);
      return false;
    }
  }
}
