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
import { useAuth } from '../../context/AuthContext';
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
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  PackageOpen,
  Loader2,
} from 'lucide-react';
import dayjs from 'dayjs';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { SubscriptionSkeleton } from '../../components/ui/SubscriptionSkeleton';

export const Subscriptions: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?._id || '';

  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');

  // Modal States
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editSubscription, setEditSubscription] = useState<Subscription | null>(null);

  // Form State for Add / Edit
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState<number>(10);
  const [formCurrency, setFormCurrency] = useState<SubscriptionCurrency>('USD');
  const [formFrequency, setFormFrequency] = useState<SubscriptionFrequency>('monthly');
  const [formCategory, setFormCategory] = useState<SubscriptionCategory>('technology');
  const [formPaymentMethod, setFormPaymentMethod] = useState('Credit Card (Visa)');
  const [formStartDate, setFormStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [formStatus, setFormStatus] = useState<SubscriptionStatus>('active');

  // Fetch Subscriptions scoped to the authenticated user
  const {
    data: subscriptions = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['subscriptions', userId],
    queryFn: () => api.getSubscriptions(),
    enabled: !!userId,
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (payload: CreateSubscriptionPayload) => api.createSubscription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] });
      queryClient.invalidateQueries({ queryKey: ['activeWorkflows', userId] });
      setCreateModalOpen(false);
      resetForm();
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      api.updateSubscription(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] });
      queryClient.invalidateQueries({ queryKey: ['activeWorkflows', userId] });
      setEditSubscription(null);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] });
      queryClient.invalidateQueries({ queryKey: ['activeWorkflows', userId] });
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
              <div className="font-display font-bold text-black text-sm uppercase">
                {sub.name}
              </div>
              <div className="text-xs text-neutral-700 capitalize flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.2 bg-[#EFECE6] border border-black text-[10px] font-mono font-bold">
                  {sub.category}
                </span>
                <span>•</span>
                <span className="font-mono text-[11px]">{sub.paymentMethod}</span>
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
              <span className="font-black text-black text-sm">
                {symbol}{sub.price}
              </span>
              <span className="text-xs text-neutral-700 ml-1 font-bold">
                {sub.currency}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'frequency',
        header: 'Frequency',
        cell: (info) => {
          const freq = info.getValue() as string;
          return (
            <Badge variant="outline" size="sm">
              {freq}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue() as SubscriptionStatus;
          const badgeVariant = status === 'active' ? 'active' : status === 'cancelled' ? 'cancelled' : 'expired';
          return (
            <Badge variant={badgeVariant} size="sm">
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: (info) => {
          return (
            <span className="text-xs font-mono font-bold text-black">
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
              <span className="text-xs font-mono font-black text-black">
                {formatted}
              </span>
              {sub.status === 'active' && (
                <div className="text-[10px] font-mono font-bold text-[#15803D]">
                  UPSTASH WORKFLOW ACTIVE
                </div>
              )}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          const sub = info.row.original;

          return (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(sub)}
                className="p-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#F5D90A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                title="Edit Subscription"
              >
                <Edit2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete subscription "${sub.name}"?`)) {
                    deleteMutation.mutate(sub._id);
                  }
                }}
                className="p-1.5 bg-[#FEE2E2] border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#EF4444] hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-[#B91C1C]"
                title="Delete Subscription"
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
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
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-display font-black text-black uppercase tracking-tight">
              SUBSCRIPTIONS DIRECTORY
            </h1>
            {isFetching && !isLoading && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F5D90A] border-2 border-black text-[10px] font-mono font-black shadow-[2px_2px_0px_#111]">
                <Loader2 className="w-3 h-3 animate-spin stroke-[2.5]" />
                REFRESHING
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-0.5">
            Manage your recurring commitments backed by MongoDB and Upstash reminders.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            resetForm();
            setCreateModalOpen(true);
          }}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>NEW SUBSCRIPTION</span>
        </Button>
      </div>

      {/* Error Alert */}
      {isError && (
        <Card variant="yellow" borderWidth={3} shadow="md" className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-[#EF4444] bg-[#FEE2E2]">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#B91C1C] stroke-[2.5] shrink-0" />
            <div>
              <div className="font-display font-black text-sm uppercase text-[#B91C1C]">
                FAILED TO LOAD SUBSCRIPTIONS
              </div>
              <div className="text-xs font-mono text-neutral-800">
                {(error as Error)?.message || 'Could not communicate with the backend server.'}
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
            className="gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>RETRY</span>
          </Button>
        </Card>
      )}

      {/* Loading Skeleton State */}
      {isLoading ? (
        <SubscriptionSkeleton />
      ) : !isError && subscriptions.length === 0 ? (
        /* Empty State for Brand New User */
        <div className="p-14 border-3 border-black shadow-[6px_6px_0px_#111] bg-white flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-14 h-14 bg-[#F5D90A] border-2 border-black shadow-[3px_3px_0px_#111] flex items-center justify-center">
            <PackageOpen className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="font-display font-black text-lg uppercase text-black">
              NO SUBSCRIPTIONS FOUND
            </h3>
            <p className="text-xs font-mono text-neutral-600">
              You haven't tracked any recurring subscriptions yet. Add your first service to start automated reminders.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              resetForm();
              setCreateModalOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>ADD YOUR FIRST SUBSCRIPTION</span>
          </Button>
        </div>
      ) : (
        <>
          {/* Filter and Search Bar */}
          <Card variant="white" borderWidth={2} shadow="md" className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
              <input
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search name, payment, category..."
                className="w-full pl-9 pr-4 py-2 bg-[#F7F5F0] border-2 border-black text-xs font-mono text-black placeholder:text-neutral-500 focus:outline-none focus:shadow-[3px_3px_0px_#F5D90A]"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                <span className="uppercase">STATUS:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none focus:shadow-[2px_2px_0px_#F5D90A] cursor-pointer"
                >
                  <option value="all">ALL STATUSES</option>
                  <option value="active">ACTIVE</option>
                  <option value="cancelled">CANCELLED</option>
                  <option value="expired">EXPIRED</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                <span className="uppercase">CATEGORY:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none focus:shadow-[2px_2px_0px_#F5D90A] cursor-pointer"
                >
                  <option value="all">ALL CATEGORIES</option>
                  <option value="sports">SPORTS</option>
                  <option value="news">NEWS</option>
                  <option value="entertainment">ENTERTAINMENT</option>
                  <option value="lifestyle">LIFESTYLE</option>
                  <option value="technology">TECHNOLOGY</option>
                  <option value="finance">FINANCE</option>
                  <option value="politics">POLITICS</option>
                </select>
              </div>

              {/* Currency Filter */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                <span className="uppercase">CURRENCY:</span>
                <select
                  value={currencyFilter}
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none focus:shadow-[2px_2px_0px_#F5D90A] cursor-pointer"
                >
                  <option value="all">ALL CURRENCIES</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="RS">RS (₹)</option>
                </select>
              </div>
            </div>

          </Card>

          {/* TanStack Table Container */}
          <div className="border-3 border-black shadow-[6px_6px_0px_#111] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b-2 border-black bg-[#F5D90A]"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-5 py-3 text-xs font-display font-black uppercase tracking-wider text-black border-r-2 border-black last:border-r-0"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-[#FAF9F5] transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-5 py-3.5 text-xs border-r border-black/20 last:border-r-0">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="px-5 py-12 text-center text-neutral-700 font-mono font-bold text-sm">
                        NO SUBSCRIPTIONS MATCH YOUR SEARCH OR FILTER CRITERIA.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Bar */}
            <div className="p-4 border-t-2 border-black bg-[#EFECE6] flex items-center justify-between text-xs font-mono font-bold">
              <div>
                TOTAL: <span className="bg-[#F5D90A] px-1.5 py-0.5 border border-black">{filteredData.length}</span> SUBSCRIPTIONS
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#F5D90A] disabled:opacity-40 disabled:hover:bg-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[3]" />
                </button>
                <span>
                  PAGE {table.getState().pagination.pageIndex + 1} OF {table.getPageCount() || 1}
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-[#F5D90A] disabled:opacity-40 disabled:hover:bg-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add / Edit Subscription Modal */}
      <Modal
        isOpen={createModalOpen || !!editSubscription}
        onClose={() => {
          setCreateModalOpen(false);
          setEditSubscription(null);
        }}
        title={editSubscription ? 'EDIT SUBSCRIPTION' : 'CREATE NEW SUBSCRIPTION'}
        maxWidth="lg"
      >
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
          className="space-y-4 text-xs font-mono"
        >
          <div>
            <Input
              label="Subscription Name (2-100 characters)"
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. GitHub Copilot, Netflix, AWS"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Price"
                type="number"
                required
                min={0}
                step="any"
                value={formPrice}
                onChange={(e) => setFormPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <Select
                label="Currency"
                value={formCurrency}
                onChange={(e) => setFormCurrency(e.target.value as SubscriptionCurrency)}
                options={[
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'RS', label: 'RS (₹)' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Select
                label="Frequency"
                value={formFrequency}
                onChange={(e) => setFormFrequency(e.target.value as SubscriptionFrequency)}
                options={[
                  { value: 'daily', label: 'daily (1 day)' },
                  { value: 'weekly', label: 'weekly (7 days)' },
                  { value: 'monthly', label: 'monthly (30 days)' },
                  { value: 'yearly', label: 'yearly (365 days)' },
                ]}
              />
            </div>

            <div>
              <Select
                label="Category"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as SubscriptionCategory)}
                options={[
                  { value: 'technology', label: 'Technology' },
                  { value: 'entertainment', label: 'Entertainment' },
                  { value: 'finance', label: 'Finance' },
                  { value: 'lifestyle', label: 'Lifestyle' },
                  { value: 'sports', label: 'Sports' },
                  { value: 'news', label: 'News' },
                  { value: 'politics', label: 'Politics' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                label="Payment Method"
                type="text"
                required
                value={formPaymentMethod}
                onChange={(e) => setFormPaymentMethod(e.target.value)}
                placeholder="e.g. Visa, UPI, PayPal"
              />
            </div>

            <div>
              <Input
                label="Start Date"
                type="date"
                required
                max={dayjs().format('YYYY-MM-DD')}
                value={formStartDate}
                onChange={(e) => setFormStartDate(e.target.value)}
              />
            </div>
          </div>

          {editSubscription && (
            <div>
              <Select
                label="Status"
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as SubscriptionStatus)}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'cancelled', label: 'Cancelled' },
                  { value: 'expired', label: 'Expired' },
                ]}
              />
            </div>
          )}

          <div className="pt-3 flex gap-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? 'SAVING...'
                : editSubscription
                ? 'UPDATE SUBSCRIPTION'
                : 'CREATE & SCHEDULE WORKFLOW'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => {
                setCreateModalOpen(false);
                setEditSubscription(null);
              }}
            >
              CANCEL
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
