interface WidgetProps {
  widgetId: number;
}

const Widget = ({ widgetId }: WidgetProps) => {
  return <div>Widget {widgetId}</div>;
};

export default Widget;
