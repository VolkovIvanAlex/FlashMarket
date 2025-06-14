import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AuctionDetailsPageView } from "@/components/auction-details-page-view"

interface AuctionDetailsPageProps {
  params: {
    id: string
  }
}

export default function AuctionDetailsPage({ params }: AuctionDetailsPageProps) {
  return (
    <DashboardLayout>
      <AuctionDetailsPageView auctionId={params.id} />
    </DashboardLayout>
  )
}
