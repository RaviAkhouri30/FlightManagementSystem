export class FetchProviderCode {

    public fetchProviderCode = (data: string): string => {
        const providerCode = this.getProviderCode(data);
        return providerCode;
    }

    private getProviderCode = (data: string): string => {
        const providerName = data.split(/[ ]*/g).join('').toUpperCase().trim();
        switch (providerName) {
            case 'SPICEJET': return 'SG-';
            case 'INDIGO': return '6E-';
            case 'AIRASIA': return 'I5-';
            case 'GOAIR': return '8G-';
            case 'JETAIRWAYS': return '9W-';
            case 'AIRINDIA': return 'AI-';
            default: return '';
        }
    }

}
