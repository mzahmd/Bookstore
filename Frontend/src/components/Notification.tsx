import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

function notification(
  title: string,
  description: string,
  status: "info" | "warning" | "success" | "error" | "loading" | undefined
) {
  toast({
    title,
    description,
    status,
    isClosable: true,
    duration: 4000,
  });
}

export function successNotification(title: string, description: string) {
  notification(title, description, "success");
}

export function errorNotification(title: string, description: string) {
  notification(title, description, "error");
}
