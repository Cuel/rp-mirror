import xmlToJson from "./xml2json";

export const run = () =>
  fetch("/api/weather")
    .then((response: Response) => response.text())
    .then((str: string) =>
      new (window as any).DOMParser().parseFromString(str, "text/xml")
    )
    .then((data: any) => console.log(xmlToJson(data)))
    .catch(err => {
      console.error("Failed to get weather", err);
      return [];
    });
