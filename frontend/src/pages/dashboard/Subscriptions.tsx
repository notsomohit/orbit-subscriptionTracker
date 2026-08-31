import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { api } from '../../lib/api';
import type {
  Subscription,
  SubscriptionStatus,
  SubscriptionCategory,
  SubscriptionCurrency,
  SubscriptionFrequency,
  CreateSubscriptionPayload,
} from '../../types';
import {
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit2,
  Calendar,
  DollarSign,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
} from 'lucide-react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import dayjs from 'dayjs';

export const Subscriptions: React.FC = () => {
  const queryClient = useQueryClient();
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');

  // Modal States
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editSubscription, setEditSubscription] = useState<Subscription | null>(null);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  // Form State for Add / Edit
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState<number>(10);
  const [formCurrency, setFormCurrency] = useState<SubscriptionCurrency>('USD');
  const [formFrequency, setFormFrequency] = useState<SubscriptionFrequency>('monthly');
  const [formCategory, setFormCategory] = useState<SubscriptionCategory>('technology');
  const [formPaymentMethod, setFormPaymentMethod] = useState('Credit Card (Visa)');
  const [formStartDate, setFormStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [formStatus, setFormStatus] = useState<SubscriptionStatus>('active');

  // Fetch Subscriptions
  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => api.getSubscriptions(),
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (payload: CreateSubscriptionPayload) => api.createSubscription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['activeWorkflows'] });
      setCreateModalOpen(false);
      resetForm();
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      api.updateSubscription(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['activeWorkflows'] });
      setEditSubscription(null);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['activeWorkflows'] });
    },
  });

  const resetForm = () => {
    setFormName('');
    setFormPrice(10);
    setFormCurrency('USD');
    setFormFrequency('monthly');
    setFormCategory('technology');
    setFormPaymentMethod('Credit Card (Visa)');
    setFormStartDate(dayjs().format('YYYY-MM-DD'));
    setFormStatus('active');
  };

  const handleOpenEdit = (sub: Subscription) => {
    setEditSubscription(sub);
    setFormName(sub.name);
    setFormPrice(sub.price);
    setFormCurrency(sub.currency);
    setFormFrequency(sub.frequency);
    setFormCategory(sub.category);
    setFormPaymentMethod(sub.paymentMethod);
    setFormStartDate(dayjs(sub.startDate).format('YYYY-MM-DD'));
    setFormStatus(sub.status);
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || sub.category === categoryFilter;
      const matchesCurrency = currencyFilter === 'all' || sub.currency === currencyFilter;
      const matchesSearch =
        sub.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        sub.paymentMethod.toLowerCase().includes(globalFilter.toLowerCase()) ||
        sub.category.toLowerCase().includes(globalFilter.toLowerCase());
      return matchesStatus && matchesCategory && matchesCurrency && matchesSearch;
    });
  }, [subscriptions, statusFilter, categoryFilter, currencyFilter, globalFilter]);

  // TanStack Table Columns
  const columns = useMemo<ColumnDef<Subscription, any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Subscription',
        cell: (info) => {
          const sub = info.row.original;
          return (
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {sub.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 capitalize flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono">
                  {sub.category}
                </span>
                <span>•</span>
                <span>{sub.paymentMethod}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'price',
        header: 'Price / Currency',
        cell: (info) => {
          const sub = info.row.original;
          const symbol = sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : '₹';
          return (
            <div className="font-mono">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {symbol}{sub.price}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                {sub.currency}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'frequency',
        header: 'Billing Frequency',
        cell: (info) => {
          const freq = info.getValue() as string;
          return (
            <span className="capitalize text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80">
              {freq}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue() as SubscriptionStatus;
          const config = {
            active: {
              bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
              icon: CheckCircle2,
              label: 'Active',
            },
            cancelled: {
              bg: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
              icon: XCircle,
              label: 'Cancelled',
            },
            expired: {
              bg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300',
              icon: Clock,
              label: 'Expired',
            },
          }[status] || {
            bg: 'bg-slate-100 text-slate-700',
            icon: CheckCircle2,
            label: status,
          };

          const Icon = config.icon;

          return (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bg}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{config.label}</span>
            </span>
          );
        },
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: (info) => {
          return (
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
              {dayjs(info.getValue() as string).format('YYYY-MM-DD')}
            </span>
          );
        },
      },
      {
        accessorKey: 'renewalDate',
        header: 'Renewal Date (Auto)',
        cell: (info) => {
          const sub = info.row.original;
          const formatted = dayjs(sub.renewalDate).format('YYYY-MM-DD');
          return (
            <div>
              <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                {formatted}
              </span>
              {sub.status === 'active' && (
                <div className="text-[10px] text-indigo-500 font-mono">
                  Upstash workflow active
                </div>
              )}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: '',
        cell: (info) => {
          const sub = info.row.original;

          return (
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={() => handleOpenEdit(sub)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Edit Subscription"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteMutation.mutate(sub._id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                title="Delete Subscription"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    [deleteMutation]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Subscriptions Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your recurring subscriptions directly backed by MongoDB and Upstash reminders.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Subscription</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search name, payment method..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All (active, cancelled, expired)</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="sports">Sports</option>
              <option value="news">News</option>
              <option value="entertainment">Entertainment</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="politics">Politics</option>
            </select>
          </div>

          {/* Currency Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Currency:</span>
            <select
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Currencies</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="RS">RS (₹)</option>
            </select>
          </div>
        </div>

      </div>

      {/* TanStack Table Container */}
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0e1424] border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-3.5 text-xs">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No subscriptions match your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            Total: <span className="font-semibold text-slate-900 dark:text-white">{filteredData.length}</span> subscriptions
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Subscription Dialog */}
      <Transition appear show={createModalOpen || !!editSubscription} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setCreateModalOpen(false);
            setEditSubscription(null);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-6 text-left align-middle shadow-2xl transition-all">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Dialog.Title as="h3" className="text-lg font-bold text-slate-900 dark:text-white">
                      {editSubscription ? 'Edit Subscription' : 'Create New Subscription'}
                    </Dialog.Title>
                    <button
                      onClick={() => {
                        setCreateModalOpen(false);
                        setEditSubscription(null);
                      }}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (editSubscription) {
                        updateMutation.mutate({
                          id: editSubscription._id,
                          updates: {
                            name: formName,
                            price: Number(formPrice),
                            currency: formCurrency,
                            frequency: formFrequency,
                            category: formCategory,
                            paymentMethod: formPaymentMethod,
                            startDate: formStartDate,
                            status: formStatus,
                          },
                        });
                      } else {
                        createMutation.mutate({
                          name: formName,
                          price: Number(formPrice),
                          currency: formCurrency,
                          frequency: formFrequency,
                          category: formCategory,
                          paymentMethod: formPaymentMethod,
                          startDate: formStartDate,
                        });
                      }
                    }}
                    className="mt-4 space-y-4 text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Subscription Name (2-100 characters)
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Netflix, GitHub Copilot"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Price
                        </label>
                        <input
                          type="number"
                          required
                          min={0}
                          step="any"
                          value={formPrice}
                          onChange={(e) => setFormPrice(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Currency (Schema Enum)
                        </label>
                        <select
                          value={formCurrency}
                          onChange={(e) => setFormCurrency(e.target.value as SubscriptionCurrency)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="RS">RS (₹)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Frequency
                        </label>
                        <select
                          value={formFrequency}
                          onChange={(e) => setFormFrequency(e.target.value as SubscriptionFrequency)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="daily">daily (1 day)</option>
                          <option value="weekly">weekly (7 days)</option>
                          <option value="monthly">monthly (30 days)</option>
                          <option value="yearly">yearly (365 days)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Category
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value as SubscriptionCategory)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="technology">Technology</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="finance">Finance</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="sports">Sports</option>
                          <option value="news">News</option>
                          <option value="politics">Politics</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Payment Method
                        </label>
                        <input
                          type="text"
                          required
                          value={formPaymentMethod}
                          onChange={(e) => setFormPaymentMethod(e.target.value)}
                          placeholder="e.g. Credit Card, UPI, PayPal"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Start Date (Past or Today)
                        </label>
                        <input
                          type="date"
                          required
                          max={dayjs().format('YYYY-MM-DD')}
                          value={formStartDate}
                          onChange={(e) => setFormStartDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {editSubscription && (
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Status (active, cancelled, expired)
                        </label>
                        <select
                          value={formStatus}
                          onChange={(e) => setFormStatus(e.target.value as SubscriptionStatus)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="active">Active</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="expired">Expired</option>
                        </select>
                      </div>
                    )}

                    <div className="pt-3 flex gap-2">
                      <button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors shadow-md shadow-indigo-600/20 text-center"
                      >
                        {createMutation.isPending || updateMutation.isPending
                          ? 'Saving...'
                          : editSubscription
                          ? 'Update Subscription'
                          : 'Create & Schedule Workflow'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCreateModalOpen(false);
                          setEditSubscription(null);
                        }}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
};
