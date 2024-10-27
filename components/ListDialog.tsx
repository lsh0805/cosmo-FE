import {
  Dialog,
  Portal,
  Button as PaperButton,
  Divider,
  TouchableRipple,
} from "react-native-paper";
import {
  FlatList,
  View,
  ColorValue,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Text from "./Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type SelectDialogItemType = {
  text: string;
  color: ColorValue;
  id: string;
  onPress: () => void;
};

interface ListDialogProps {
  visible: boolean;
  data: SelectDialogItemType[];
  onDismiss: () => void;
}

export const ListDialog: React.FC<ListDialogProps> = ({
  visible,
  data,
  onDismiss,
  ...props
}) => {
  return (
    <Portal>
      <Dialog
        style={{
          borderRadius: 10,
          backgroundColor: "#222",
        }}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Content
          style={{
            flexDirection: "column",
            marginTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            justifyContent: "center",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={onDismiss}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#333",
                paddingVertical: 4,
                borderTopEndRadius: 10,
                borderTopStartRadius: 10,
              }}
            >
              <MaterialCommunityIcons name="close" size={18} color={"#fff"} />
            </TouchableOpacity>
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                const isLastItem = index === data.length - 1;
                return (
                  <View>
                    <TouchableHighlight
                      onPress={item.onPress}
                      style={{
                        flex: 1,
                        alignContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ color: item.color, fontSize: 16 }}>
                        {item.text}
                      </Text>
                    </TouchableHighlight>
                    {!isLastItem ? (
                      <Divider
                        style={{
                          width: "100%",
                          marginVertical: 0,
                          backgroundColor: "#555",
                        }}
                      />
                    ) : undefined}
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ListDialog;
