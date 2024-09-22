export const formatNumerWithCommas = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
}