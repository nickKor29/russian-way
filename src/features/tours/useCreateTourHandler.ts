import { useNavigate } from "react-router-dom";

export function useCreateTourHandler() {
  const navigate = useNavigate();

  const handleCreateTour = () => {
    navigate("/new");
  };

  return {
    handleCreateTour,
  };
}
