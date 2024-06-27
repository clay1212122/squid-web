import React from "react";
import {Card, CardHeader, CardBody, Button} from "@nextui-org/react";

export default function CardInfo({number, title, amount}) {
  return (
    <Card className="py-4 w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large text-wrap">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 self-center flex flex-row justify-between">
        <h1 className="self-center font-bold text-2xl">{number}</h1>
        <Button className="font-bold text-1xl">+{amount}%</Button>
      </CardBody>
    </Card>
  );
}
