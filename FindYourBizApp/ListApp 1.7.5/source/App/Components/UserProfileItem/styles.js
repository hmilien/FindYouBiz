import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Styles } from "@common";

export default StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
        paddingHorizontal: 20,
        height: 60
    },
    leftText: {
        fontSize: 16,
        color: '#9B9B9B',
    },
    rightText: {
        fontSize: 16,
        color: Color.blackTextPrimary,
        fontWeight: '300',
        alignSelf: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10
    },
    //icon
    numberWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 18,
        minWidth: 18,
        backgroundColor: Color.main,
        borderRadius: 9,
        marginLeft: 10,
      },
      number: {
        color: 'white',
        fontSize: 12,
        marginLeft: 3,
        marginRight: 3,
      },
});
