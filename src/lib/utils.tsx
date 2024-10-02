export const formatDiscoveryDate = (params: { value: string }): string => {
    const date = new Date(params.value);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
};

export const formatPotentiallyHazardous = (params: { value: string }): string => {
    if (params.value === "Y") return "Yes";
      if (params.value === "N") return "No";
      return "";
};