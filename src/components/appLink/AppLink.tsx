import { Text } from "react-native";

interface AppLinkProps {
  text: string;
  route: string;
  navigation: any;
}

export default function AppLink({ text, route, navigation }: AppLinkProps) {
  const changeRoute = () => {
    navigation.navigate(route);
  };
  return (
    <Text
      onPress={changeRoute}
      style={{ color: "#fb2d5d", fontSize: 20, fontWeight: "bold" }}
    >
      {text}
    </Text>
  );
}
