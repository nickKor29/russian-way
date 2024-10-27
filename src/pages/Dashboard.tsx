import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import HeaderContainer from "../ui/HeaderContainer";
import Heading from "../ui/Heading";
function Dashboard() {
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Панель</Heading>
        <DashboardFilter />
      </HeaderContainer>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
