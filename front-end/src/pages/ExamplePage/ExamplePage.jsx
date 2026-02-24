// Should remove this file
import "./ExamplePage.css";
import { ExampleComponent } from "../../components/ExampleComponent";
import { ChartsComponent } from "../../components/ChartsComponent/ChartsComponent";

export const ExamplePage = () => {
  return (
    <div className="text-xl font-bold">
        <ExampleComponent></ExampleComponent>
        <ChartsComponent></ChartsComponent>
    </div>
  )
}
