const formatSoundCreatedEvents = (filteredLogs: any) => {
  const result = filteredLogs.map((log: any) => log.args[1]);
  return result;
};

export default formatSoundCreatedEvents;
