import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DropDetailsPageView } from "@/components/drop-details-page-view"

interface DropDetailsPageProps {
  params: {
    id: string
  }
}

export default function DropDetailsPage({ params }: DropDetailsPageProps) {
  return (
    <DashboardLayout>
      <DropDetailsPageView dropId={params.id} />
    </DashboardLayout>
  )
}
