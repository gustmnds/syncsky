import { ApiClient, HelixChatBadgeSet } from "@twurple/api";
import { ChatMessage } from "@twurple/chat";

export class TwitchBadgeClient {
    private badges: Record<string, HelixChatBadgeSet> = {};

    constructor (
        private readonly userId: string,
        private readonly apiClient: ApiClient
    ) {}

    public getBadges(message: ChatMessage): string[] {        
        const badgesUrls = [];

        for (const [name, version] of message.userInfo.badges.entries()) {
            const badgeUrl = this.getBadgeUrl(name, version);
            if (badgeUrl) badgesUrls.push(badgeUrl);
        }

        return badgesUrls;
    }

    public async loadBadges() {
        const badges = await Promise.all([
            this.apiClient.chat.getGlobalBadges(),
            this.apiClient.chat.getChannelBadges(this.userId)
        ]);

        this.badges = Object.fromEntries(badges
            .flat()
            .map((badge) => [badge.id, badge])
        );
    }

    private getBadgeUrl(name: string, version: string) {
        if (!(name in this.badges)) return;

        const badge = this.badges[name].getVersion(version);
        if (!badge) return;

        return badge.getImageUrl(4);
    }
}
