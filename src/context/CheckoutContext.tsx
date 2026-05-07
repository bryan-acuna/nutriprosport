import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type DeliveryMethod = 'shipping' | 'pickup';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes?: string;
}

interface CheckoutContextI {
  address: ShippingAddress | null;
  setAddress: (a: ShippingAddress) => void;
  clearAddress: () => void;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (m: DeliveryMethod) => void;
}

const CheckoutContext = createContext<CheckoutContextI | undefined>(undefined);

const ADDRESS_KEY = 'checkout:address:v1';
const DELIVERY_KEY = 'checkout:delivery:v1';

const readAddress = (): ShippingAddress | null => {
  try {
    const raw = localStorage.getItem(ADDRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as ShippingAddress;
    return null;
  } catch {
    return null;
  }
};

const readDelivery = (): DeliveryMethod => {
  const raw = localStorage.getItem(DELIVERY_KEY);
  return raw === 'pickup' ? 'pickup' : 'shipping';
};

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [address, setAddressState] = useState<ShippingAddress | null>(
    readAddress
  );
  const [deliveryMethod, setDeliveryMethodState] =
    useState<DeliveryMethod>(readDelivery);

  useEffect(() => {
    if (address) {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
    } else {
      localStorage.removeItem(ADDRESS_KEY);
    }
  }, [address]);

  useEffect(() => {
    localStorage.setItem(DELIVERY_KEY, deliveryMethod);
  }, [deliveryMethod]);

  const setAddress = useCallback(
    (a: ShippingAddress) => setAddressState(a),
    []
  );
  const clearAddress = useCallback(() => setAddressState(null), []);
  const setDeliveryMethod = useCallback(
    (m: DeliveryMethod) => setDeliveryMethodState(m),
    []
  );

  const value = useMemo(
    () => ({
      address,
      setAddress,
      clearAddress,
      deliveryMethod,
      setDeliveryMethod,
    }),
    [address, setAddress, clearAddress, deliveryMethod, setDeliveryMethod]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx)
    throw new Error('useCheckout must be used within a CheckoutProvider');
  return ctx;
};
