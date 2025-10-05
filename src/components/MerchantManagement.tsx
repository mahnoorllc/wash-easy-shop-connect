import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Store, 
  Mail, 
  Phone,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Merchant {
  id: string;
  user_id: string;
  business_name: string;
  business_address: string;
  phone: string;
  email: string;
  services: string[];
  service_areas: string[] | null;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const MerchantManagement = () => {
  const { t } = useTranslation();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMerchants(data || []);
    } catch (error) {
      console.error('Error fetching merchants:', error);
      toast.error(t('admin.merchantManagement.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const approveMerchant = async (merchantId: string) => {
    try {
      const { error } = await supabase
        .from('merchants')
        .update({ 
          is_approved: true, 
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', merchantId);

      if (error) throw error;
      
      toast.success(t('admin.merchantManagement.approveSuccess'));
      fetchMerchants();
    } catch (error) {
      console.error('Error approving merchant:', error);
      toast.error(t('admin.merchantManagement.updateError'));
    }
  };

  const rejectMerchant = async (merchantId: string) => {
    try {
      const { error } = await supabase
        .from('merchants')
        .update({ 
          is_approved: false, 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', merchantId);

      if (error) throw error;
      
      toast.success(t('admin.merchantManagement.rejectSuccess'));
      fetchMerchants();
    } catch (error) {
      console.error('Error rejecting merchant:', error);
      toast.error(t('admin.merchantManagement.updateError'));
    }
  };

  const toggleMerchantStatus = async (merchantId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('merchants')
        .update({ 
          is_active: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', merchantId);

      if (error) throw error;
      
      toast.success(t(`admin.merchantManagement.${!currentStatus ? 'activateSuccess' : 'deactivateSuccess'}`));
      fetchMerchants();
    } catch (error) {
      console.error('Error updating merchant status:', error);
      toast.error(t('admin.merchantManagement.updateError'));
    }
  };

  const getStatusBadge = (merchant: Merchant) => {
    if (merchant.is_approved && merchant.is_active) {
      return <Badge className="bg-green-100 text-green-800">{t('common.approved')}</Badge>;
    } else if (!merchant.is_approved && merchant.is_active) {
      return <Badge className="bg-yellow-100 text-yellow-800">{t('common.pending')}</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">{t('common.rejected')}</Badge>;
    }
  };

  const pendingMerchants = merchants.filter(m => !m.is_approved && m.is_active);
  const approvedMerchants = merchants.filter(m => m.is_approved && m.is_active);
  const rejectedMerchants = merchants.filter(m => !m.is_active);

  const MerchantTable = ({ merchantList }: { merchantList: Merchant[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('admin.merchantManagement.businessName')}</TableHead>
          <TableHead>{t('admin.merchantManagement.contact')}</TableHead>
          <TableHead>{t('admin.merchantManagement.location')}</TableHead>
          <TableHead>{t('admin.merchantManagement.services')}</TableHead>
          <TableHead>{t('admin.merchantManagement.status')}</TableHead>
          <TableHead>{t('admin.merchantManagement.actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {merchantList.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">
              {t('admin.merchantManagement.noMerchants')}
            </TableCell>
          </TableRow>
        ) : (
          merchantList.map((merchant) => (
            <TableRow key={merchant.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{merchant.business_name}</div>
                    <div className="text-xs text-muted-foreground">
                      ID: {merchant.id.slice(0, 8)}...
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {merchant.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {merchant.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {merchant.business_address}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {merchant.services.map((service, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {service.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(merchant)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {!merchant.is_approved && merchant.is_active && (
                    <>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => approveMerchant(merchant.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {t('common.approve')}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => rejectMerchant(merchant.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        {t('common.reject')}
                      </Button>
                    </>
                  )}
                  {merchant.is_approved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleMerchantStatus(merchant.id, merchant.is_active)}
                    >
                      {merchant.is_active ? t('common.deactivate') : t('common.activate')}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('admin.merchantManagement.pendingApproval')}</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingMerchants.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('common.approved')}</p>
                <p className="text-3xl font-bold text-green-600">{approvedMerchants.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('common.rejected')}</p>
                <p className="text-3xl font-bold text-red-600">{rejectedMerchants.length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {pendingMerchants.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-900">
                {pendingMerchants.length} {t('admin.merchantManagement.awaitingApproval')}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('admin.merchantManagement.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="relative">
                {t('common.pending')}
                {pendingMerchants.length > 0 && (
                  <Badge className="ml-2 bg-yellow-600">{pendingMerchants.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">
                {t('common.approved')} ({approvedMerchants.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                {t('common.rejected')} ({rejectedMerchants.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              <MerchantTable merchantList={pendingMerchants} />
            </TabsContent>

            <TabsContent value="approved" className="mt-6">
              <MerchantTable merchantList={approvedMerchants} />
            </TabsContent>

            <TabsContent value="rejected" className="mt-6">
              <MerchantTable merchantList={rejectedMerchants} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
