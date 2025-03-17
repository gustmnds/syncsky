import { ApiClient, HelixChatBadgeSet } from "@twurple/api";

export class TwitchBadgeClient {
    private badges: Record<string, HelixChatBadgeSet> = {};

    constructor (private readonly apiClient: ApiClient) {}

    public async loadBadges(channelName: string) {
        const userData = await this.apiClient.users.getUserByName(channelName);
        if (!userData) {
            throw new Error("cannot fetch user data");
        }

        const badges = await Promise.all([
            this.apiClient.chat.getGlobalBadges(),
            this.apiClient.chat.getChannelBadges(userData.id)
        ]);

        this.badges = Object.fromEntries(badges
            .flat()
            .map((badge) => [badge.id, badge])
        );
    }

    public getBadges(badges: Map<string, string>): string[] {
        return Array.from(badges.entries()).reduce<string[]>((list, [badgeName, badgeVersion]) => {
            if (badgeName in this.badges) {
                const version = this.badges[badgeName].getVersion(badgeVersion);
                const imageUrl = version?.getImageUrl(1);

                if (imageUrl) {
                    list.push(imageUrl)
                }
            }
            return list;
        }, []);
    }
}
