// likeDislikeHandlers.ts
export const handleLike = (
  commentId: number,
  likeCounts: Record<number, number>,
  setLikeCounts: React.Dispatch<React.SetStateAction<Record<number, number>>>
) => {
  const newLikeCount = (likeCounts[commentId] || 0) + 1;
  setLikeCounts((prev) => ({ ...prev, [commentId]: newLikeCount }));
  localStorage.setItem(`likes_${commentId}`, newLikeCount.toString());
};

export const handleDislike = (
  commentId: number,
  dislikeCounts: Record<number, number>,
  setDislikeCounts: React.Dispatch<React.SetStateAction<Record<number, number>>>
) => {
  const newDislikeCount = (dislikeCounts[commentId] || 0) + 1;
  setDislikeCounts((prev) => ({ ...prev, [commentId]: newDislikeCount }));
  localStorage.setItem(`dislikes_${commentId}`, newDislikeCount.toString());
};
