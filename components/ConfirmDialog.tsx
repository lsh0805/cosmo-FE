import { Dialog, Portal, Button as PaperButton } from "react-native-paper";
import Text from "./Text";
import React from "react";

interface ConfirmDialogProps {
  title: string;
  content: string;
  visible: boolean;
  onDismiss: () => void;
  onPressYes: () => void;
  onPressNo: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  content,
  visible,
  onDismiss,
  onPressYes,
  onPressNo,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions style={{ flexDirection: "row" }}>
          <PaperButton
            onPress={onPressYes}
            style={{
              borderRadius: 0,
            }}
            labelStyle={{
              fontSize: 14,
              paddingHorizontal: 20,
            }}
          >
            네
          </PaperButton>
          <PaperButton
            onPress={onPressNo}
            style={{
              borderRadius: 0,
            }}
            labelStyle={{
              fontSize: 14,
              color: "#f20",
              fontFamily: "NotoSansKR700",
            }}
          >
            아니오
          </PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDialog;
