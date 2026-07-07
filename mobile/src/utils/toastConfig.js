import Toast from 'react-native-toast-message';

export const showToast = (type = 'success', text1 = '', text2 = '') => {
  Toast.show({
    type,
    position: 'top',
    text1,
    text2,
    duration: 3000,
  });
};

export const showSuccessToast = (message) => {
  showToast('success', 'Success', message);
};

export const showErrorToast = (message) => {
  showToast('error', 'Error', message);
};

export const showInfoToast = (message) => {
  showToast('info', 'Info', message);
};

export const toastConfig = {
  success: (props) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: '#2ECC71',
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 4 }}>
          {props.text1}
        </Text>
        <Text style={{ color: '#fff', fontSize: 12 }}>{props.text2}</Text>
      </View>
    </View>
  ),
  error: (props) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: '#E74C3C',
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 4 }}>
          {props.text1}
        </Text>
        <Text style={{ color: '#fff', fontSize: 12 }}>{props.text2}</Text>
      </View>
    </View>
  ),
  info: (props) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: '#3498DB',
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 4 }}>
          {props.text1}
        </Text>
        <Text style={{ color: '#fff', fontSize: 12 }}>{props.text2}</Text>
      </View>
    </View>
  ),
};
