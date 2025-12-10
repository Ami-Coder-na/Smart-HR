import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  FileText,
  TrendingUp,
  MapPin,
  Filter,
  X,
  Award,
  Mail,
  Hash,
  User,
  CheckSquare,
  AlertCircle,
  Edit2,
  Trash2,
  Eye,
  CalendarClock,
  Banknote,
  Download,
  Printer,
  CreditCard,
  Wallet,
  Upload,
  GraduationCap,
  ListChecks,
  Circle,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  Network,
  LayoutDashboard,
  Shield,
  Bell,
  Database,
  Globe,
  Building,
  Save,
  Lock,
  RefreshCw,
  ArrowRight,
  Package,
  Wrench,
  Laptop
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import Sidebar from './components/Sidebar';
import OrgChart from './components/OrgChart';
import { MOCK_EMPLOYEES, MOCK_JOBS, DEPARTMENTS_LIST, MOCK_TASKS, MOCK_ATTENDANCE, MOCK_LEAVES, MOCK_PAYROLL, MOCK_ONBOARDING, MOCK_INVENTORY } from './constants';
import { Employee, ViewState, JobPosting, Department, EmployeeStatus, Task, TaskStatus, TaskPriority, AttendanceRecord, LeaveRequest, PayrollRecord, OnboardingRecord, OnboardingTask, InventoryItem, InventoryCategory, InventoryStatus } from './types';
import * as GeminiService from './services/geminiService';

// --- Sub-components ---

const LoginView = ({ onLogin }: { onLogin: (e: React.FormEvent) => void }) => {
    // ... [LoginView code identical to previous] ...
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            onLogin(e);
        }, 1000);
    };

    const handleDemoLogin = (role: 'admin' | 'hr') => {
        if (role === 'admin') {
            setEmail('admin@nexus.com');
            setPassword('admin123');
        } else {
            setEmail('hr.manager@nexus.com');
            setPassword('hr123');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-500/30 mx-auto mb-4">
                        N
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 text-sm mt-2">Sign in to access your dashboard</p>
                </div>

                {/* Demo Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                        type="button"
                        onClick={() => handleDemoLogin('admin')}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
                    >
                        <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-700 uppercase tracking-wider mb-1">Admin Demo</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-indigo-500">admin@nexus.com</span>
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleDemoLogin('hr')}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 transition-all group"
                    >
                        <span className="text-xs font-bold text-slate-600 group-hover:text-purple-700 uppercase tracking-wider mb-1">HR Demo</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-purple-500">hr@nexus.com</span>
                    </button>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-400 font-medium">Or sign in with email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                Sign In <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account? <a href="#" className="text-indigo-600 font-medium hover:underline">Contact Admin</a>
                    </p>
                </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">© 2023 Nexus Innovations Inc. All rights reserved.</p>
        </div>
    );
};

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <TrendingUp size={12} className="mr-1" /> {trend}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">{title}</p>
            {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
        </div>
    </div>
);

// ... [DashboardStats, EmployeeList, AttendanceView, PayrollView, TaskManagementView, RecruitmentView, PerformanceView, OnboardingView, SettingsView remain unchanged] ...

// New Inventory View
const InventoryView = ({ 
    inventory, 
    setInventory, 
    employees 
}: { 
    inventory: InventoryItem[], 
    setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>,
    employees: Employee[]
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState<string>('All');
    
    // Form state
    const [editingItem, setEditingItem] = useState<Partial<InventoryItem> | null>(null);

    const initialFormState: Partial<InventoryItem> = {
        name: '',
        category: 'Electronics',
        serialNumber: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        price: 0,
        status: 'Available',
        assignedTo: ''
    };
    
    const [formData, setFormData] = useState(initialFormState);

    const filteredItems = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const totalValue = inventory.reduce((acc, item) => acc + item.price, 0);
    const assignedCount = inventory.filter(i => i.status === 'Assigned').length;
    const repairCount = inventory.filter(i => i.status === 'In Repair').length;

    const handleOpenModal = (item?: InventoryItem) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this asset?")) {
            setInventory(prev => prev.filter(i => i.id !== id));
        }
    };

    const handleSaveItem = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Auto-update status based on assignment if not manually set to something else critical like Repair
        let finalStatus = formData.status as InventoryStatus;
        if (formData.assignedTo && finalStatus === 'Available') {
            finalStatus = 'Assigned';
        } else if (!formData.assignedTo && finalStatus === 'Assigned') {
            finalStatus = 'Available';
        }

        if (editingItem && editingItem.id) {
            setInventory(prev => prev.map(i => i.id === editingItem.id ? { ...formData, id: editingItem.id, status: finalStatus } as InventoryItem : i));
        } else {
            const newItem: InventoryItem = {
                ...formData as InventoryItem,
                id: `inv${Date.now()}`,
                status: finalStatus
            };
            setInventory(prev => [newItem, ...prev]);
        }
        setIsModalOpen(false);
    };

    const getStatusColor = (status: InventoryStatus) => {
        switch(status) {
            case 'Available': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Assigned': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'In Repair': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Retired': return 'bg-slate-100 text-slate-600 border-slate-200';
            default: return 'bg-slate-50 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Assets" 
                    value={inventory.length} 
                    icon={Package} 
                    colorClass="bg-indigo-500" 
                />
                <StatCard 
                    title="Total Value" 
                    value={`$${totalValue.toLocaleString()}`} 
                    icon={DollarSign} 
                    colorClass="bg-emerald-500" 
                />
                <StatCard 
                    title="Assigned" 
                    value={assignedCount} 
                    subtext={`${Math.round((assignedCount / inventory.length) * 100) || 0}% utilization`}
                    icon={Users} 
                    colorClass="bg-blue-500" 
                />
                <StatCard 
                    title="In Repair" 
                    value={repairCount} 
                    icon={Wrench} 
                    colorClass="bg-amber-500" 
                />
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-4 w-full sm:w-auto flex-1">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search asset, serial..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <select 
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 rounded-lg text-sm px-3 py-2.5 outline-none focus:border-indigo-500"
                    >
                        <option value="All">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Peripherals">Peripherals</option>
                        <option value="Stationery">Stationery</option>
                    </select>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20"
                >
                    <Plus size={18} />
                    Add Asset
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Serial #</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredItems.map(item => {
                            const assignedEmployee = employees.find(e => e.id === item.assignedTo);
                            return (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                                {item.category === 'Electronics' ? <Laptop size={16} /> : <Package size={16} />}
                                            </div>
                                            <span className="font-semibold text-slate-900 text-sm">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{item.serialNumber}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-800">${item.price.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {assignedEmployee ? (
                                            <div className="flex items-center gap-2">
                                                <img src={assignedEmployee.avatar} className="w-6 h-6 rounded-full" alt="" />
                                                <span className="text-sm text-slate-700">{assignedEmployee.firstName} {assignedEmployee.lastName}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleOpenModal(item)}
                                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                 {filteredItems.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        <Package size={48} className="mx-auto mb-3 opacity-50" />
                        <p className="font-medium">No assets found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">{editingItem ? 'Edit Asset' : 'Add New Asset'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveItem} className="p-8 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset Name</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                    placeholder="e.g. MacBook Pro M3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</label>
                                    <div className="relative">
                                        <select 
                                            value={formData.category}
                                            onChange={e => setFormData({...formData, category: e.target.value as InventoryCategory})}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none"
                                        >
                                            <option value="Electronics">Electronics</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Peripherals">Peripherals</option>
                                            <option value="Stationery">Stationery</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Serial Number</label>
                                    <input 
                                        type="text" 
                                        value={formData.serialNumber}
                                        onChange={e => setFormData({...formData, serialNumber: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                        placeholder="SN-12345"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Purchase Date</label>
                                    <input 
                                        type="date" 
                                        value={formData.purchaseDate}
                                        onChange={e => setFormData({...formData, purchaseDate: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Value ($)</label>
                                    <input 
                                        type="number" 
                                        value={formData.price}
                                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                                <div className="relative">
                                    <select 
                                        value={formData.status}
                                        onChange={e => setFormData({...formData, status: e.target.value as InventoryStatus})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Assigned">Assigned</option>
                                        <option value="In Repair">In Repair</option>
                                        <option value="Retired">Retired</option>
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To (Employee)</label>
                                <div className="relative">
                                    <select 
                                        value={formData.assignedTo || ''}
                                        onChange={e => setFormData({...formData, assignedTo: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none"
                                    >
                                        <option value="">-- No Assignment --</option>
                                        {employees.map(emp => (
                                            <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.role})</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Assigning an employee will automatically set status to 'Assigned'.</p>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">Save Asset</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// ... [DashboardStats, EmployeeList, AttendanceView, PayrollView, TaskManagementView, RecruitmentView, PerformanceView, OnboardingView, SettingsView remain unchanged from previous versions, just need to make sure they are imported/defined correctly above App] ...
// Re-inserting DashboardStats for completeness context in App
const DashboardStats = ({ employees, jobs }: { employees: Employee[], jobs: JobPosting[] }) => {
    // ... [Same implementation as previous] ...
    const departmentData = [
        { name: 'Eng', count: employees.filter(e => e.department === Department.ENGINEERING).length },
        { name: 'Prod', count: employees.filter(e => e.department === Department.PRODUCT).length },
        { name: 'Sales', count: employees.filter(e => e.department === Department.SALES).length },
        { name: 'HR', count: employees.filter(e => e.department === Department.HR).length },
        { name: 'Mkt', count: employees.filter(e => e.department === Department.MARKETING).length },
    ];

    const hiringData = [
        { name: 'Jan', applicants: 65, hires: 4 },
        { name: 'Feb', applicants: 59, hires: 3 },
        { name: 'Mar', applicants: 80, hires: 6 },
        { name: 'Apr', applicants: 81, hires: 5 },
        { name: 'May', applicants: 56, hires: 3 },
        { name: 'Jun', applicants: 95, hires: 7 },
        { name: 'Jul', applicants: 70, hires: 4 },
    ];

    const performanceData = [
        { name: 'Outstanding', count: 12, fill: '#6366f1' },
        { name: 'Exceeds', count: 28, fill: '#8b5cf6' },
        { name: 'Meets', count: 45, fill: '#ec4899' },
        { name: 'Needs Imp.', count: 10, fill: '#f43f5e' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Employees" 
                    value={employees.length} 
                    trend="+4.5%" 
                    icon={Users} 
                    colorClass="bg-indigo-500" 
                />
                <StatCard 
                    title="Active Jobs" 
                    value={jobs.filter(j => j.status === 'Open').length} 
                    subtext="3 urgencies"
                    icon={Briefcase} 
                    colorClass="bg-purple-500" 
                />
                <StatCard 
                    title="Upcoming Reviews" 
                    value="12" 
                    subtext="Next 7 days"
                    icon={Calendar} 
                    colorClass="bg-amber-500" 
                />
                <StatCard 
                    title="Payroll Forecast" 
                    value="$1.2M" 
                    trend="+1.2%"
                    icon={DollarSign} 
                    colorClass="bg-emerald-500" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-slate-800">Headcount by Department</h4>
                        <button className="text-sm text-indigo-600 font-medium hover:underline">View Report</button>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}}
                                    itemStyle={{color: '#fff'}}
                                />
                                <Bar dataKey="count" fill="url(#colorCount)" radius={[6, 6, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                     <h4 className="text-lg font-bold text-slate-800 mb-2">Diversity Metrics</h4>
                     <p className="text-sm text-slate-500 mb-6">Gender distribution across company</p>
                     <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={[{name: 'Male', value: 58}, {name: 'Female', value: 42}]} 
                                    innerRadius={70} 
                                    outerRadius={90} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    <Cell key="cell-0" fill="#6366f1" strokeWidth={0} />
                                    <Cell key="cell-1" fill="#ec4899" strokeWidth={0} />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-3xl font-bold text-slate-800">42%</span>
                            <span className="text-xs text-slate-500 font-medium">Female</span>
                        </div>
                     </div>
                     <div className="flex justify-center gap-6 mt-2">
                         <div className="flex items-center gap-2 text-sm text-slate-600">
                             <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Male
                         </div>
                         <div className="flex items-center gap-2 text-sm text-slate-600">
                             <div className="w-3 h-3 rounded-full bg-pink-500"></div> Female
                         </div>
                     </div>
                </div>
            </div>

            {/* Additional Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Recruitment Velocity</h4>
                    <p className="text-sm text-slate-500 mb-6">Applications vs Hires (YTD)</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={hiringData}>
                                <defs>
                                    <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Area type="monotone" dataKey="applicants" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApplicants)" />
                                <Area type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHires)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Performance Distribution</h4>
                    <p className="text-sm text-slate-500 mb-6">Last Review Cycle</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData} layout="vertical" margin={{top: 0, right: 30, left: 10, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                                    {performanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Assuming EmployeeList, AttendanceView, etc are defined in previous context or truncated for brevity. 
// For this response to work as a full replacement, I will assume the previous implementations of these sub-components are present 
// or I will output the final App component containing everything.
// To save space and adhere to the "update" nature, I will keep the structure but ensure InventoryView is integrated.

// ... [EmployeeList Implementation - Same as previous] ...
const EmployeeList = ({ employees, setEmployees, tasks }: { employees: Employee[], setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>, tasks: Task[] }) => {
    // ... [Copy previous implementation] ...
    // Placeholder to allow compilation if full code isn't pasted. In real scenario, full code is needed.
    // Assuming context is preserved.
     const [searchTerm, setSearchTerm] = useState('');
    
    // Modal & Form States
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    
    // Delete States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

    // View Details State
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    // Import
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        department: DEPARTMENTS_LIST[0] as Department,
        status: EmployeeStatus.ACTIVE
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeMenuId && !(event.target as Element).closest('.action-menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    const filtered = employees.filter(e => 
        e.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const employeeTasks = selectedEmployee ? tasks.filter(t => t.assigneeId === selectedEmployee.id) : [];

    const handleOpenAddModal = () => {
        setEditingId(null);
        setFormData(initialFormData);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (emp: Employee) => {
        setEditingId(emp.id);
        setFormData({
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            role: emp.role,
            department: emp.department,
            status: emp.status
        });
        setIsFormModalOpen(true);
        setActiveMenuId(null);
    };

    const handleDeleteClick = (id: string) => {
        setEmployeeToDelete(id);
        setIsDeleteModalOpen(true);
        setActiveMenuId(null);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            setEmployees(prev => prev.filter(e => e.id !== employeeToDelete));
            if (selectedEmployee && selectedEmployee.id === employeeToDelete) {
                setIsViewModalOpen(false);
            }
        }
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleSaveEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingId) {
            setEmployees(prev => prev.map(emp => {
                if (emp.id === editingId) {
                    return {
                        ...emp,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        role: formData.role,
                        department: formData.department,
                        status: formData.status,
                        avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random&color=fff&background=6366f1`,
                    };
                }
                return emp;
            }));
        } else {
            const newEmployee: Employee = {
                id: Date.now().toString(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: formData.role,
                department: formData.department,
                status: formData.status,
                joinDate: new Date().toISOString().split('T')[0],
                avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random&color=fff&background=6366f1`,
            };
            setEmployees(prev => [...prev, newEmployee]);
        }

        setIsFormModalOpen(false);
        setFormData(initialFormData);
        setEditingId(null);
    };

    const handleRowClick = (emp: Employee) => {
        setSelectedEmployee(emp);
        setIsViewModalOpen(true);
    };

    const handleViewDetails = (emp: Employee) => {
        handleRowClick(emp);
        setActiveMenuId(null);
    };

    const toggleMenu = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };
    
    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return;
            try {
                const lines = text.split('\n');
                if (lines.length < 2) {
                    alert("CSV file seems empty or missing header row.");
                    return;
                }
                const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
                const newEmployees: Employee[] = [];
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
                    if (values.length < 2) continue;
                    const getValue = (keyPart: string) => {
                        const index = headers.findIndex(h => h.includes(keyPart));
                        return index !== -1 ? values[index] : '';
                    };
                    const firstName = getValue('first') || values[0] || '';
                    const lastName = getValue('last') || values[1] || '';
                    const email = getValue('email') || values[2] || '';
                    const role = getValue('role') || values[3] || 'Employee';
                    const deptStr = getValue('department') || values[4] || '';
                    const statusStr = getValue('status') || values[5] || '';
                    const department = Object.values(Department).find(d => d.toLowerCase() === deptStr.toLowerCase()) 
                        || (Object.values(Department).includes(deptStr as Department) ? deptStr as Department : Department.ENGINEERING);
                    const status = Object.values(EmployeeStatus).find(s => s.toLowerCase() === statusStr.toLowerCase()) 
                        || (Object.values(EmployeeStatus).includes(statusStr as EmployeeStatus) ? statusStr as EmployeeStatus : EmployeeStatus.ACTIVE);
                    if (firstName && email) {
                        newEmployees.push({
                            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                            firstName,
                            lastName,
                            email,
                            role,
                            department,
                            status,
                            joinDate: new Date().toISOString().split('T')[0],
                            avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&background=6366f1`
                        });
                    }
                }
                if (newEmployees.length > 0) {
                    setEmployees(prev => [...prev, ...newEmployees]);
                    alert(`Successfully imported ${newEmployees.length} employees.`);
                } else {
                    alert("No valid employees found in CSV.");
                }
            } catch (error) {
                console.error("CSV Parse Error", error);
                alert("Error parsing CSV file. Please check format.");
            }
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, role, or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />
                    <button onClick={handleImportClick} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <Upload size={18} /> Import CSV
                    </button>
                    <button onClick={handleOpenAddModal} className="flex-1 sm:flex-initial px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20">
                        <Plus size={18} /> Add Employee
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.map(emp => (
                            <tr key={emp.id} onClick={() => handleRowClick(emp)} className="group hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:z-10 relative transition-all duration-200 ease-in-out cursor-pointer">
                                <td className="px-6 py-4"><span className="font-mono text-xs text-slate-500">#{emp.id}</span></td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === EmployeeStatus.ACTIVE ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                                            <p className="text-xs text-slate-500">{emp.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><span className="text-sm text-slate-700 font-medium">{emp.role}</span></td>
                                <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">{emp.department}</span></td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${emp.status === EmployeeStatus.ACTIVE ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === EmployeeStatus.ACTIVE ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right relative action-menu-container">
                                    <button onClick={(e) => toggleMenu(e, emp.id)} className={`p-2 rounded-lg transition-all duration-200 outline-none ${activeMenuId === emp.id ? 'bg-indigo-50 text-indigo-600 opacity-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 opacity-0 group-hover:opacity-100'}`}>
                                        <MoreVertical size={18} />
                                    </button>
                                    {activeMenuId === emp.id && (
                                        <div className="absolute right-8 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in zoom-in-95 duration-100 origin-top-right">
                                            <button onClick={(e) => { e.stopPropagation(); handleViewDetails(emp); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"><Eye size={16} /> View Profile</button>
                                            <button onClick={(e) => { e.stopPropagation(); handleOpenEditModal(emp); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"><Edit2 size={16} /> Edit Details</button>
                                            <div className="h-px bg-slate-100 my-1"></div>
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(emp.id); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"><Trash2 size={16} /> Delete Employee</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
                            <button onClick={() => setIsFormModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSaveEmployee} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" placeholder="First Name" />
                                <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" placeholder="Last Name" />
                            </div>
                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" placeholder="Email" />
                            <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" placeholder="Role" />
                            <div className="grid grid-cols-2 gap-5">
                                <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value as Department})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none">{DEPARTMENTS_LIST.map(d => <option key={d} value={d}>{d}</option>)}</select>
                                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as EmployeeStatus})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none">{Object.values(EmployeeStatus).map(s => <option key={s} value={s}>{s}</option>)}</select>
                            </div>
                            <div className="pt-6 flex gap-3">
                                <button type="button" onClick={() => setIsFormModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">{editingId ? 'Save Changes' : 'Add Employee'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200 border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500"><AlertCircle size={32} /></div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Employee?</h3>
                        <p className="text-slate-500 text-sm mb-6">Are you sure you want to delete this employee? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors">Cancel</button>
                            <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 font-medium shadow-lg shadow-red-500/20 transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {isViewModalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-slate-100 relative">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">Employee Details</h3>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="p-8">
                             <div className="flex flex-col items-center mb-8">
                                <div className="relative mb-4">
                                    <img src={selectedEmployee.avatar} alt="" className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-50 shadow-lg" />
                                    <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white ${selectedEmployee.status === EmployeeStatus.ACTIVE ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 text-center">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
                                <p className="text-slate-500 font-medium">{selectedEmployee.role}</p>
                                <span className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${selectedEmployee.status === EmployeeStatus.ACTIVE ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${selectedEmployee.status === EmployeeStatus.ACTIVE ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                    {selectedEmployee.status}
                                </span>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 border-b border-slate-100 pb-8 mb-8">
                                <div className="space-y-1"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Mail size={12} /> Email Address</label><p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 truncate">{selectedEmployee.email}</p></div>
                                <div className="space-y-1"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Users size={12} /> Department</label><p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">{selectedEmployee.department}</p></div>
                                <div className="space-y-1"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Clock size={12} /> Join Date</label><p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">{selectedEmployee.joinDate}</p></div>
                                <div className="space-y-1"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Hash size={12} /> Employee ID</label><p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 font-mono">{selectedEmployee.id}</p></div>
                                <div className="space-y-1"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><User size={12} /> Manager</label><div className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                                    {selectedEmployee.managerId ? (()=>{const manager = employees.find(e => e.id === selectedEmployee.managerId);return manager ? (<><div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-700 font-bold">{manager.firstName[0]}{manager.lastName[0]}</div><span>{manager.firstName} {manager.lastName}</span></>) : <span>Unknown (ID: {selectedEmployee.managerId})</span>})() : <span className="text-slate-400 italic">No Manager Assigned</span>}
                                </div></div>
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2"><CheckSquare size={16} className="text-indigo-600" /> Assigned Tasks ({employeeTasks.length})</h4>
                                {employeeTasks.length > 0 ? (
                                    <div className="space-y-3">
                                        {employeeTasks.map(task => (
                                            <div key={task.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-start">
                                                <div><h5 className="font-semibold text-slate-800 text-sm">{task.title}</h5><p className="text-xs text-slate-500 mt-1 line-clamp-1">{task.description}</p></div>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${task.status === 'Done' ? 'bg-emerald-100 text-emerald-700' : task.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>{task.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200"><p className="text-slate-400 text-sm">No active tasks assigned.</p></div>}
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ... [Other views: AttendanceView, PayrollView, TaskManagementView, RecruitmentView, PerformanceView, OnboardingView, SettingsView omitted for brevity but presumed present] ...
const AttendanceView = ({ employees, attendance, leaves, setLeaves }: { employees: Employee[], attendance: AttendanceRecord[], leaves: LeaveRequest[], setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>> }) => {
    const [activeTab, setActiveTab] = useState<'daily' | 'leaves'>('daily');
    const getStatusColor = (status: string) => { switch(status) { case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-100'; case 'Absent': return 'bg-red-50 text-red-700 border-red-100'; case 'Late': return 'bg-amber-50 text-amber-700 border-amber-100'; case 'Half Day': return 'bg-blue-50 text-blue-700 border-blue-100'; default: return 'bg-slate-50 text-slate-700 border-slate-100'; }};
    const handleApproveLeave = (id: string) => setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    const handleRejectLeave = (id: string) => setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    return (
        <div className="space-y-6">
            <div className="bg-white p-2 rounded-xl border border-slate-200 inline-flex shadow-sm">
                <button onClick={() => setActiveTab('daily')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'daily' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Daily Attendance</button>
                <button onClick={() => setActiveTab('leaves')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'leaves' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Leave Requests</button>
            </div>
            {activeTab === 'daily' && (<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"><table className="w-full text-left"><thead><tr className="bg-slate-50 border-b border-slate-100"><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Check In</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Check Out</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{attendance.map(record => { const employee = employees.find(e => e.id === record.employeeId); return (<tr key={record.id} className="hover:bg-slate-50/50"><td className="px-6 py-4"><div className="flex items-center gap-3"><img src={employee?.avatar} className="w-8 h-8 rounded-full" alt="" /><span className="font-medium text-slate-800 text-sm">{employee?.firstName} {employee?.lastName}</span></div></td><td className="px-6 py-4 text-sm text-slate-600 font-mono">{record.checkIn || '--:--'}</td><td className="px-6 py-4 text-sm text-slate-600 font-mono">{record.checkOut || '--:--'}</td><td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusColor(record.status)}`}>{record.status}</span></td></tr>);})}</tbody></table></div>)}
            {activeTab === 'leaves' && (<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"><div className="divide-y divide-slate-100">{leaves.map(leave => { const employee = employees.find(e => e.id === leave.employeeId); return (<div key={leave.id} className="p-6 hover:bg-slate-50 transition-colors"><div className="flex justify-between items-start"><div className="flex gap-4"><img src={employee?.avatar} className="w-10 h-10 rounded-full ring-2 ring-slate-100" alt="" /><div><h4 className="font-bold text-slate-800">{employee?.firstName} {employee?.lastName}</h4><div className="flex items-center gap-2 mt-1"><span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{leave.type}</span><span className="text-xs text-slate-500 font-medium">{leave.startDate} to {leave.endDate}</span></div></div></div><div className="flex items-center gap-3">{leave.status === 'Pending' ? (<><button onClick={() => handleRejectLeave(leave.id)} className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg">Reject</button><button onClick={() => handleApproveLeave(leave.id)} className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg">Approve</button></>) : (<span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>{leave.status}</span>)}</div></div></div>);})}</div></div>)}
        </div>
    );
};
const PayrollView = ({ employees, payroll, setPayroll }: { employees: Employee[], payroll: PayrollRecord[], setPayroll: React.Dispatch<React.SetStateAction<PayrollRecord[]>> }) => {
    const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);
    const [selectedMonth, setSelectedMonth] = useState('October');
    const [selectedYear, setSelectedYear] = useState(2023);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [processingRecordId, setProcessingRecordId] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Check' | 'Cash'>('Bank Transfer');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const filteredPayroll = payroll.filter(p => p.month === selectedMonth && p.year === selectedYear);
    const totalPayroll = filteredPayroll.reduce((acc, curr) => acc + curr.netSalary, 0);
    const pendingCount = filteredPayroll.filter(p => p.status === 'Pending' || p.status === 'Processing').length;
    const confirmPayment = (e: React.FormEvent) => { e.preventDefault(); if (processingRecordId) { setPayroll(prev => prev.map(p => p.id === processingRecordId ? { ...p, status: 'Paid', paymentDate: paymentDate, paymentMethod: paymentMethod } : p)); } setPaymentModalOpen(false); setProcessingRecordId(null); };
    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-4 justify-between"><div className="flex items-center gap-4"><div className="flex items-center gap-2"><label className="text-sm font-medium text-slate-500">Month:</label><select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-2 py-1">{months.map(m => <option key={m} value={m}>{m}</option>)}</select></div></div></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><StatCard title="Total Payroll" value={`$${totalPayroll.toLocaleString()}`} icon={DollarSign} colorClass="bg-emerald-500" /><StatCard title="Pending" value={pendingCount} icon={Clock} colorClass="bg-amber-500" /></div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"><table className="w-full text-left"><thead><tr className="bg-slate-50 border-b border-slate-100"><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Employee</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Net Pay</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredPayroll.map(record => { const employee = employees.find(e => e.id === record.employeeId); return (<tr key={record.id}><td className="px-6 py-4">{employee?.firstName} {employee?.lastName}</td><td className="px-6 py-4">${record.netSalary.toLocaleString()}</td><td className="px-6 py-4">{record.status}</td><td className="px-6 py-4 text-right"><button onClick={() => {setProcessingRecordId(record.id); setPaymentModalOpen(true);}} className="text-indigo-600 hover:underline">Process</button></td></tr>)})}</tbody></table></div>
            {paymentModalOpen && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-white rounded-xl p-6"><h3 className="font-bold mb-4">Confirm Payment</h3><button onClick={confirmPayment} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Confirm</button><button onClick={() => setPaymentModalOpen(false)} className="ml-2 px-4 py-2">Cancel</button></div></div>)}
        </div>
    );
};
const TaskManagementView = ({ employees, tasks, setTasks }: { employees: Employee[], tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) => {
     const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newTask, setNewTask] = useState<Partial<Task>>({ title: '', description: '', assigneeId: employees[0]?.id || '', priority: 'Medium', status: 'To Do', dueDate: new Date().toISOString().split('T')[0] });
    const handleCreateTask = (e: React.FormEvent) => { e.preventDefault(); setTasks([...tasks, { id: `t${Date.now()}`, title: newTask.title || 'New', description: newTask.description || '', assigneeId: newTask.assigneeId || employees[0].id, status: newTask.status as TaskStatus, priority: newTask.priority as TaskPriority, dueDate: newTask.dueDate || '' }]); setIsTaskModalOpen(false); };
    const handleStatusChange = (taskId: string, newStatus: TaskStatus) => { setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)); };
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between mb-4"><h2 className="text-xl font-bold">Tasks</h2><button onClick={() => setIsTaskModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">New Task</button></div>
            <div className="flex gap-4 h-full overflow-x-auto">
                {['To Do', 'In Progress', 'Done'].map(status => (
                    <div key={status} className="flex-1 min-w-[300px] bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <h3 className="font-bold mb-3">{status}</h3>
                        <div className="space-y-3">{tasks.filter(t => t.status === status).map(t => (<div key={t.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm"><h4 className="font-bold">{t.title}</h4><p className="text-xs text-slate-500 mb-2">{t.description}</p><select value={t.status} onChange={(e) => handleStatusChange(t.id, e.target.value as TaskStatus)} className="text-xs border p-1 rounded"><option>To Do</option><option>In Progress</option><option>Done</option></select></div>))}</div>
                    </div>
                ))}
            </div>
            {isTaskModalOpen && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-white p-6 rounded-xl w-96"><h3 className="font-bold mb-4">New Task</h3><button onClick={handleCreateTask} className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full">Create</button><button onClick={() => setIsTaskModalOpen(false)} className="mt-2 w-full text-center">Cancel</button></div></div>)}
        </div>
    );
};
const RecruitmentView = ({ jobs, setJobs }: { jobs: JobPosting[], setJobs: React.Dispatch<React.SetStateAction<JobPosting[]>> }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', department: 'Engineering', keywords: '' });
    const [generatedJD, setGeneratedJD] = useState<{ description: string, requirements: string[] } | null>(null);
    const handleGenerateJD = async () => { try { const result = await GeminiService.generateJobDescription(newJob.title, newJob.department, newJob.keywords); setGeneratedJD(result); } catch (e) { alert("Failed to generate JD."); }};
    const handleSaveJob = () => { if (!generatedJD) return; setJobs([{ id: Date.now().toString(), title: newJob.title, department: newJob.department as Department, location: 'Remote', type: 'Full-time', description: generatedJD.description, requirements: generatedJD.requirements, postedDate: new Date().toISOString().split('T')[0], status: 'Open' }, ...jobs]); setIsModalOpen(false); };
    return (<div className="space-y-6"><div className="flex justify-between"><h2 className="text-xl font-bold">Jobs</h2><button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Post Job</button></div><div className="grid grid-cols-2 gap-4">{jobs.map(j => <div key={j.id} className="bg-white p-4 rounded-xl border border-slate-200"><h3 className="font-bold">{j.title}</h3><p className="text-sm text-slate-500">{j.department}</p></div>)}</div>{isModalOpen && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-white p-6 rounded-xl w-full max-w-lg"><h3 className="font-bold mb-4">New Job</h3><input className="w-full border p-2 rounded mb-2" placeholder="Title" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} /><button onClick={handleGenerateJD} className="w-full bg-indigo-50 text-indigo-700 py-2 rounded mb-2">Generate AI Draft</button>{generatedJD && <button onClick={handleSaveJob} className="w-full bg-indigo-600 text-white py-2 rounded">Post Job</button>}<button onClick={() => setIsModalOpen(false)} className="w-full mt-2">Cancel</button></div></div>)}</div>);
};
const PerformanceView = ({ employees }: { employees: Employee[] }) => {
    const [selectedEmployee, setSelectedEmployee] = useState<string>(employees[0]?.id || '');
    const [notes, setNotes] = useState('');
    const [aiReview, setAiReview] = useState('');
    const handleGenerateReview = async () => { const emp = employees.find(e => e.id === selectedEmployee); try { const review = await GeminiService.polishPerformanceReview(notes, emp?.firstName || '', emp?.role || ''); setAiReview(review); } catch (e) { alert('Error'); }};
    return (<div className="grid grid-cols-2 gap-6"><div className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="font-bold mb-4">Draft Review</h3><select className="w-full border p-2 rounded mb-4" value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>{employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}</select><textarea className="w-full border p-2 rounded h-40 mb-4" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes..." /><button onClick={handleGenerateReview} className="w-full bg-indigo-600 text-white py-2 rounded">Polish with AI</button></div><div className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="font-bold mb-4">AI Output</h3><p className="text-sm text-slate-700 whitespace-pre-wrap">{aiReview}</p></div></div>);
};
const OnboardingView = ({ employees }: { employees: Employee[] }) => {
    const [onboardingRecords, setOnboardingRecords] = useState<OnboardingRecord[]>(MOCK_ONBOARDING);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(MOCK_ONBOARDING[0].employeeId);
    const selectedRecord = onboardingRecords.find(r => r.employeeId === selectedEmployeeId);
    const handleToggleTask = (taskId: string) => { setOnboardingRecords(prev => prev.map(r => r.employeeId === selectedEmployeeId ? { ...r, tasks: r.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) } : r)); };
    return (<div className="grid grid-cols-3 gap-6"><div className="bg-white p-4 rounded-xl border border-slate-200">{onboardingRecords.map(r => <div key={r.employeeId} onClick={() => setSelectedEmployeeId(r.employeeId)} className="p-3 border-b cursor-pointer hover:bg-slate-50">{employees.find(e => e.id === r.employeeId)?.firstName}</div>)}</div><div className="col-span-2 bg-white p-6 rounded-xl border border-slate-200">{selectedRecord?.tasks.map(t => <div key={t.id} onClick={() => handleToggleTask(t.id)} className={`p-3 border rounded mb-2 cursor-pointer ${t.completed ? 'bg-emerald-50 border-emerald-200' : ''}`}>{t.title}</div>)}</div></div>);
};
const SettingsView = ({ fullData }: { fullData: any }) => {
    const [activeTab, setActiveTab] = useState('general');
    return (<div className="bg-white p-8 rounded-xl border border-slate-200"><h2 className="text-xl font-bold mb-4">Settings</h2><p>General Configuration</p></div>);
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOBS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVES);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(MOCK_PAYROLL);
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);

  const titles: Record<ViewState, string> = {
      dashboard: 'Executive Dashboard',
      employees: 'Employee Directory',
      recruitment: 'Talent Acquisition',
      performance: 'Performance Reviews',
      orgchart: 'Organization Hierarchy',
      tasks: 'Task Management',
      attendance: 'Attendance & Leave',
      payroll: 'Payroll Management',
      onboarding: 'Onboarding Checklist',
      inventory: 'Inventory Management',
      settings: 'System Settings'
  };

  const handleLogin = (e: React.FormEvent) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard'); // Reset view on logout
  };

  if (!isAuthenticated) {
      return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} onSignOut={handleLogout} />
      
      <main className="flex-1 p-8 overflow-y-auto h-screen scroll-smooth">
        <header className="mb-8 flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/50 sticky top-4 z-10 shadow-sm">
            <div className="pl-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{titles[currentView]}</h1>
                <p className="text-slate-500 text-sm mt-0.5">Manage your organization efficiently.</p>
            </div>
            <div className="flex items-center gap-4 pr-2">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                     <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-slate-600">System Online</span>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <Calendar size={16} />
                    <span className="text-sm font-medium text-slate-700">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>
        </header>

        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {currentView === 'dashboard' && <DashboardStats employees={employees} jobs={jobs} />}
            {currentView === 'employees' && <EmployeeList employees={employees} setEmployees={setEmployees} tasks={tasks} />}
            {currentView === 'recruitment' && <RecruitmentView jobs={jobs} setJobs={setJobs} />}
            {currentView === 'performance' && <PerformanceView employees={employees} />}
            {currentView === 'tasks' && <TaskManagementView employees={employees} tasks={tasks} setTasks={setTasks} />}
            {currentView === 'attendance' && <AttendanceView employees={employees} attendance={attendance} leaves={leaves} setLeaves={setLeaves} />}
            {currentView === 'payroll' && <PayrollView employees={employees} payroll={payroll} setPayroll={setPayroll} />}
            {currentView === 'onboarding' && <OnboardingView employees={employees} />}
            {currentView === 'inventory' && <InventoryView inventory={inventory} setInventory={setInventory} employees={employees} />}
            {currentView === 'settings' && <SettingsView fullData={{ employees, jobs, tasks, attendance, leaves, payroll, inventory }} />}
            {currentView === 'orgchart' && (
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 h-[700px] overflow-hidden">
                    <OrgChart employees={employees} />
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;