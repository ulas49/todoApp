import { Button, ButtonProps } from '@mantine/core';
import { FaTwitter } from "react-icons/fa";

export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return (
    <Button leftSection={<FaTwitter size={16} color="#00ACEE" />} variant="default" {...props} />
  );
}