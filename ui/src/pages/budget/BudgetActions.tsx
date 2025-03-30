import { Button } from "@/components/ui/button";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useDeleteBudgetMutation } from "./budget.api";
import { Link } from "react-router";

export const BudgetActions = ({
  id,
  eventId,
}: {
  id: number;
  eventId: number;
}) => {
  const { mutate: deleteBudget } = useDeleteBudgetMutation(id, eventId);
  const handleDelete = () => {
    console.log("delete");
    deleteBudget();
  };
  return (
    <>
      <Button className="mr-1" variant="default" size="icon" asChild>
        <Link to={`./${id}`}>
          <Eye />
        </Link>
      </Button>
      <Button className="mr-1" variant="outline" size="icon" asChild>
        <Link to={`./${id}/edit`}>
          <Edit2 />
        </Link>
      </Button>
      <Button
        onClick={handleDelete}
        className="mr-1"
        variant="outline"
        size="icon"
      >
        <Trash2 />
      </Button>
    </>
  );
};
